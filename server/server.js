require('./config/config.js');

const env = process.env.NODE_ENV || 'dev';
if(env==='dev' || env==='docker-dev' /* || production */) {
    const {setupProductionData} = require('./data/production');
    setupProductionData();
}

const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');

const validator      = require('validator');
const bcrypt         = require('bcryptjs');
const {authenticate} = require('./middleware/authenticate');
const {mySqlPool}    = require('./data/databasePool');

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
    const username = request.body.username; // Must be at least 2 characters
    const password = request.body.password; // Must be at least 4 characters
    const email    = request.body.email;
    const access   = "auth";

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

    console.log('username',username);
    console.log('password',password);
    console.log('email',email);
    console.log('access',access);
    
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
    
        // Add if registration should also do a login!
        // const token = generateAuthToken(id,access);
        // const tokenResult  = await mySqlPool.query(`INSERT INTO token (access,token,userid) VALUES ('${access}','${token}',${id})`);
        // if(tokenResult.affectedRows!==1) {
        //     throw "Could not insert token!";
        // }
        // const user = {id,username,email};
        // response.header('x-auth',token).send({user});

    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

app.get('/users', async (request,response) => {
    try {
        const rows = await mySqlPool.query('SELECT * FROM user');
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

// app.get('/users/:id', async (request,response) => {
//     const id = request.params.id;
//     try {
//         const rows = await mySqlPool.query(`SELECT * FROM user WHERE id=${id}`);
//         if(rows.length===0) {
//             response.status(404).send();
//         } else {
//             response.send({rows});
//         }
//     } catch(error) {
//         console.log(error);
//         response.status(400).send();
//     }
// });

app.delete('/users/:id', async (request,response) => {
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


// ====================
// WORKOUTS
// ====================

app.get('/workouts', authenticate, async (request,response) => {
    console.log('Running GET /workouts');
    try {
        const user = request.user;

        // TODO: Method specific things!

        response.send({workoutsFor:user});
    } catch (error) {
        console.log(error);
        response.status(400).send();
    }
});

app.post('/workouts', authenticate, async (request,response) => {
    console.log('Running POST /workouts');
    const name         = request.body.name;
    const description  = request.body.description;
    const exercieses   = request.body. exercises;
    console.log('name=',name);
    console.log('description=',description);
    console.log('exercieses=',exercieses);

    try {
        const user = request.user;


        // TODO: Method specific things!

        response.send({workoutSaved:user});
    } catch (error) {
        console.log(error);
        response.status(400).send();
    }
});



// ====================
// USERS
// ====================

app.get('/users/me', async (request,response) => {

    const token = request.header('x-auth');
    console.log('token=',token);

    try {
        verifyAuthToken(token);

        let rows = await mySqlPool.query(`SELECT user.id as id,username,email from user,token WHERE token='${token}' AND token.userid=user.id`);
        console.log('rows=',rows);
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
    const uname = request.body.username;
    const pword = request.body.password;
    const access = 'auth';
    console.log('POST /users/login');
    console.log('uname',uname);
    console.log('pword',pword);

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
    const token = request.header('x-auth');
    console.log('token=',token);

    try {
        const decoded = verifyAuthToken(token);
        console.log('decoded=',decoded);
        const id     = decoded.id;
        const access = decoded.access;
        console.log('id=',id);
        console.log('access=',access);

        const rows = await mySqlPool.query(`SELECT * FROM user WHERE id=${id}`);
        if(rows.length===0) {
            throw `Logout failed, user id '${id}' not found!`;
        }

        const username  = rows[0].username;
        const email     = rows[0].email;

        const tokenResult  = await mySqlPool.query(`DELETE FROM token WHERE token='${token}' AND access='${access}'`);
        console.log('tokenResult=',tokenResult);
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


app.listen(process.env.HTTP_PORT,() => {
    console.log(`Started on ${process.env.HTTP_PORT}`);
});

module.exports = {app};
