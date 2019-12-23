var pool = require("./conn").pool;


module.exports.getEvents = function (cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("SELECT * FROM Event INNER JOIN EventLocation ON Event.locationID = EventLocation.locationID ORDER BY Event.eventStartTime", function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })


    })


};
module.exports.newEvent = function (body, cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        
        conn.query("INSERT INTO Event (eventName, eventDescription, eventStartTime, eventTicketPrice, locationID) VALUES ('"+ body.Ename + "','"+ body.Edesc + "','" + body.Edate+ " " +body.Estart +"',"+ body.Eprice + ",3); "  , function (err, results) {
        //INSERT INTO AttendeeType (userID,eventID,type) VALUES ("+ userID + ","+ eventID + "," + type + ");"
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })
    })
};
