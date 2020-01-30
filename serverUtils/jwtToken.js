var jwt = require('jsonwebtoken');

module.exports.verifyToken = function(req, res, next) {

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