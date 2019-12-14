var pool = require("./conn").pool;

module.exports.getProfileInfo = function (user, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        
        if (user != null) {

            conn.query("SELECT User.username, User.userType, User.name, User.birthDate, User.region, User.bio, User.game, User.mainPosition, Team.teamName FROM User INNER JOIN Team ON User.teamID = Team.teamID WHERE User.userID=" + user + "; " , function (err, results) {
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
module.exports.getUserMessages = function(logUser,contact,cb,next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }

            conn.query("SELECT messageFromID,message,messageDate FROM Message WHERE (messageToID ="+logUser+" OR messageFromID = "+logUser+") AND (messageToID = "+contact+" OR messageFromID = "+contact+");" , function (err, results) {
                conn.release();
                if (err) {
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })
        
    })

}

module.exports.getContacts = function(logUser, cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }

            conn.query("SELECT  User.username, User.userID FROM Message INNER JOIN User ON User.userID = Message.messageToID WHERE Message.messageFromID = "+ logUser +" UNION SELECT  User.username, User.userID FROM Message  INNER JOIN User ON User.userID = Message.messageFromID WHERE Message.messageToID ="+ logUser , function (err, results) {
                conn.release();
                if (err) {
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })
        
    })
} 
module.exports.newMessage = function(body,cb,next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }

            conn.query("INSERT INTO Message (messageToID,messageFromID,message) VALUES ("+body.contact+","+body.user+",'"+body.message+"') " , function (err, results) {
                conn.release();
                if (err) {
                    cb(err, { code: 500, status: "Error in a database query" });
                    return;
                }
                cb(false, { code: 200, status: "ok", data: results });
            })
        
    })
}
module.exports.getUserVideos = function(user, cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        
        console.log(user);
        if (user != null) {

            conn.query("SELECT videoTitle, videoDescription, game, rating, reference FROM Video WHERE userID=" + user +" ORDER BY uploadDate" , function (err, results) {
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