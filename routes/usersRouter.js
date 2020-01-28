var express = require('express');
const gdrive = require('./gdrive');
var profileDAO = require('../models/usersDAO');
var videoDAO = require('../models/videosDAO');
var router = express.Router();
var response = {};
 
router.get("/:id/profile", function(req,res,next){
    var user = req.params.id;
    profileDAO.getProfileInfo(user,function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'User does not exist'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)

});

router.get("/:id/contacts", function(req,res,next){
    var user = req.params.id;
    profileDAO.getContacts(user,function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'User does not exist'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)
});

router.get("/:id/contacts/:contactID/messages", function(req,res,next){
    req.body["user"] = req.params.id;
    req.body["contact"] = req.params.contactID;
    
    
    profileDAO.getUserMessages(req.body,function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'User or Contact does not exist'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)
});

router.get("/:id/videos", function(req,res,next){
    var user = req.params.id;
    profileDAO.getUserVideos(user, function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'User does not exist'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)
});

router.post("/:id/videos", function(req,res){
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
        
        else {
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
  
  router.post("/:id/contacts/:contactID/messages", function(req,res,next){
    req.body["user"] = req.params.id;
    req.body["contact"] = req.params.contactID; 
    profileDAO.newMessage(req.body, function(err,result){
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'User or Contact does not exist'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
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
        if(err){return res.status(500).send({error:'Internal Server error'});}
        if(result.data.length === 0) return res.status(404).send({error:'User does not exist'});
        if(false) return res.status(401).send({error:'You are unauthorized to make this request'})
        res.status(200).send(result.data);
    }, next)

});
  
module.exports = router;