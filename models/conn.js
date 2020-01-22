var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'remotemysql.com',
    user     : 'xtgAoUoOEz',
    password : process.env.DBPASSWORD,
    database : 'xtgAoUoOEz',
    multipleStatements: true
});

module.exports.pool = pool;