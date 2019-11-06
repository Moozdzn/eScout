var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'remotemysql.com',
    user     : 'jAJHucusmf',
    password : process.env.DBPASSWORD,
    database : 'jAJHucusmf'
});

module.exports.pool = pool;