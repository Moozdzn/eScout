var pool = require("./conn").pool;


module.exports.getEvents = function (cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("SELECT * FROM Event INNER JOIN EventLocation ON Event.locationID = EventLocation.locationID", function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })


    })


};
module.exports.newEvent = function (cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("INSERT INTO Event (eventName, eventDescription, eventStartTime, eventTicketPrice) VALUES ('"+ eventName + "','"+ eventDesc + "','" + eventStartTime +"',"+ eventTicketPrice + "); INSERT INTO AttendeeType (userID,eventID,type) VALUES ("+ userID + ","+ eventID + "," + type + ");", function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })
    })
};
