var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'remotemysql.com',
    user     : 'xtgAoUoOEz',
    password : 'JjzNSoWVCE',
    database : 'xtgAoUoOEz'
});

module.exports.pool = pool;