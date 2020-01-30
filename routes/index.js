var express = require('express');
var authDAO = require('../models/authDAO');
var router = express.Router();
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  var token = req.cookies.keyboard;
  if (!token)
    return res.status(403).send('<p>No token provided. Click <a href="/auth">me</a> to login.</p>');
    
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err)
    return res.status(500).send('<p>Your token is not valid. Click <a href="/auth">me</a> to login again.</p>');

    req.userId = decoded.id;
    next();
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/profile', function(req,res, next){
    res.render('profile',{title: 'Profile'});   
});

router.get('/events',function(req,res, next){
  res.render('events',{title: 'Events'});
}); 
router.get('/createEvent',verifyToken,function(req,res, next){
  authDAO.getUser(req.userId,function(err,result){
    if(err){return res.status(500).send('Internal Server error');}
    if(result.data.length === 0) return res.status(404).send('<p>Your not logged in. Click <a href="/auth">me</a> to login.</p>')
    if(result.data[0].userType !='EO') return res.status(401).send('<p>You dont have permission to see this page. Go <a href="/events">back</a></p>')
    res.render('createEvent',{title: 'New Event'});
  })
  
});
router.get('/uploadVideo',function(req,res, next){
  res.render('uploadVideo',{title: 'Upload Video'});
});
router.get('/auth',function(req,res, next){
  res.render('auth',{title: 'Login'});
});
router.get('/register',function(req,res, next){
  res.render('register',{title: 'Register'});
});
router.get('/chat',verifyToken,function(req,res,next){
  if(req.userId) return res.render('chat',{title: 'Messages'});
  res.status(401).send('Not authorized to see this page!');
});
router.get('/team',function(req,res,next){
  res.render('team',{title: 'Team Page'})
});

module.exports = router;
