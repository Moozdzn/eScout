var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'remotemysql.com',
    user     : 'xtgAoUoOEz',
    password : 'JjzNSoWVCE',
    database : 'xtgAoUoOEz',
    multipleStatements: true
});

module.exports.pool = pool;