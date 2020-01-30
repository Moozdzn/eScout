var urlParams = new URLSearchParams(window.location.search);
var videos = [];

videosList = document.getElementById("videosList");
//Loads and displays videos
function getVideos() {
    var url;
    var id;
    var videosList = document.getElementById("videosList");
    if(urlParams.has('tid')) {
        id = urlParams.get('tid')
        url = '/api/team/' + id+'/videos';
    } 
    else if(urlParams.has('id')) {
        id = urlParams.get('id')
        url = "/api/users/" + id + "/videos";
    }
    else if(localStorage.userID != null){
        id = localStorage.userID;
        url = "/api/users/" + id + "/videos";
    }
    else console.log('unexpected error');
    $.ajax({
        url: url,
        method: "get",
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;

            var html = "";
            for (i in res) {
                html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100"><iframe id="' + res[i].videoID + '" class="card-img-top" src="https://drive.google.com/file/d/' + res[i].reference + '/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">' + res[i].videoTitle + '</a></h4><p class="card-text">' + res[i].videoDescription + '</p></a>';
                html += '<p><i id="like' + res[i].videoID + '" onclick="rating(' + res[i].videoID + ')" class="fas fa-thumbs-up"></i> Rating: ' + res[i].rating + '</p></div></div></div></div>';

                videos[res[i].videoID] = res[i].rating;
            }
            videosList.innerHTML = html;
        }
    })
}
//Manages visual rating and stores users rating per video
function rating(videoID) {
    var thumbsUp = document.getElementById('like' + videoID);
    var parent = thumbsUp.parentElement;
    if (localStorage.userID != undefined) {
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
//
function updateRating(rating) {
    $.ajax({
        url: "/api/videos/updateRating",
        method: "put",
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
    } else {
    }
}, 500);