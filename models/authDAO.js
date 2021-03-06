var pool = require("./conn").pool;

module.exports.verifyUser = function (data,cb, next) {
    
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("SELECT userID, userType FROM User WHERE username = ? AND password =?", [data.username, data.password], function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })


    })
}

module.exports.getUser = function (username,cb, next) {
    
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        var query;
        if(typeof username == "string") query = "SELECT * FROM User WHERE username = ? "; 
        else query = "SELECT * FROM User WHERE userID = ? ";
        conn.query(query, [username], function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })


    })
}