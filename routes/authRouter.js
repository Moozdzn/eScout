var express = require('express');
var authDAO = require('../models/authDAO');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post("/", function(req,res,next){

    authDAO.getUser(req.body.username,function(err,result){
        if(err){return res.status(500).send('Internal Server error');}
        if(result.data.length === 0) return res.status(404).send('No user found')
        var validPassword = bcrypt.compareSync(req.body.password,result.data[0].password)
        
        if(!validPassword) return res.status(401).send({auth: false, token: null})

        var token = jwt.sign({id: result.data[0].userID,type: result.data[0].userType},'secret',{
            expiresIn: 5* 3600
        });
        var cookieOptions = {
            expires: new Date(Date.now() + 5 * 3600000),
            httpOnly: true,
          }
        res.status(200).cookie('keyboard',token,cookieOptions).send({auth: true, user: {id: result.data[0].userID, type: result.data[0].userType}})
    }, next)
});

router.get('/', function(req,res,next){
    res.clearCookie('keyboard').status(200).send('/');
})

module.exports = router;