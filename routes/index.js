var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var createError = require('http-errors');

function verifyToken(req, res, next) {

  var token = req.cookies.keyboard;
  if (!token)
    return res.status(401).send('<p>No token provided. Click <a href="/auth">me</a> to login.</p>');
    
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err)
    return res.status(401).send('<p>Your token is not valid. Click <a href="/auth">me</a> to login again.</p>');

    req.userId = decoded.id;
    req.userType = decoded.type;
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
    if(req.userId && req.userType ==='EO') return res.render('createEvent',{title: 'New Event'});
    next(createError(403,'You dont have permission to see this page.'))
});
router.get('/uploadVideo',verifyToken,function(req,res, next){
  if(req.userId && (req.userType ==='Player' || req.userType ==='Pro') ) return res.render('uploadVideo',{title: 'Upload Video'});
  next(createError(403,'You dont have permission to see this page.'))
});
router.get('/auth',function(req,res, next){
  res.render('auth',{title: 'Login'});
});
router.get('/register',function(req,res, next){
  res.render('register',{title: 'Register'});
});
router.get('/chat',verifyToken,function(req,res,next){
  if(req.userId) return res.render('chat',{title: 'Messages'});
  next(createError(403,'You dont have permission to see this page.'))
});
router.get('/team',function(req,res,next){
  res.render('team',{title: 'Team Page'})
});

module.exports = router;
