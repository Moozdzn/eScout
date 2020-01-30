var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var verifyToken = require('../serverUtils/jwtToken').verifyToken;

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
