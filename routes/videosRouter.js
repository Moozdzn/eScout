var express = require('express');
var videosDAO = require('../models/videosDAO');
var router = express.Router();



router.get("/pubg", function(req,res,next){
    videosDAO.getPUBGvideos(function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

router.get("/lol", function(req,res,next){
    videosDAO.getPUBGvideos(function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

module.exports = router;