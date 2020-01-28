var express = require('express');
var teamDAO = require('../models/teamDAO');
var router = express.Router();


router.get("/:id", function (req, res, next) {
    var id = req.params.id;
    teamDAO.getTeamInfo(id, function (err, result) {
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'No teams with selected ID'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)

});

router.get("/:id/videos", function (req, res, next) {
    var id = req.params.id;
    teamDAO.getTeamVideos(id, function (err, result) {
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'Team videos do not exist for this ID'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)

});

module.exports = router;