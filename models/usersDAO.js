var pool = require("./conn").pool;

module.exports.getProfileInfo = function (user, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        
        if (user != null) {

            conn.query("SELECT User.username, User.userType, User.name, User.birthDate, User.bio, User.game, User.mainPosition, Team.teamName, Team.teamID, Region.regionName AS region FROM User INNER JOIN Team ON User.teamID = Team.teamID INNER JOIN Region ON User.regionID = Region.regionID WHERE User.userID=?; ",user , function (err, results) {
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
    
    
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }

            conn.query("SELECT messageFromID,message,messageDate FROM Message WHERE (messageToID =? OR messageFromID =?) AND (messageToID = ? OR messageFromID = ?);",[body.user,body.user,body.contact,body.contact] , function (err, results) {
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

            conn.query("SELECT  User.username, User.userID FROM Message INNER JOIN User ON User.userID = Message.messageToID WHERE Message.messageFromID = ? UNION SELECT  User.username, User.userID FROM Message  INNER JOIN User ON User.userID = Message.messageFromID WHERE Message.messageToID =?" ,[logUser,logUser], function (err, results) {
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

            conn.query("INSERT INTO Message (messageToID,messageFromID,message) VALUES (?,?,?);",[body.contact,body.user,body.message] , function (err, results) {
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

            conn.query("Select userID from User where username =?;" ,user, function (err, results) {
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

            conn.query("SELECT videoID,videoTitle,videoDescription,game,rating,reference FROM Video WHERE userID =? ORDER BY uploadDate DESC;",user , function (err, results) {
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

