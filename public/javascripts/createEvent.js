   $('#confirm').submit(function(evt) {
        evt.preventDefault();
        $.ajax({
            url: "/api/events",
            method : "post",
            contentType : "application/json",
            data : JSON.stringify({ eventName:$("#Ename").val(), 
                    eventDesc: $("#Edesc").val(),  
                    eventStart: $("#Estart").val(),
                    eventLoc:$("#Eloc").val(),
                    eventDate:$("#Edate").val(),
                    eventPrice:$("#Eprice").val(),
                    organizerName:$("#Oname").val(),
    
                }),
            
            success: function(res, status){ document.getElementById("res").innerHTML = JSON.stringify(res); }
            
            , error : function() { document.getElementById("res").innerHTML = "Error"; }
            
            });
    })

    


$(document).ready( function() {

})