
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
          // NEEDS IMPROVEMENT
          var response = JSON.stringify(res);
          var ID = parseInt(response.substring(11, response .length-2));
          console.log(ID);
          alert('SUCCESS');
          sessionStorage.userID = ID;
          window.location.href = '/';
          
          //
        }
        
        , error : function() { alert(JSON.stringify('error')); }
        
        });
})

$(document).ready(function(){
    
});