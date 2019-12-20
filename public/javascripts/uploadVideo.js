
$('#sendVideo').click(function (evt) {
    evt.preventDefault();
    
    var data = new FormData($("#formFile")[0]);
    console.log(data)
    //data.append('UserID', sessionStorage.userID)
    /*curl https://api.streamable.com/upload
        -u email:password
        -F file=@myvideo.mp4*/
    $.ajax({
        url: "/api/users/videoupload",
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
/*
$.ajax({
        url: "https://api.streamable.com/upload",
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "Basic ZXNjb3V0LmFwcEBnbWFpbC5jb206ZXNjb3V0MTIz"); 
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
*/