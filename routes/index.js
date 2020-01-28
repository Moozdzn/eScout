var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  var token = req.cookies.keyboard;
  if (!token)
    return res.status(403).send('<p>No token provided. Click <a href="/auth">me</a> to login.');
    
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err)
    return res.status(500).send('<p>Your token is not valid. Click <a href="/auth">me</a> to login again.');

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
router.get('/chat',verifyToken,function(req,res,next){
  if(req.userId) return res.render('chat',{title: 'Messages'});
  res.status(401).send('Not authorized to see this page!');
});
router.get('/team',function(req,res,next){
  res.render('team',{title: 'Team Page'})
});

module.exports = router;
