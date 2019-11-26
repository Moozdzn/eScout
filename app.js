var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var formidable = require('formidable');

const gdrive = require("./routes/gdrive");

var indexRouter = require('./routes/index');
var eventsRouter = require('./routes/eventsRouter');
var authRouter = require('./routes/authRouter');
var profileRouter = require('./routes/profileRouter');

var app = express();

var fileUpload = require('express-fileupload');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');
//BEGIN
// NEEDS TO BE MOVED OUT OF app.js
app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));


app.post('/videoupload', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let video = req.files.video;

          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          video.mv('./uploads/' + video.name);
          try {
            gdrive.videoUpload(video.name, './uploads/' + video.name, (id) => {
              //NEED TO STORE id ON DATABASE
              console.log(id);
          });
        }
          catch(err1) {
            res.status(500).send(err1);
            console.log(err1);

          }

          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: video.name,
                  mimetype: video.mimetype,
                  size: video.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
      console.log(err);
  }
});
// END



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/events', eventsRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/videoupload', profileRouter);
app.use('/api/auth/register',authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
