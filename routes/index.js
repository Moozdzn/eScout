var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
