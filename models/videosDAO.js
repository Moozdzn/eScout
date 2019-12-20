var pool = require("./conn").pool;

module.exports.getVideos = function (game, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("SELECT Video.videoID,Video.videoTitle, Video.videoDescription, Video.rating, Video.reference,Video.rating*Video.views AS Result, User.username, User.userID, User.userType FROM Video INNER JOIN User on Video.userID = User.userID WHERE Video.game = '" + game + "' ORDER BY Result DESC", function (err, results) {
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

module.exports.updateRating = function (rating, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        var signal;
        if (rating.rating) signal = "+";
        else signal = "-";
        conn.query("UPDATE Video SET rating = rating " + signal + " 1 WHERE videoID =" + rating.vID + ";", function (err, results) {
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

