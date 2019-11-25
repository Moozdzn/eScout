var pool = require("./conn").pool;

module.exports.getProfileInfo = function(cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        if(sessionStorage.userID != null){
            conn.query("SELECT User.username, User.name, User.birthDate, User.region, User.bio, User.game, User.mainPosition, Team.teamName FROM User WHERE User.userID=" + sessionStorage.userID + " INNER JOIN Team ON User.teamID = Team.teamID", function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" });
                return;
            }
            cb(false, { code: 200, status: "ok", data: results });
        })
    } else{
        alert("Log in");
    }


    })

}