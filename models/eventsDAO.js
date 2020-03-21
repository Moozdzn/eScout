var pool = require("./conn").pool;
var lastLocationID;


module.exports.getEvents = function (game,cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }
        conn.query("SELECT * FROM Event INNER JOIN EventLocation ON Event.locationID = EventLocation.locationID WHERE Event.eventGame = ? ORDER BY Event.eventStartTime",game, function (err, results) {
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
        lastLocationID++;
        var eventDate = body.Edate + " " + body.Estart;
        conn.query("INSERT INTO `EventLocation`(`latitude`, `longitude`, `eventlocationName`) VALUES (?,?,?); INSERT INTO Event (eventName, eventGame, eventDescription, eventStartTime, eventTicketPrice, locationID) VALUES (?,?,?,?,?,?);",[body.Elat, body.Elng, body.Eadress,body.Ename, body.Egame, body.Edesc, eventDate, body.Eprice, lastLocationID], function (err, results) {
            conn.release();
            if (err) {
                cb(err, { code: 500, status: "Error in a database query" })
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })
    })
};

module.exports.lastAddressID = function (cb, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        }

        conn.query("Select `locationID` from EventLocation where `locationID` = ( SELECT MAX(`locationID`) FROM EventLocation)", function (err, results) {
            conn.release();
            if (err) {
                return;
            }
            lastLocationID = results[0].locationID;
        })
    })
};

module.exports.getRegions = function (cb,next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            cb(err, { code: 500, status: "Error connecting to database." })
            return;
        } 
        conn.query("SELECT Region.regionID, Region.regionName , COUNT(userID) AS playersPerRegion, Region.regionLat, Region.regionLong FROM User INNER JOIN Region ON User.regionID = Region.regionID GROUP BY Region.regionID;", function (err, results) {
            conn.release();
            if (err) {
                return;
            }
            cb(false, { code: 200, status: "ok", data: results })
        })
    })
}
