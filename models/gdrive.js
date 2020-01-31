
const fs = require("fs");
const {google} = require('googleapis');
 
module.exports.videoUpload = function(fileName, filePath, callback){
    require("./gdrive-auth")((auth) => {
      var folderId = '1r4WOAHH2cJ9jvGtVifM6LLOYYXvvY8nD';
        const fileMetadata = {
            name: fileName,
            parents: [folderId]
        };
 
        const media = {
            mimeType: "video/mp4",
            body: fs.createReadStream(filePath)
        }
        
        const drive = google.drive({version: 'v3', auth});
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
          }, function (err, file) {
            if (err) {
              // Handle error
              console.error(err);
            } else {
              callback(file.data.id);
            }
          });
    });
}

module.exports.videoDelete = function(id,callback) {
  require("./gdrive-auth")((auth) => {
      
      const drive = google.drive({version: 'v3', auth});
      drive.files.delete({
          fields: id
        }, function (err) {
          if (err) {
            // Handle error
            console.error(err);
          } else {
            callback('deleted');
          }
        });
  });
}
 
