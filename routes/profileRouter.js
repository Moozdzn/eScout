var express = require('express');
var profileDAO = require('../models/profileDAO');
var router = express.Router();


router.get("/", function(req,res,next){
    var user = req.query.id;
    profileDAO.getProfileInfo(user,function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

module.exports = router;