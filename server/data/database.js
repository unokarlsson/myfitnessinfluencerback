require('../config/config.js');

const mysql2   = require('mysql2');

const {existDatabase,createDatabase,dropDatabase,createTable,dropTable,populateTable} = require('./databaseCommon');

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


const setupDatabase = async (pool,databaseName) => {
    try {
        await dropDatabase(pool,databaseName);
        await createDatabase(pool,databaseName);
        console.log('setupDatabase: Execute dropDatabase, createDatabase done.');
    } catch(error) {
        console.log('setupDatabase: Execute dropDatabase, createDatabase failed, error = ',error);
    }
 };

 const setupTablesAndData = async (pool,bodypartName,bodypartDef,bodyparts,exerciseName,exerciseDef,exercises) => {
    try {
        await dropTable(pool,exerciseName);
        await dropTable(pool,bodypartName);
        await createTable(pool,bodypartName,bodypartDef);
        await createTable(pool,exerciseName,exerciseDef);
        await populateTable(pool,bodypartName,bodyparts);
        await populateTable(pool,exerciseName,exercises);
        console.log('setupTablesAndData: Execute dropTables, createTables and populateTable done.');
    } catch(error) {
        console.log('setupTablesAndData: Execute dropTables, createTables and populateTable failed, error = ',error);
    }
};

const setupData = async (pool,databaseName,poolDatabase,bodypartName,bodypartDef,bodyparts,exerciseName,exerciseDef,exercises) => {
    try {
        await setupDatabase(pool,databaseName);
        await setupTablesAndData(poolDatabase,bodypartName,bodypartDef,bodyparts,exerciseName,exerciseDef,exercises);
        console.log('setupData: Execute setupDatabase, setupTablesAndData done.');
    } catch (error) {
        console.log('setupData: Execute setupDatabase, setupTablesAndData failed, error = ',error);
    }
};

module.exports = {promisePool,promisePoolDatabase,setupDatabase,setupTablesAndData,setupData};

