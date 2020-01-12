var express = require('express');
const gdrive = require('./gdrive');
var profileDAO = require('../models/usersDAO');
var videoDAO = require('../models/videoDAO');
var router = express.Router();
var response = {};

// id,profile 
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
// id, contacts
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

//id, contacts, idcontact (. messages)
router.get("/:logUser/messages/:contactID", function(req,res,next){
    req.body["user"] = req.params.logUser;
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
//id, videos
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
//id,video
router.post("/videoupload", function(req,res){
    try {
        
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let video = req.files.video;
            
            video.mv('./uploads/' + video.name);
            try {
              gdrive.videoUpload(video.name, './uploads/' + video.name, (id) => {
                
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
              
  
            }
            //send response
            
        }
    } catch (err) {
        res.status(500).send(err);
        
    }
  });

  router.post("/:logUser/messages/:contactID/new", function(req,res,next){
    req.body["user"] = req.params.logUser;
    req.body["contact"] = req.params.contactID; 
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
                
            })
            return res.send(response)
        }  
        //res.status(result.code).send(result.data);
        else {
            response.dbStatus = 200;
            response.dbMessage = "File uploaded to Drive and id saved on DB";
            
            return res.send(response)
        }
    })
    
}

router.get("/:user", function(req,res,next){
    profileDAO.getContact(req.params.user, function(err,result){
        if(err){
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)

});
  
module.exports = router;