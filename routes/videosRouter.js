var express = require('express');
var videosDAO = require('../models/videosDAO');
var router = express.Router();



router.get("/:game", function(req,res,next){
    var game = req.params.game;
    videosDAO.getVideos(game,function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'Theres no videos for the chosen game'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)

});

router.post("/updateRating",function(req,res,next){
    videosDAO.updateRating(req.body,function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'Theres no videos for the chosen game'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send({message: "Rating updated successfully"});
    }, next)

})


module.exports = router;