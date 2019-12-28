
$('#sendVideo').click(function (evt) {
    evt.preventDefault();
    
    var data = new FormData($("#formFile")[0]);
    data.append('UserID', sessionStorage.userID)
    $.ajax({
        url: "/api/users/videoupload",
        method : "post",
        data : data,
        processData: false,
        contentType: false,
        success: function(res, status){ 
         console.log(res)
         if(res.status && res.dbStatus){
             alert('File Uploaded successfully')
             window.location.href = 'profile'

         }
         else alert('Error Uploading File - Please try again later')
        }
        
        , error : function() { alert(JSON.stringify('error')); }
        
        });
})

function getVideoName(){
    $('#videoLabel').text($('#video')[0].files[0].name)
}