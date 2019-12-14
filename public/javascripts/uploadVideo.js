
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
        }
        
        , error : function() { alert(JSON.stringify('error')); }
        
        });
})