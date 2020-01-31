var express = require('express');
var eventsDAO = require('../models/eventsDAO');
var router = express.Router();
var verifyToken = require('../serverUtils/jwtToken').verifyToken;
var createError = require('http-errors');


router.get("/:game", function (req, res, next) {
    var game = req.params.game;
    eventsDAO.getEvents(game,function (err, result) {
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'No events related to this game'});
        if(false) return res.status(401).send('You are unauthorized to make this request')
        res.status(200).send(result.data);
    }, next) 

});

router.post("/",verifyToken, function (req, res, next) {
    if(req.userId && req.userType ==='EO'){
        eventsDAO.newEvent(req.body, function (err, result) {
            if(err){return res.status(500).send({error:'Internal Server error'});}
            if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
            res.status(200).send({success: "Event created successfully"});
        }, next)
    } else {next(createError(403,'You dont have permissions to make this request'))}
    
});

router.get("/heatmap/regions", function (req, res, next) {
    eventsDAO.getRegions(function (err, result) {
        if(err){return res.status(500).send('Internal Server error');}
        if(false) return res.status(401).send('You are unauthorized to make this request')
        res.status(200).send(result.data);
    }, next)
});



module.exports = router;