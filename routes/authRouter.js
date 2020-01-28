var express = require('express');
var authDAO = require('../models/authDAO');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post("/", function(req,res,next){

    authDAO.getUser(req.body.username,function(err,result){
        if(err){return res.status(500).send('Internal Server error');}
        if(result.data.length === 0) return res.status(404).send('No user found')
        if(result.data[0].password != req.body.password) return res.status(401).send({auth: false, token: null})

        var token = jwt.sign({id: result.data[0].userID},'secret',{
            expiresIn: 86400
        });
        console.log(token);
        var cookieOptions = {
            httpOnly: true,
          }
        res.status(200).cookie('keyboard',token,cookieOptions).send({auth: true, user: {id: result.data[0].userID, type: result.data[0].userType}})
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