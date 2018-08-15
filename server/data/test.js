
const {BODYPART_DEFINITION,EXERCISE_DEFINITION}                                        = require('./definition');
const {promisePool,promisePoolDatabase,setupDatabase,setupTablesAndData,setupData}     = require('./database');

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

const setupTestData = async () => {
    try {
        await setupData(promisePool,process.env.SQL_DATABASE,promisePoolDatabase,'bodypart',BODYPART_DEFINITION,bodyparts,'exercise',EXERCISE_DEFINITION,exercises);
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




