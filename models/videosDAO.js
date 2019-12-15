var pool = require("./conn").pool;

module.exports.getVideos = function (game,cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
            conn.query("SELECT Video.videoTitle, Video.videoDescription, Video.rating, Video.reference,Video.rating*Video.views AS Result, User.username, User.userID, User.userType FROM Video INNER JOIN User on Video.userID = User.userID WHERE Video.game = '"+game+"' ORDER BY Result DESC", function (err, results) {
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

