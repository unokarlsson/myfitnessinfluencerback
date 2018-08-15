require('../server/config/config.js');
const config = ({
    host     : process.env.SQL_HOST,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DATABASE
});
console.log(`config = ${JSON.stringify(config,undefined,2)}`);

const mysql2       = require('mysql2');
const pool         = mysql2.createPool(config);
const promisePool  = pool.promise();

const dropAndCreateTables = async () => {
    try {
        const dropTest2 = await promisePool.query("DROP TABLE test2;");
        console.log('Table test2 dropped.');
        const dropTest1 = await promisePool.query("DROP TABLE test1;");
        console.log('Table test1 dropped.');
    
        const createTest1 = await promisePool.query("CREATE TABLE test1(`id` int(11) NOT NULL,PRIMARY KEY (`id`));");
        console.log('Table test1 created.');
        const createTest2 = await promisePool.query("CREATE TABLE test2(`id` int(11) NOT NULL,PRIMARY KEY (`id`));");
        console.log('Table test2 created.');
    } catch(error) {
        console.log(`Error = ${error}`);
    }
};

dropAndCreateTables();



