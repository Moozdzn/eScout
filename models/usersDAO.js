var pool = require("./conn").pool;

module.exports.getProfileInfo = function (user, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        
        if (user != null) {

            conn.query("SELECT User.username, User.userType, User.name, User.birthDate, User.bio, User.game, User.mainPosition, Team.teamName, Region.regionName AS region FROM User INNER JOIN Team ON User.teamID = Team.teamID INNER JOIN Region ON User.regionID = Region.regionID WHERE User.userID=" + user + "; " , function (err, results) {
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
module.exports.getUserMessages = function(body,cb,next){
    console.log(JSON.stringify(body))
    
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }

            conn.query("SELECT messageFromID,message,messageDate FROM Message WHERE (messageToID ="+body.user+" OR messageFromID = "+body.user+") AND (messageToID = "+body.contact+" OR messageFromID = "+body.contact+");" , function (err, results) {
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
module.exports.getContact = function(user, cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        if (user != null) {

            conn.query("Select userID from User where username ='"+user+"';" , function (err, results) {
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

module.exports.getUserVideos = function(user, cb, next){
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        if (user != null) {

            conn.query("Select videoTitle,videoDescription,game,rating,reference from Video Where userID ="+user+" Order by uploadDate DESC;" , function (err, results) {
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

