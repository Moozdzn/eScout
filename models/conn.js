var mysql = require('mysql');
require('dotenv/config');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'remotemysql.com',
    user     : 'LMI8cRyJ94',
    password : process.env.DBPASSWORD,
    database : 'LMI8cRyJ94',
    multipleStatements: true
});

module.exports.pool = pool;
//xtgAoUoOEz