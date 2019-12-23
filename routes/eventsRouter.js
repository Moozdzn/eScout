var express = require('express');
var eventsDAO = require('../models/eventsDAO');
var router = express.Router();


router.get("/", function(req,res,next){
    eventsDAO.getEvents(function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

router.post("/newEvent", function(req,res,next){
    console.log(req.body)
    
    eventsDAO.newEvent(req.body, function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});



module.exports = router;