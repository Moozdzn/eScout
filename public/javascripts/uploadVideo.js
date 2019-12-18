
$('#sendVideo').click(function (evt) {
    evt.preventDefault();
    
    var data = new FormData($("#formFile")[0]);
    //data.append('UserID', sessionStorage.userID)
    /*curl https://api.streamable.com/upload
        -u email:password
        -F file=@myvideo.mp4*/
    $.ajax({
        url: "https://api.streamable.com/upload",
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "Basic " + btoa("escout.app@gmail.com:escout123")); 
          },
        method : "post",
        data : data,
        processData: false,
        contentType: false,
        success: function(res, status){ 
         console.log(res)
        }
        
        , error : function(res) {console.log(res) }
        
        });
})