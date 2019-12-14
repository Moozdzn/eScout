var chatbox = document.getElementById("messages");
var contacts = document.getElementById("messageContacts");

function getMessages(contactID){
    $.ajax({
        url: "/api/users/"+sessionStorage.userID+"/messages/" + contactID,
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            var html = "";


            for(i in res){
                if (res[i].messageFromID == sessionStorage.userID){
                    html += '<div class="media w-50 ml-auto mb-3"><div class="media-body"><div class="bg-primary rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-white">'+res[i].message+'</p></div></div></div>'
                  // <p class="small text-muted">12:00 PM | Aug 13</p>
                }
                else {
                    html += '<div class="media w-50 mb-3""><div class="media-body ml-3"><div class="bg-light rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-muted">'+res[i].message+'</p></div></div></div>'
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
                
                html += '<a onclick="getMessages('+res[i].userID+')" class="list-group-item list-group-item-action  rounded-0"><div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"><div class="media-body ml-4"><div class="d-flex align-items-center justify-content-between mb-1"><h6 class="mb-0">'+res[i].username+'</h6></div></div></div></a>'
                //<small class="small font-weight-bold">25 Dec</small>   active text-white
            }  
            
            contacts.innerHTML = html;
        }
    })



}
window.onload = function () {
    getContacts();
}