
var homevideos = document.getElementById("homeVideos"),
	bestvid = document.getElementById('bestvid');


var PUBG = document.getElementById("PUBG");

var activeGame = PUBG;

var videos = [];
$(window).on('load', function () {

	showVids('PUBG');
});
//Loads and displays videos based on game chosen
function showVids(game) {
	manageActive(game)

	$.ajax({
        url: '/api/videos/' + game,
        method: 'get',
        dataType: 'json',
        success: function (res, status) {
            if (res.err) return;

            var html = "";
            var best = "";

            for (i in res) {
                if (i == 0) {
                    best = '<div class="col-md-8 mt-auto"><iframe width="900" height="350" id="' + res[i].videoID + '" class="card-img-top" src="https://drive.google.com/file/d/' + res[i].reference + '/preview" ></iframe></div><div class="col-md-4" ><div class="card-body"><h4 class="card-title"><a href="#">' + res[i].videoTitle + '</a></h4><p class="card-text">' + res[i].videoDescription + '</p><a href="profile?id=' + res[i].userID + '&type=' + res[i].userType + '" >' + res[i].username + '</a>'
                    best += '<p><i id="like' + res[i].videoID + '" onclick="rating(' + res[i].videoID + ')" class="fas fa-thumbs-up"></i> Rating: ' + res[i].rating + '</p></div></div></div></div>';

                } else {
                    html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100" ><iframe id="' + res[i].videoID + '" class="card-img-top" src="https://drive.google.com/file/d/' + res[i].reference + '/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">' + res[i].videoTitle + '</a></h4><p class="card-text">' + res[i].videoDescription + '</p><a href="profile?id=' + res[i].userID + '&type=' + res[i].userType + '" >' + res[i].username + '</a>';
                    html += '<p><i id="like' + res[i].videoID + '" onclick="rating(' + res[i].videoID + ')" class="fas fa-thumbs-up"></i> Rating: ' + res[i].rating + '</p></div></div></div>';
                }
                videos[res[i].videoID] = res[i].rating;
            }
            homevideos.innerHTML = html;
            bestvid.innerHTML = best;
        }
    })
};
// Redirects user to the profile clicked
function goToProfile(user) {
	localStorage.seeProfile = user;
	window.location.ref = "profile";
}



