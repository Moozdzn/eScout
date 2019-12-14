var pool = require("./conn").pool;

module.exports.getVideos = function (game,cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
            conn.query("SELECT Video.videoTitle, Video.videoDescription, Video.rating, Video.reference, User.username FROM Video INNER JOIN User on Video.userID = User.userID WHERE Video.game = '"+game+"' ORDER BY Video.rating", function (err, results) {
                conn.release();
                if (err) {
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })
        } 
        )
}

module.exports.getLOLvideos = function (cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
            conn.query("SELECT Video.videoTitle, Video.videoDescription, Video.rating, Video.reference, User.username FROM Video INNER JOIN User on Video.userID = User.userID WHERE Video.game = 'LOL' ORDER BY Video.rating", function (err, results) {
                conn.release();
                if (err) {
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })
        } 
        )
}