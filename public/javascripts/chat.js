var chatbox = document.getElementById("messages");

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
window.onload = function () {
    getMessages(5);
}