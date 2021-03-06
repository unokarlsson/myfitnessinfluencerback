
const {BODYPART_DEF,EXERCISE_DEF,USER_DEF,TOKEN_DEF,WORKOUT_DEF,WORKOUT_EXERCISE_DEF}  = require('./definition');
const {setupDatabase,setupTablesAndData}  = require('./database');

const bodyparts = [{
    id: 1,
    name: 'Arm'
},{
    id: 2,
    name: 'Shoulder'
},{
    id: 3,
    name: 'Breast'
},{
    id: 4,
    name: 'Back'
},{
    id: 5,
    name: 'Ab'
},{
    id: 6,
    name: 'Glute'
},{
    id: 7,
    name: 'Leg'
}];

const exercises = [
/* ARM */
{
    id: 1,
    name: 'Bicep Curl - Dumbbell',
    imgName: 'bicepCurl-dumbbell.jpg',
    description: 'TODO',
    bodypartId: 1
},{
    id: 2,
    name: 'Tricep Press - Dumbbell',
    imgName: 'tricepPress-dumbbell.jpg',
    description: 'TODO',
    bodypartId: 1
},{
    id: 3,
    name: 'Narrow Bench Press - Barebell',
    imgName: 'narrowBenchPress-barebell.png',
    description: 'TODO',
    bodypartId: 1
},

 /* SHOULDER */
{
    id: 11,
    name: 'Shoulder Press - Barebell',
    imgName: 'shoulderPress-barebell.jpg',
    description: 'TODO',
    bodypartId: 2
},{
    id: 12,
    name: 'Lateral Raises - Dumbbell',
    imgName: 'lateralRaises-dumbbell.jpg',
    description: 'TODO',
    bodypartId: 2
},{
    id: 13,
    name: 'Shoulder Row - Barebell',
    imgName: 'shoulderRow-barebell.jpg',
    description: 'TODO',
    bodypartId: 2
},

/* BREAST */
{
    id: 21,
    name: 'Bench press - Barebell',
    imgName: 'benchPress-barebell.jpg',
    description: 'TODO',
    bodypartId: 3
},{
    id: 22,
    name: 'Push Up - Bodyweight',
    imgName: 'pushUp-bodyweight.jpg',
    description: 'TODO',
    bodypartId: 3
},{
    id: 23,
    name: 'Chest Fly - Dumbbell',
    imgName: 'chestFly-dumbbell.jpg',
    description: 'TODO',
    bodypartId: 3
},

/* BACK */
{
    id: 31,
    name: 'Chins',
    imgName: 'chins.jpg',
    description: 'TODO',
    bodypartId: 4
},{
    id: 32,
    name: 'Barebell Row',
    imgName: 'row-barebell.jpg',
    description: 'TODO',
    bodypartId: 4
},{
    id: 33,
    name: 'Pull Down - Machine',
    imgName: 'pullDown-machine.jpg',
    description: 'TODO',
    bodypartId: 4
},

/* AB */
{
    id: 41,
    name: 'Crunches - Bodyweight',
    imgName: 'crunches-bodyweight.jpg',
    description: 'TODO',
    bodypartId: 5
},{
    id: 42,
    name: 'Ab Rotation - Medicin Ball',
    imgName: 'abRotation-medicinball.jpg',
    description: 'TODO',
    bodypartId: 5
},{
    id: 43,
    name: 'Ab Raises - Machine',
    imgName: 'abRaises-machine.jpg',
    description: 'TODO',
    bodypartId: 5
},

/* GLUTE */
{
    id: 51,
    name: 'Back Extention - Bodyweight',
    imgName: 'backExtention-bodyweight.jpg',
    description: 'TODO',
    bodypartId: 6
},{
    id: 52,
    name: 'Hip Thrust - Barebell',
    imgName: 'hipThrust-barebell.jpg',
    description: 'TODO',
    bodypartId: 6
},{
    id: 53,
    name: 'Deadlift - Barebell',
    imgName: 'deadLift-barebell.jpg',
    description: 'TODO',
    bodypartId: 6
},

/* LEG */
{
    id: 61,
    name: 'Squat - Bodyweight',
    imgName: 'squat-bodyweight.jpg',
    description: 'TODO',
    bodypartId: 7
},{
    id: 62,
    name: 'Lunges - Bodyweight',
    imgName: 'lunges-bodyweight.jpg',
    description: 'TODO',
    bodypartId: 7
},{
    id: 63,
    name: 'Leg Extentions - Machine',
    imgName: 'legExtention-machine.jpg',
    description: 'TODO',
    bodypartId: 7
}];

const users = [];

const tokens  = [];

const workouts  = [];

const workoutExcercises  = [];

const setupProductionData = async () => {
    // TODO: Only setup production data if database don't exist!
    try {
        await setupDatabase(process.env.SQL_DATABASE);
        await setupTablesAndData('bodypart',BODYPART_DEF,bodyparts,
                                'exercise',EXERCISE_DEF,exercises,
                                'user',USER_DEF,users,
                                'token',TOKEN_DEF,tokens,  
                                'workout',WORKOUT_DEF,workouts,
                                'workout_exercise',WORKOUT_EXERCISE_DEF,workoutExcercises);
        console.log('setupProductionData: Setup production data done.');
    } catch(error) {
        console.log('setupProductionData: Setup production data failed, error = ',error);
    }
}

module.exports = {setupProductionData};

// TODO: Where to put
// dropDatabase(promisePool,process.env.SQL_DATABASE);
// createDatabase(promisePool,process.env.SQL_DATABASE);
// setupDatabase(promisePool,process.env.SQL_DATABASE);
// setupTablesAndData(promisePoolDatabase,'bodypart',BODYPART_DEFINITION,bodyparts,'exercise',EXERCISE_DEFINITION,exercises);
// setupData(promisePool,process.env.SQL_DATABASE,promisePoolDatabase,'bodypart',BODYPART_DEFINITION,bodyparts,'exercise',EXERCISE_DEFINITION,exercises);

setupProductionData();