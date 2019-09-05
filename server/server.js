require('./config/config.js');

const env = process.env.NODE_ENV || 'dev';
if(env==='dev' || env==='docker-dev' /* || production */) {
    const {setupProductionData} = require('./data/production');
}

const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');

const validator      = require('validator');
const bcrypt         = require('bcryptjs');
const {authenticate} = require('./middleware/authenticate');
const {mySqlPool}    = require('./data/databasePool');

const {compareArray} = require('./utils/compareArray');

const {generateHash,generateAuthToken,verifyAuthToken} = require('./data/security.js');

let app = express();
const corsOptions = {
    exposedHeaders: 'x-auth'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());


// ====================
// BODYPARTS
// ====================

app.get('/bodyparts', async (request, response) => {
    console.log('\nRunning GET /bodyparts');

    try {
        const rows = await mySqlPool.query('SELECT * FROM bodypart');
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});


// ====================
// EXERCISES
// ====================

app.get('/exercises', async (request, response) => {
    console.log('\nRunning GET /exercises');
    try {
        const rows = await mySqlPool.query('SELECT * FROM exercise');
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

//  Alternative 1
app.get('/bodyparts/:id/exercises', async (request, response) => {
    console.log('\nRunning GET /bodyparts/:id/exercises');
    let id = request.params.id;
    try {
        const rows = await mySqlPool.query(`SELECT * FROM exercise WHERE bodypartId=${id}`);
        if(rows.length===0) {
            return response.status(400).send();
        }
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

//  Alternative 2
app.get('/exercises/bodypart/:id', async (request, response) => {
    console.log('\nRunning GET /exercises/bodypart/:id');
    let id = request.params.id;
    try {
        const rows = await mySqlPool.query(`SELECT * FROM exercise WHERE bodypartId=${id}`);
        if(rows.length===0) {
            return response.status(400).send();
        }
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});


// ====================
// USERS
// ====================

// Register
app.post('/users', async (request,response) => {
    console.log('\nRunning POST /users');
    const username = request.body.username; // Must be at least 2 characters
    const password = request.body.password; // Must be at least 4 characters
    const email    = request.body.email;
    // const access   = "auth";

    if(username.length<2) {
        const error = `Username '${username}' is shorter than 2 characters!`;
        console.log(error);
        response.status(400).send({error}); 
    }
    if(password.length<4) {
        const error = `Password '${password}' is shorter than 4 characters!`;
        console.log(error);
        response.status(400).send({error}); 
    }
    if (!validator.isEmail(email)) {
        const error = `Email ${email} is not a valid email!`;
        console.log(error);
        response.status(400).send({error});
    };

    // console.log('username',username);
    // console.log('password',password);
    // console.log('email',email);
    // console.log('access',access);
    
    try {
        const passwordHash = await generateHash(password);
        const userResult   = await mySqlPool.query(`INSERT INTO user (username,password,email) VALUES ('${username}','${passwordHash}','${email}')`);
        if(userResult.affectedRows!==1) {
            throw "Could not insert user!";
        }
        const id = userResult.insertId;
        console.log('id= ',id);

        const user = {id,username,email};
        response.send({user});

    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

app.get('/users', async (request,response) => {
    console.log('\nRunning GET /users');
    try {
        const rows = await mySqlPool.query('SELECT * FROM user');
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

app.delete('/users/:id', async (request,response) => {
    console.log('\nRunning DELETE /users/:id');
    const id = request.params.id;
    try {
        const rows = await mySqlPool.query(`DELETE FROM user WHERE id=${id}`);
        if(rows.affectedRows===0) {
            response.status(404).send();
        } else {
            response.send({rows});
        }
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

app.get('/users/me', async (request,response) => {
    console.log('\nRunning GET /users/me');
    const token = request.header('x-auth');
    // console.log('token=',token);

    try {
        verifyAuthToken(token);

        let rows = await mySqlPool.query(`SELECT user.id as id,username,email from user,token WHERE token='${token}' AND token.userid=user.id`);
        // console.log('rows=',rows);
        if(rows.length===0) {
            throw `User not found, token '${token }'!`;
        }

        const id        = rows[0].id;
        const username  = rows[0].username;
        const email     = rows[0].email;

        const user = {id,username,email};
        request.user = user;
        response.send({user});
    } catch (error) {
        console.log(error);
        response.status(401).send();
    }
});

app.post('/users/login', async (request,response) => {
    console.log('\nRunning POST /users/login');
    const uname = request.body.username;
    const pword = request.body.password;
    const access = 'auth';

    // console.log('POST /users/login');
    // console.log('uname',uname);
    // console.log('pword',pword);

    try {
        const rows = await mySqlPool.query(`SELECT * FROM user WHERE username='${uname}'`);
        if(rows.length===0) {
            throw `Login failed, username '${uname}' not found!`;
        }
        const id        = rows[0].id;
        const username  = rows[0].username;
        const password  = rows[0].password;
        const email     = rows[0].email;

        const match = await bcrypt.compare(pword,password);
        if(!match) {
            throw `Login failed, password '${pword}' incorrect!`;
        }

        const token = generateAuthToken(id,access);

        const tokenResult  = await mySqlPool.query(`INSERT INTO token (access,token,userid) VALUES ('${access}','${token}',${id})`);
        if(tokenResult.affectedRows!==1) {
            throw "Could not insert token!";
        }

        const user = {id,username,email};
        response.header('x-auth',token).send({user});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

// LOGOUT!
app.delete('/users/me/token', async (request,response) => {
    console.log('\nRunning DELETE /users/me/token');
    const token = request.header('x-auth');
    console.log('token=',token);

    try {
        const decoded = verifyAuthToken(token);
        // console.log('decoded=',decoded);
        const id     = decoded.id;
        const access = decoded.access;
        // console.log('id=',id);
        // console.log('access=',access);

        const rows = await mySqlPool.query(`SELECT * FROM user WHERE id=${id}`);
        if(rows.length===0) {
            throw `Logout failed, user id '${id}' not found!`;
        }

        const username  = rows[0].username;
        const email     = rows[0].email;

        const tokenResult  = await mySqlPool.query(`DELETE FROM token WHERE token='${token}' AND access='${access}'`);
        // console.log('tokenResult=',tokenResult);
        if(tokenResult.affectedRows!==1) {
            throw `Could not remove token, token='${token}' and  access='${access}' not found!`;
        }
        const user = {id,username,email};
        response.send({user});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

// ====================
// WORKOUTS
// ====================

app.get('/workouts', authenticate, async (request,response) => {
    console.log('\nRunning GET /workouts');
    try {
        const user = request.user;

        // Fetch the users workouts
        let workoutRows = await mySqlPool.query(`SELECT id,name,description from workout WHERE workout.userid=${user.id}`);
        console.log('workoutRows=',workoutRows);

        const workouts = [];
        // Loop over each workout and get all the exercises
        for(let workoutIndex=0;workoutIndex<workoutRows.length;workoutIndex++) {
            const id           = workoutRows[workoutIndex].id;
            const name         = workoutRows[workoutIndex].name;
            const description  = workoutRows[workoutIndex].description;

            let exerciseRows = await mySqlPool.query(`SELECT * FROM workout_exercise WHERE workout_exercise.workoutid=${id}`);
            // console.log('exerciseRows=',exerciseRows);

            const exercises = [];
            // for(let exerciseIndex=0;exerciseIndex<exerciseRows.length;exerciseIndex++) {
            //     const exerciseId = exerciseRows[exerciseIndex].exerciseid;
            //     exercises[exerciseIndex] = exerciseId;
            // }

            for(let exerciseIndex=0;exerciseIndex<exerciseRows.length;exerciseIndex++) {
                const exerciseid      = exerciseRows[exerciseIndex].exerciseid;
                const sequenceNumber  = exerciseRows[exerciseIndex].sequenceNumber;
                const sets            = exerciseRows[exerciseIndex].sets;
                const reps            = exerciseRows[exerciseIndex].reps;
                const weight          = exerciseRows[exerciseIndex].weight;
                exercises[exerciseIndex] = {exerciseid,sequenceNumber,sets,reps,weight};
            }

            const workout = {id,name,description,exercises};
            workouts[workoutIndex] = workout;
        }

        response.send({workouts});
    } catch (error) {
        console.log(error);
        response.status(400).send();
    }
});

app.post('/workouts', authenticate, async (request,response) => {
    console.log('\nRunning POST /workouts');
    const name         = request.body.name;
    const description  = request.body.description;
    const exercises    = request.body.exercises;
    console.log('name=',name);
    console.log('description=',description);
    console.log('exercieses=',exercises);

    try {
        const user = request.user;
        console.log('user=',user);

        // Insert the workout
        // console.log(`Insert workout with name='${name}' description='${description}' userid=${user.id}`);
        let rows = await mySqlPool.query(`INSERT INTO workout (name,description,userid) VALUES ('${name}','${description}',${user.id})`);
        if(rows.affectedRows!==1) {
            throw `Could not insert workout with name='${name}' description='${description}' userid=${user.id}`;
        }
        const id = rows.insertId;

        // Insert the exercises
        exercises.forEach(async (exercise,index) => {
            try {
                const exerciseid     = exercise.exerciseid
                const sequenceNumber = exercise.sequenceNumber
                let columnNames = ''
                let columnValues = ''
                const keys = Object.keys(exercise)
                keys.forEach((key) => {
                    if(key==='reps') {
                        columnNames += ',reps'
                        columnValues += `,${exercise.reps}`
                    } else if(key==='sets') {
                        columnNames += ',sets'
                        columnValues += `,${exercise.sets}`
                    } else if(key==='weight') {
                        columnNames += ',weight'
                        columnValues += `,${exercise.weight}`
                    }
                })
                console.log(`${index} - columnNames  : ${columnNames}`)
                console.log(`${index} - columnValues : ${columnValues}`)
     
                // console.log(`Inserted workout_exercise workoutid=${id} exerciseid=${exerciseid}`);
                let rows = await mySqlPool.query(`INSERT INTO workout_exercise (workoutid,exerciseid,sequenceNumber${columnNames}) VALUES (${id},${exerciseid},${sequenceNumber}${columnValues})`);
                if(rows.affectedRows!==1) {
                    throw `Could not insert workout_exercise workoutid=${id} exerciseid=${exerciseid}`;
                }
            } catch (error) {
                throw error;
            }
        });

        const workout = {id,name,description,exercises};
        response.send({workout});
    } catch (error) {
        console.log(error);
        response.status(400).send();
    }
});

app.put('/workouts/:id', authenticate, async (request,response) => {
    console.log('\nRunning PUT /workouts');
    const id           = request.params.id;
    const name         = request.body.name;
    const description  = request.body.description;
    const exercises    = request.body.exercises;
    console.log('id=',id);
    console.log('name=',name);
    console.log('description=',description);
    console.log('exercieses=',exercises);

    try {
        const user = request.user;

        // Fetch the current workout
        const workoutRows = await mySqlPool.query(`SELECT id,name,description from workout WHERE workout.userid=${user.id} AND workout.id=${id}`);
        console.log('workoutRows=',workoutRows);
        const currentWorkout = workoutRows[0];
        const currentName = currentWorkout.name;
        const currentDescription = currentWorkout.description;
        console.log('currentName=',currentName);
        console.log('currentDescription=',currentDescription);
        
        // Fetch exercises for workout
        const currentExercises = await mySqlPool.query(`SELECT * FROM workout_exercise WHERE workout_exercise.workoutid=${id}`);
        console.log('currentExercises=',currentExercises);

        // Compare workout data and if needed update
        let nameDescriptionChanged = false;
        if(name !== currentName) {
            nameDescriptionChanged = true;
        }
        if(description !== currentDescription) {
            nameDescriptionChanged = true;
        }

        if(nameDescriptionChanged) {
            const rows = await mySqlPool.query(`UPDATE workout SET (name='${name}',description='${description}') WHERE workout.id=${id}`);
            if(rows.affectedRows!==1) {
                throw `Could not update workout with name='${name}' description='${description}'`;
            }
        }

        // HANDLE THESE CASES
        // added exercises
        // deleted exercises
        // changed exercises

        const compareResult = compareArray(exercises, currentExercises);
        console.log('compareResult.addExercises     = ',compareResult.addExercises)
        console.log('compareResult.deleteExercises  = ',compareResult.deleteExercises)
        console.log('compareResult.changeExercises  = ',compareResult.changeExercises)
        
        // Loop through addExercises and insert exercises into database
        compareResult.addExercises.forEach(async (exercise,index) => {
            // TODO: What should the frontend send for sets, reps and weight if nothing is entered?
            const exerciseid     = exercise.exerciseid
            const sequenceNumber = exercise.sequenceNumber
            let columnNames = ''
            let columnValues = ''
            const keys = Object.keys(exercise)
            keys.forEach((key) => {
                if(key==='reps') {
                    columnNames += ',reps'
                    columnValues += `,${exercise.reps}`
                } else if(key==='sets') {
                    columnNames += ',sets'
                    columnValues += `,${exercise.sets}`
                } else if(key==='weight') {
                    columnNames += ',weight'
                    columnValues += `,${exercise.weight}`
                }
            })
            console.log(`${index} - columnNames  : ${columnNames}`)
            console.log(`${index} - columnValues : ${columnValues}`)

            let rows = await mySqlPool.query(`INSERT INTO workout_exercise (workoutid,exerciseid,sequenceNumber${columnNames}) VALUES (${id},${exerciseid},${sequenceNumber}${columnValues})`);
            if(rows.affectedRows!==1) {
                throw `Could not insert workout_exercise with workoutid=${id} exerciseid=${exerciseid}`;
            }
        })

        // Loop through deleteExercises and delete exercises from database
        compareResult.deleteExercises.forEach(async exercise => {
            let rows = await mySqlPool.query(`DELETE FROM workout_exercise WHERE workoutid=${id} AND exerciseid=${exercise.exerciseid}`);
            if(rows.affectedRows!==1) {
                throw `Could not delete workout_exercise with workoutid='${id}' and execiseid=${exercise.exerciseid}`;
            }
        })

        // Loop through changeExercises and update exercises in database
        compareResult.changeExercises.forEach(async exercise => {
            const rows = await mySqlPool.query(`UPDATE workout_exercise SET sequenceNumber=${exercise.sequenceNumber},reps=${exercise.reps},sets=${exercise.sets},weight=${exercise.weight} WHERE workoutid=${id} AND exerciseid=${exercise.exerciseid}`);
            if(rows.affectedRows!==1) {
                throw `Could not update workout_exercise with set sequenceNumber=${exercise.sequenceNumber},reps=${exercise.reps},sets=${exercise.sets},weight=${exercise.weight} where workoutid=${id} AND exerciseid=${exercise.exerciseid}`;
            }
        })

        // TODO: Check what is best practise for PUT in API design.
        const workout = {id,name,description,exercises};
        response.send({workout});
    } catch (error) {
        console.log(error);
        response.status(400).send();
    }
});

app.delete('/workouts/:id', async (request, response) => {
    console.log('\nRunning DELETE /workoutst/:id');
    const workoutId = request.params.id;
    console.log('workoutId=',workoutId);
    try {
        // Delete workout exercises
        await mySqlPool.query(`DELETE FROM workout_exercise WHERE workoutid=${workoutId}`);

        // Delete workout
        const rows = await mySqlPool.query(`DELETE FROM workout WHERE id=${workoutId}`);
        if(rows.affectedRows===0) {
            return response.status(400).send();
        }
        // TODO: What is good practise to return?
        response.status(200).send();
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});


app.listen(process.env.HTTP_PORT,() => {
    console.log(`Started on ${process.env.HTTP_PORT}`);
});

module.exports = {app};
