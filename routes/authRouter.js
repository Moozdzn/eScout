var express = require('express');
var authDAO = require('../models/authDAO');
var router = express.Router();

router.post("/", function(req,res,next){

    authDAO.verifyUser(req.body,function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'User with this combination does not exist'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)

});

module.exports = router;