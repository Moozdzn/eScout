var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var formidable = require('formidable');



const gdrive = require("./routes/gdrive");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var fileUpload = require('express-fileupload');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');

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
            gdrive.imageUpload(video.name, './uploads/' + video.name, (id) => {
              console.log(id);
          });
        }
          catch(err1) {
            res.status(500).send(err);
            console.log(err);
          
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
