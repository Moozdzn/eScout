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
        else if(result.data.length === 1) res.status(result.code).send(result.data);
        else {
            res.statusMessage = "User not found";
            res.status(401).json('Error retriving user');
        }
        
    }, next)

});

router.post("/register", function(req,res,next){
    
    authDAO.newUser(req.body,function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)
});

router.get("/register", function(req,res,next){
    if(req.query.querySelect ==='userList'){
        authDAO.userList(function(err,result){
            if(err){
                res.statusMessage = result.status;
                res.status(result.code).json(err);
                return;
            }
            res.status(result.code).send(result.data);
        }, next)
    }
    else {
        console.log('working');
    }
});

module.exports = router;