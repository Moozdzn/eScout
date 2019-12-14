var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/profile',function(req,res, next){
  res.render('profile',{title: 'Profile'});
});
router.get('/events',function(req,res, next){
  res.render('events',{title: 'Events'});
}); 
router.get('/createEvent',function(req,res, next){
  res.render('createEvent',{title: 'New Event'});
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
router.get('/chat',function(req,res,next){
  res.render('chat',{title: 'Messages'})
})
module.exports = router;
