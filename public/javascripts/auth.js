
  $('#confirm').submit(function (evt) {
    evt.preventDefault();
    $.ajax({
        url: "/api/auth",
        method : "post",
        contentType : "application/json",
        data : JSON.stringify({ 
                username: $("#inputUsername").val(), 
                password: $("#inputPassword").val(),  
            }),
        
        success: function(res, status){ 
          alert('SUCCESS');
          sessionStorage.userID = parseInt(Object.values(res[0]));;
          window.location.href = '/';
          
          //
        }
        
        , error : function() { alert(JSON.stringify('error')); }
        
        });
})

$(document).ready(function(){
    
});