require('../config/config.js');

const mysql2   = require('mysql2');

const {existDatabase,createDatabase,dropDatabase,createTable,dropTable,populateTable} = require('./databaseCommon');

// ================== begin databaseSetupPool.js ===================
//
// DROP/CREATE DATABASE CONFIG & POOL
const config = ({
    host     : process.env.SQL_HOST,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD
});
console.log(`config = ${JSON.stringify(config,undefined,2)}`);

const pool         = mysql2.createPool(config);
const promisePool  = pool.promise();


// DROP/CREATE TABLES AND POPULATE DATA CONFIG & POOL
const configDatabase = ({
    host     : process.env.SQL_HOST,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DATABASE
});
console.log(`configDatabase = ${JSON.stringify(configDatabase,undefined,2)}`);

const poolDatabase         = mysql2.createPool(configDatabase);
const promisePoolDatabase  = poolDatabase.promise();

//
// ================== end databaseSetupPool.js ===================


const setupDatabase = async (databaseName) => {
    try {
        await dropDatabase(promisePool,databaseName);
        await createDatabase(promisePool,databaseName);
        console.log('setupDatabase: Execute dropDatabase, createDatabase done.');
    } catch(error) {
        console.log('setupDatabase: Execute dropDatabase, createDatabase failed, error = ',error);
    }
 };

 const setupTablesAndData = async (bodypartName,bodypartDef,bodyparts,
                                exerciseName,exerciseDef,exercises,
                                userName,userDef,users,
                                tokenName,tokenDef,tokens,
                                workoutName,workoutDef,workouts,
                                workoutExerciseName,workoutExerciseDef,workoutExercises) => {
    try {
        await dropTable(promisePoolDatabase,workoutExerciseName);
        await dropTable(promisePoolDatabase,workoutName);

        await dropTable(promisePoolDatabase,exerciseName);
        await dropTable(promisePoolDatabase,bodypartName);

        await dropTable(promisePoolDatabase,tokenName);
        await dropTable(promisePoolDatabase,userName);

        await createTable(promisePoolDatabase,bodypartName,bodypartDef);
        await createTable(promisePoolDatabase,exerciseName,exerciseDef);

        await createTable(promisePoolDatabase,userName,userDef);
        await createTable(promisePoolDatabase,tokenName,tokenDef);

        await createTable(promisePoolDatabase,workoutName,workoutDef);
        await createTable(promisePoolDatabase,workoutExerciseName,workoutExerciseDef);

        await populateTable(promisePoolDatabase,bodypartName,bodyparts);
        await populateTable(promisePoolDatabase,exerciseName,exercises);

        await populateTable(promisePoolDatabase,userName,users);
        await populateTable(promisePoolDatabase,tokenName,tokens);

        await populateTable(promisePoolDatabase,workoutName,workouts);
        await populateTable(promisePoolDatabase,workoutExerciseName,workoutExercises);
        
        console.log('setupTablesAndData: Execute dropTables, createTables and populateTable done.');
    } catch(error) {
        console.log('setupTablesAndData: Execute dropTables, createTables and populateTable failed, error = ',error);
    }
};

// const setupData = async (databaseName,bodypartName,bodypartDef,bodyparts,exerciseName,exerciseDef,exercises) => {
//     try {
//         await setupDatabase(databaseName);
//         await setupTablesAndData(bodypartName,bodypartDef,bodyparts,exerciseName,exerciseDef,exercises);
//         console.log('setupData: Execute setupDatabase, setupTablesAndData done.');
//     } catch (error) {
//         console.log('setupData: Execute setupDatabase, setupTablesAndData failed, error = ',error);
//     }
// };

module.exports = {setupDatabase,setupTablesAndData};

