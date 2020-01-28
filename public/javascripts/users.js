var currentDate = new Date();
var videos = [];

var pusername = document.getElementById("pusername"),
    pName = document.getElementById("pName"),
    pAge = document.getElementById("pAge"),
    pRegion = document.getElementById("pRegion"),
    pGame = document.getElementById("pGame"),
    pMainPos = document.getElementById("pMainPos"),
    pTeam = document.getElementById("pTeam"),
    pBio = document.getElementById("pBio");
var buttons = document.getElementById("buttons");
var highlight = document.getElementById("highlight");
var urlParams = new URLSearchParams(window.location.search);

var user = sessionStorage.userID;

window.onload = function () {
    //Determines which buttons to show
    if (urlParams.has('id') && urlParams.get('id') != user) {
        getProfile(parseInt(urlParams.get('id')), true);
        getVideos();
        if (user != undefined)
            buttons.innerHTML = '<button type="button" class="btn btn-warning" onclick="message()">Message</button>';
    }
    else if (sessionStorage.userType == undefined) {
        window.location.href = 'auth'
    }
    else {
        getProfile(user);
        getVideos();

        if (urlParams.has('type') && urlParams.get('type') == 'Player' && urlParams.get('id') == user)
            buttons.innerHTML = '<a href="uploadVideo"><button type="button" class="btn btn-primary">Upload</button></a>';
    }  
}
// Redirects to chat page
function message() {
    sessionStorage.messageToID = urlParams.get('id');
    sessionStorage.messageToName = $('#pusername').text();
    window.location.href = 'chat';
};
// Loads and displays users profile info
function getProfile(id, bool) {
    $.ajax({
        url: "/api/users/" + id + "/profile",
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;

            var s = JSON.stringify(res);
            var data = JSON.parse(s);
            console.log(data)
            pusername.innerHTML = data[0].username;
            pName.innerHTML += data[0].name;
            pAge.innerHTML += currentDate.getFullYear() - data[0].birthDate.substring(0, data[0].birthDate.length - 20);
            pRegion.innerHTML += data[0].region;
            if (data[0].game != null)
                pGame.innerHTML = 'Game: ' + data[0].game;
            if (data[0].mainPosition != null)
                pMainPos.innerHTML = "Main Position: " + data[0].mainPosition;
            if (data[0].teamName != 'Null')
                pTeam.innerHTML = "Team: <a href='team?tid=" + data[0].teamID + "'>" + data[0].teamName + "</a>"
            pBio.innerHTML = data[0].bio;

            if (data[0].userType === 'Player' || data[0].userType === 'Pro')
                highlight.innerHTML = '<h2>Highlights</h2>';

            if (data[0].userType != 'Scout' && data[0].userType != 'EO' && bool == undefined)
                buttons.innerHTML = '<a href="uploadVideo"><button type="button" class="btn btn-primary">Upload</button></a>';
        },
        error: function () {
            window.location.href = "auth";
        }
    })
}


