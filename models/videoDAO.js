var pool = require("./conn").pool;

module.exports.newVideo = function (videoInfo,id, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
            conn.query("INSERT INTO Video (userID,videoTitle,videoDescription,game,reference) VALUES("+videoInfo.UserID+",'"+videoInfo.VideoTitle+"','"+videoInfo.Description+"','"+videoInfo.Game+"','"+id+"') ", function (err, results) {
                conn.release();
                if (err) {
                    console.log(err);
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })   
    })
}