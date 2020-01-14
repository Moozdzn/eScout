var pool = require("./conn").pool;

module.exports.getTeamInfo = function (id, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        
        if (id != null) {

            conn.query("SELECT * FROM Team WHERE teamID = ?", id , function (err, results) {
                conn.release();
                if (err) {
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })
        } else
            console.log("try again");
    })

};
module.exports.getTeamVideos = function (id, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        
        if (id != null) {

            conn.query("SELECT User.username, Video.videoTitle, Video.videoDescription, Video.game, Video.rating, Video.rating*Video.views AS Result, reference FROM Video INNER JOIN User ON Video.userID = User.userID WHERE User.teamID = ? ORDER BY Result DESC", id , function (err, results) {
                conn.release();
                if (err) {
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })
        } else
            console.log("try again");
    })

}