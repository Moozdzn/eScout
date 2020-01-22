$( document ).ready(function() {
    var userArray = [];
    $.ajax({
        url: '/api/auth/register?querySelect=userList',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            for (var key in res) {
                var x = JSON.stringify(Object.values(res[key]));
                var y =  x.substring(2, x.length-2); 
                userArray.push(y);
            }
        }

    })
    
    $( "#inputUsername" ).focusout(function() {
        for(var user in userArray){
            if($('#inputUsername').val() === userArray[user]) {
                //FOCUS NEEDS TO RETURN
                alert('That username already exists');
                return
            }
        }
    })
    

});
