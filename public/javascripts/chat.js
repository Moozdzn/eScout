var chatbox = document.getElementById("messages");
var contacts = document.getElementById("messageContacts");

var active;

function getMessages(contactID){
    if(active != undefined) active.classList.remove("active");
    var curr = document.getElementById(contactID);
    curr.classList.add("active");
    active = curr;

    $.ajax({
        url: "/api/users/"+sessionStorage.userID+"/messages/" + contactID,
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            var html = "";


            for(i in res){
                
                date = res[i].messageDate.slice(0,10);
                time = res[i].messageDate.slice(11,16);
                if (res[i].messageFromID == sessionStorage.userID){
                    html += '<div class="media w-50 ml-auto mb-3"><div class="media-body"><div class="bg-primary rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-white">'+res[i].message+'</p></div><p class="small text-muted">'+date+' | '+time+'</p></div></div>'
                  // <p class="small text-muted">12:00 PM | Aug 13</p>
                }
                else {
                    html += '<div class="media w-50 mb-3""><div class="media-body ml-3"><div class="bg-light rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-muted">'+res[i].message+'</p></div><p class="small text-muted">'+date+' | '+time+'</p></div></div>'
                }
                chatbox.innerHTML = html;
            }

        },
        error: function () {
            
        }
    })
}

function getContacts() {
    
    $.ajax({
        url: '/api/users/'+sessionStorage.userID+'/messages',
        method: 'get',
        dataType: 'json',
        success: function(res, status){
            if(res.err) return;
            var html = "";
            console.log(res)
            for(i in res){
                
                html += '<a id="'+res[i].userID+'" onclick="getMessages('+res[i].userID+')" class="list-group-item list-group-item-action  rounded-0"><div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"><div class="media-body ml-4"><div class="d-flex align-items-center justify-content-between mb-1"><h6 class="mb-0">'+res[i].username+'</h6></div></div></div></a>'
                //<small class="small font-weight-bold">25 Dec</small>   active text-white
            }  
            
            contacts.innerHTML = html;
        }
    })
}

$('#sendMessage').click(function (evt) {
    evt.preventDefault();
    var contact = active.id;
    $.ajax({
        url: "/api/users/"+sessionStorage.userID+"/messages/"+contact+"/new",
        method : "post",
        contentType : "application/json",
        data : JSON.stringify({message:$('#Message').val()}),
        
        success: function(res, status){
            $('#Message').val("")
            getMessages(contact);
        }
        
        , error : function() {}
        
        });
    
})

window.onload = function () {
    getContacts();
}