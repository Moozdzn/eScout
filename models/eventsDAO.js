var pool = require("./conn").pool;


module.exports.getEvents = function(cb, next){
    pool.getConnection(function(err,conn){
        if(err){
            cb(err, {code:500, status:"Error connecting to database."})
            return;
        }
        conn.query("SELECT Event.name, Event.description, Event.date, EventLocation.latitude, EventLocation.longitude, EventLocation.name FROM Event INNER JOIN EventLocation ON Event.locationID = EventLocation.locationID");
        conn.release();
        if (err) {
            callback(err,{code: 500, status: "Error in a database query"})
            return;
        } 
        callback(false, {code: 200, status:"ok", data: results})
    })
};
