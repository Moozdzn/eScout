var express = require('express');
const gdrive = require('./gdrive');
var profileDAO = require('../models/usersDAO');
var videoDAO = require('../models/videoDAO');
var router = express.Router();
var response = {};


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
router.get("/:loggedUser/messages", function(req,res,next){
    var logUser = req.params.loggedUser;
    profileDAO.getContacts(logUser,function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)
});
router.get("/:loggedUser/messages/:contactID", function(req,res,next){
    req.body["user"] = req.params.loggedUser;
    req.body["contact"] = req.params.contactID;
    profileDAO.getUserMessages(req.body,function(err,result){
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
            let video = req.files.video;
            console.log(video);
            video.mv('./uploads/' + video.name);
            try {
              gdrive.videoUpload(video.name, './uploads/' + video.name, (id) => {
                console.log(id);
                response = {
                    status: true,
                    driveMessage: 'File is uploaded',
                    data: {
                        name: video.name,
                        mimetype: video.mimetype,
                        size: video.size
                    }
                }
                dataBase(req.body,id,res);
            });
          }
            catch(err1) {
              res.status(500).send(err1);
              console.log(err1);
  
            }
            //send response
            
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
  });

  router.post("/:logUser/messages/:contactID/new", function(req,res,next){
    var user = req.params.logUser;
    var contact = req.params.contactID;
    req.body["user"] = user;
    req.body["contact"] = contact;
    console.log(req.body);  
    profileDAO.newMessage(req.body, function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});

function dataBase(data,id,res){
    videoDAO.newVideo(data,id, function(err){  
        if(err){
            response.dbStatus = 500;
            response.dbMessage = "File uploaded to Drive but id was not saved on DB";
            gdrive.videoDelete(id, (result) => {
                console.log(result)
            })
            return res.send(response)
        }  
        //res.status(result.code).send(result.data);
        else {
            response.dbStatus = 200;
            response.dbMessage = "File uploaded to Drive and id saved on DB";
            console.log(response)
            return res.send(response)
        }
    })
    
}
  
module.exports = router;