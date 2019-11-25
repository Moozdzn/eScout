var express = require('express');
var authDAO = require('../models/authDAO');
var router = express.Router();

router.post("/", function(req,res,next){

    authDAO.verifyUser(req.body,function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

module.exports = router;