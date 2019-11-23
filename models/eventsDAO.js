var pool = require("./conn").pool;


module.exports.getEvents = function (cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("SELECT Event.eventName, Event.eventDescription, Event.eventDate, EventLocation.latitude, EventLocation.longitude, EventLocation.eventlocationName FROM Event INNER JOIN EventLocation ON Event.locationID = EventLocation.locationID", function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })


    })


};
