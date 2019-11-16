var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'eScout' });
});


/* GET home page from profile. 
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'eScout - Profile' });
});
*/

module.exports = router;
