var express = require('express');
var profileDAO = require('../models/usersDAO');
var router = express.Router();


router.get("/profile/:id", function(req,res,next){
    var user = req.params.id;
    console.log(user);
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