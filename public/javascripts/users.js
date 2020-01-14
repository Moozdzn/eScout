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

    if (urlParams.has('id') && urlParams.get('id') != user) {
        getProfile(parseInt(urlParams.get('id')), true);
        getVideos(parseInt(urlParams.get('id')));
        if (user != undefined)
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
        url: "/api/users/"+ id +"/profile" ,
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
                pTeam.innerHTML = "Team: <a href='team?id=" + data[0].teamID + "'>" + data[0].teamName + "</a>"
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

function getVideos(id) {
    var videosList = document.getElementById("videosList");

    $.ajax({
        url: "/api/users/" + id + "/videos",
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;

            var html = "";
            for (i in res) {
                html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100"><iframe id="' + res[i].videoID + '" class="card-img-top" src="https://drive.google.com/file/d/' + res[i].reference + '/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">' + res[i].videoTitle + '</a></h4><p class="card-text">' + res[i].videoDescription + '</p></a>';
                if (sessionStorage.userType == 'Scout')
                    html += '<p><i id="like' + res[i].videoID + '" onclick="rating(' + res[i].videoID + ')" class="fas fa-thumbs-up"></i> Rating: ' + res[i].rating + '</p></div></div></div></div>';
                else
                    html += '<p>Rating: ' + res[i].rating + '</p></div></div></div></div>';
                videos[res[i].videoID] = res[i].rating;
            }
            videosList.innerHTML = html;
        }

    })
}
function rating(videoID) {
    var thumbsUp = document.getElementById('like' + videoID);
    var parent = thumbsUp.parentElement;
    if (sessionStorage.userID != undefined) {
        if (thumbsUp.hasAttribute('style')) {
            thumbsUp.removeAttribute('style');
            parent.innerHTML = thumbsUp.outerHTML + " Rating: " + videos[videoID];
            updateRating({ vID: videoID, rating: false });
        }
        else {
            thumbsUp.style.color = "green";
            parent.innerHTML = thumbsUp.outerHTML + " Rating: " + parseInt(videos[videoID] + 1);
            updateRating({ vID: videoID, rating: true });
        }
    }
    else alert("You must be logged in to rate videos.")
}
function updateRating(rating) {
    $.ajax({
        url: "/api/videos/updateRating",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(rating),
        success: function (res, status) {
            console.log(res);
        }
        , error: function (res) { console.log(res); }
    });
}



var monitor = setInterval(function () {
    var elem = document.activeElement;
    if (elem && elem.tagName == 'IFRAME') {
        console.log('Clicked ' + elem.id);
        elem.blur();
        videos[elem.id].viewed = 1;
        //clearInterval(monitor);

    } else {

    }
}, 500);
