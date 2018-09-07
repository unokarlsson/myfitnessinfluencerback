
const {BODYPART_DEF,EXERCISE_DEF,USER_DEF,TOKEN_DEF,WORKOUT_DEF,WORKOUT_EXERCISE_DEF}  = require('./definition');
const {setupDatabase,setupTablesAndData}  = require('./database');

const bodyparts = [{
    id: 1,
    name: 'Upper'
},{
    id: 2,
    name: 'Lower'
}];

const exercises = [{
    id: 1,
    name: 'Dips',
    imgName: 'dips.jpg',
    description: 'Dips description',
    bodypartId: 1
},{
    id: 2,
    name: 'Chins',
    imgName: 'chins.jpg',
    description: 'Chins description',
    bodypartId: 1
},{
    id: 3,
    name: 'Squat',
    imgName: 'squat.jpg',
    description: 'Squat description',
    bodypartId: 2
},{
    id: 4,
    name: 'Deadlift',
    imgName: 'deadlift.jpg',
    description: 'Deadlift description',
    bodypartId: 2
}];

const users = [{
    username: 'Uno',
    password: 'passwd1',
    email:    'mail@uno.com'
},{
    username: 'Alexandra',
    password: 'passwd2',
    email:    'mail@alexandra.com'
}];

const tokens  = [{
    access: 'auth',
    token:  'ldksfjkldf.94832w9w8743.)(/&(#¤',
    userid: 1
}];

const workouts = [{
    name: 'Workout name',
    description: 'Workout description.',
    userid: 1
}];

const workoutExcercises = [{
    workoutid: 1,
    exerciseid: 1
},{
    workoutid: 1,
    exerciseid: 3
}];


const setupTestData = async () => {
    try {
        await setupDatabase(process.env.SQL_DATABASE);
        await setupTablesAndData('bodypart',BODYPART_DEF,bodyparts,
                                'exercise',EXERCISE_DEF,exercises,
                                'user',USER_DEF,users,
                                'token',TOKEN_DEF,tokens,  
                                'workout',WORKOUT_DEF,workouts,
                                'workout_exercise',WORKOUT_EXERCISE_DEF,workoutExcercises);
        console.log('setupTestData: Setup test data done.');
    } catch(error) {
        console.log('setupTestData: Setup test data failed, error = ',error);
    }
}

// setupTestData();

module.exports = {setupTestData,bodyparts,exercises};

// TODO: Where to put
// setupTablesAndData(promisePoolDatabase,'bodypart',BODYPART_DEFINITION,bodyparts,'exercise',EXERCISE_DEFINITION,exercises);
// populateData();
// dropAndCreateTables();
// setupTestData();




