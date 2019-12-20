var express = require('express');
var videosDAO = require('../models/videosDAO');
var router = express.Router();



router.get("/:game", function(req,res,next){
    var game = req.params.game;
    videosDAO.getVideos(game,function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

router.post("/updateRating",function(req,res,next){
    videosDAO.updateRating(req.body,function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

})


module.exports = router;