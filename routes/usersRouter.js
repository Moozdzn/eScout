var express = require('express');
const gdrive = require('./gdrive');
var profileDAO = require('../models/usersDAO');
var videoDAO = require('../models/videoDAO');
var router = express.Router();


router.get("/profile/:id", function(req,res,next){
    var user = req.params.id;
    profileDAO.getProfileInfo(user,function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

router.get("/profile/:id/videos", function(req,res,next){
    var user = req.params.id;
    profileDAO.getUserVideos(user, function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)
});

router.post("/videoupload", function(req,res){
    try {
        console.log(req.body.VideoTitle)
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let video = req.files.video;
            console.log(video);
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            video.mv('./uploads/' + video.name);
            try {
              gdrive.videoUpload(video.name, './uploads/' + video.name, (id) => {
                console.log(id);
                dataBase(req.body,id);
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

function dataBase(data,id){
    videoDAO.newVideo(data,id, function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    })
}
  
module.exports = router;