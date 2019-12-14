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
    // mudar para ficar igual á nova mensagem
    var logUser = req.params.loggedUser;
    var contact = req.params.contactID;
    profileDAO.getUserMessages(logUser,contact,function(err,result){
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