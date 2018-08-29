require('../config/config');

const mysql       = require('mysql');
const util        = require('util');

const poolConfig = ({
    host     : process.env.SQL_HOST,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DATABASE
});
console.log(`poolConfig = ${JSON.stringify(poolConfig,undefined,2)}`);

let mySqlPool    = mysql.createPool(poolConfig);
mySqlPool.query  = util.promisify(mySqlPool.query);

module.exports = {mySqlPool};