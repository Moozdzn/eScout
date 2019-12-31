var currentDate = new Date();

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
//var urlParamsSearch = 

var user = sessionStorage.userID;

window.onload = function () {
    
    if (urlParams.has('id') && urlParams.get('id') != user) {
        getProfile(parseInt(urlParams.get('id')), true);
        getVideos(parseInt(urlParams.get('id')));
        if(user != undefined) 
            buttons.innerHTML = '<button type="button" class="btn btn-warning" onclick="message()">Message</button>';
    }
    else {
        getProfile(user);
        getVideos(user);

        if (urlParams.has('type') && urlParams.get('type') == 'Player' && urlParams.get('id') == user)
            buttons.innerHTML = '<a href="uploadVideo"><button type="button" class="btn btn-primary">Upload</button></a>';
        
    }
    
}


function message() {
    sessionStorage.messageToID = urlParams.get('id');
    sessionStorage.messageToName = $('#pusername').text();
    window.location.href = 'chat';
    /* $.ajax({
        url: "/api/users/" + sessionStorage.userID + "/messages/" + parseInt(urlParams.get('id')) + "/new",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({ message: 'Started a conversation.' }),

        success: function (res, status) {
            window.location.href = 'chat';
        }
        , error: function () { }

    }); */
};

function getProfile(id, bool) {
    $.ajax({
        url: "/api/users/profile/" + id,
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;


            var s = JSON.stringify(res);
            var data = JSON.parse(s);

            pusername.innerHTML = data[0].username;
            pName.innerHTML += data[0].name;
            pAge.innerHTML += currentDate.getFullYear() - data[0].birthDate.substring(0, data[0].birthDate.length - 20);
            pRegion.innerHTML += data[0].region;
            pGame.innerHTML += data[0].game;
            if (data[0].mainPosition != null)
                pMainPos.innerHTML = "Main Position: " + data[0].mainPosition;
            if (data[0].teamName != 'Null')
                pTeam.innerHTML = "Team: " + data[0].teamName;
            pBio.innerHTML = data[0].bio;


            if (data[0].userType === 'Player' || data[0].userType === 'Pro')
                highlight.innerHTML = '<h2>Highlights</h2>';
            

            if (data[0].userType != 'Scout' && bool == undefined)
                buttons.innerHTML = '<a href="uploadVideo"><button type="button" class="btn btn-primary">Upload</button></a>';


        },
        error: function () {
            window.location.href = "auth";
        }
    })

}

function getVideos(id) {
    var videosList = document.getElementById("videosList");

    $.ajax({
        url: "/api/users/profile/" + id + "/videos",
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;

            var html = "";
            for (i in res) {
                html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100"><iframe class="card-img-top" src="https://drive.google.com/file/d/' + res[i].reference + '/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">' + res[i].videoTitle + '</a></h4><p class="card-text">' + res[i].videoDescription + '</p><p> <i style="color:green" class="fas fa-thumbs-up"></i>   <i style="color:darkred" class="fas fa-thumbs-down"></i></p></div></div></div></div>'
            }
            videosList.innerHTML = html;
        }

    })
}
