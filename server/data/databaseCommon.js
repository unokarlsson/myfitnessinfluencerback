
const existDatabase = async (pool,databaseName) => {
    // TODO
};

const createDatabase = async (pool,databaseName) => {
    try {
        const result = await pool.query(`CREATE DATABASE ${databaseName}`);
        console.log(`createDatabase: Database ${databaseName} created, result = `,result);
    } catch (error) {
        console.log(`createDatabase: Could not create database ${databaseName}, error = `,error);
    }
};

const dropDatabase = async (pool,databaseName) => {
    try {
        const result = await pool.query(`DROP DATABASE ${databaseName}`);
        console.log(`dropDatabase: Database ${databaseName} dropped, result = `,result);
    } catch(error) {
        console.log(`dropDatabase: Could not drop database ${databaseName}, error = `,error);
    }
};

const createTable = async (poolSql,tableName,tableSql) => {
    try {
        let result = await poolSql.query(tableSql);
        console.log(`createTable: Created table ${tableName}`);
    } catch (error) {
        console.log(`createTable: Could not create table ${tableName}, error = ${error}`);
    }
};

const dropTable = async (poolSql,tableName) => {
    try {
        let result = await poolSql.query(`DROP TABLE ${tableName}`);
        console.log(`dropTable: Dropped table ${tableName}`);
    } catch (error) {
        console.log(`dropTable: Could not drop table ${tableName}, error = ${error}`);
    }
};

const populateTable = async (poolSql,tableName,data) => {
    const columns = Object.keys(data[0]).join(',');
    const sqlInsert = `INSERT INTO ${tableName} (${columns})  VALUES ?`;
    console.log('sqlInsert',sqlInsert);

    let items = [];
    for(i=0;i<data.length;i++) {
        const item = Object.values(data[i]);
        items[i] = item;
    }
    console.log('items',items);

    try {
        let result = await poolSql.query(sqlInsert,[items]);
        console.log(`result = ${JSON.stringify(result,undefined,2)}`);
    } catch(error) {
        console.log(`populateBodyparts: Failed!, error = ${error}!`);
    }
}

module.exports = {existDatabase,createDatabase,dropDatabase,createTable,dropTable,populateTable};


