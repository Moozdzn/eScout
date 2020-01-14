var chatbox = document.getElementById("messages");
var contacts = document.getElementById("messageContacts");
var contactList = [];

var active;

function getMessages(contactID) {
    manageActive(contactID);
    $.ajax({
        url: "/api/users/" + sessionStorage.userID + "/contacts/" + contactID+"/messages",
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            var html = "";

            for (i in res) {

                date = res[i].messageDate.slice(0, 10);
                time = res[i].messageDate.slice(11, 16);
                if (res[i].messageFromID == sessionStorage.userID) {
                    html += '<div class="media w-50 ml-auto mb-3"><div class="media-body"><div class="bg-primary rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-white">' + res[i].message + '</p></div><p class="small text-muted">' + date + ' | ' + time + '</p></div></div>'
                    // <p class="small text-muted">12:00 PM | Aug 13</p>
                }
                else {
                    html += '<div class="media w-50 mb-3""><div class="media-body ml-3"><div class="bg-light rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-muted">' + res[i].message + '</p></div><p class="small text-muted">' + date + ' | ' + time + '</p></div></div>'
                }
                
            }
            chatbox.innerHTML = html;

        },
        error: function () {

        }
    })
}

function getContacts() {
    $.ajax({
        url: '/api/users/' + sessionStorage.userID + '/contacts',
        method: 'get',
        dataType: 'json',
        success: function (res, status) {
            if (res.err) return;
            var html = "";
            for (i in res) {
                if(res[i].userID != sessionStorage.messageToID && sessionStorage.messageToName != res[i].username){
                    html += '<a id="' + res[i].userID + '" onclick="getMessages(' + res[i].userID + ')" class="list-group-item list-group-item-action  rounded-0"><div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"><div class="media-body ml-4"><div class="d-flex align-items-center justify-content-between mb-1"><h6 class="mb-0">' + res[i].username + '</h6></div></div></div></a>'
                }
                //<small class="small font-weight-bold">25 Dec</small>   active text-white
                if(sessionStorage.messageToID != undefined  && sessionStorage.messageToName != undefined) {
                    newContactBox(sessionStorage.messageToID,sessionStorage.messageToName)
                    sessionStorage.removeItem('messageToID');
                    sessionStorage.removeItem('messageToName');  
                }
                contactList.push(res[i].userID)

            }

            contacts.innerHTML = contacts.innerHTML+ html ;
        }
    })
}

$('#sendMessage').click(function (evt) {
    evt.preventDefault();
    var contact = active.id;
    $.ajax({
        url: "/api/users/" + sessionStorage.userID + "/contacts/" + contact + "/messages",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({ message: $('#Message').val() }),
        success: function (res, status) {
            $('#Message').val("")
            getMessages(contact);
        }
        , error: function () { }
    });

})

window.onload = function () {
    getContacts();
}
setInterval(function () {
    if (active.id != undefined)
        getMessages(active.id)
}, 5000)

function newContactBox(id,name){
    for(i in contactList){
        if(contactList[i] == id){
            alert('Chat already created, check your Recent tab');
            return;
        }
    }
    var html = "";
        html += '<a id="' + id + '" onclick="getMessages(' + id + ')" class="list-group-item list-group-item-action  rounded-0"><div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"><div class="media-body ml-4"><div class="d-flex align-items-center justify-content-between mb-1"><h6 class="mb-0">' + name + '</h6></div></div></div></a>'
        contacts.innerHTML = html + contacts.innerHTML;

    manageActive(id);
    getMessages(id);
}
function newContact(){
    var user = prompt("Enter username (WARNING: Usernames are case sensitive)", "ex:Mooz");

    if (user != null) {
    $.ajax({
        url: "/api/users/"+user,
        method: "get",
        contentType: "application/json",
        success: function (res, status) {
            if(res.length == 0)alert('Username not found - CAUSE: Mistyped or not existent')
            else{newContactBox(res[0].userID,user)
            }
        }
        , error: function () { 
            alert('There was an error between you and us, we are sorry about that. Please try again later')
        }
    });
    }
}

function manageActive(contactID){
    if (active != undefined) active.classList.remove("active");
    var curr = document.getElementById(contactID);
    curr.classList.add("active");
    active = curr;
}
