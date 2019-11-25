var pool = require("./conn").pool;

module.exports.verifyUser = function (data,cb, next) {
    /* change to user table*/
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("SELECT userID FROM User WHERE username = \""+ data.username +"\" AND password ="+data.password+";", function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })


    })
}