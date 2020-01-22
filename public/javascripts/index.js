
var homevideos = document.getElementById("homeVideos"),
	bestvid = document.getElementById('bestvid');


var PUBG = document.getElementById("PUBG");

var activeGame = PUBG;

var videos = [];
$(window).on('load', function () {

	showVids('PUBG');
});

function showVids(game) {
	activeGame.classList.remove('active');
	var currGame = document.getElementById(game)
	currGame.classList.add('active');
	activeGame = currGame;

	$.ajax({
		url: '/api/videos/' + game,
		method: 'get',
		dataType: 'json',
		success: function (res, status) {
			if (res.err) return;

			var html = "";
			var best = "";
			var bv = res.splice(0, 1);
			best = '<div class="col-md-8 mt-auto"><iframe width="900" height="350" id="' + bv[0].videoID + '" class="card-img-top" src="https://drive.google.com/file/d/' + bv[0].reference + '/preview" ></iframe></div><div class="col-md-4" ><div class="card-body"><h4 class="card-title"><a href="#">' + bv[0].videoTitle + '</a></h4><p class="card-text">' + bv[0].videoDescription + '</p><a href="profile?id=' + bv[0].userID + '&type=' + bv[0].userType + '" >' + bv[0].username + '</a>'
			best += '<p><i id="like' + bv[0].videoID + '" onclick="rating(' + bv[0].videoID + ')" class="fas fa-thumbs-up"></i> Rating: ' + bv[0].rating + '</p></div></div></div></div>';

			for (i in res) {
				html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100" ><iframe id="' + res[i].videoID + '" class="card-img-top" src="https://drive.google.com/file/d/' + res[i].reference + '/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">' + res[i].videoTitle + '</a></h4><p class="card-text">' + res[i].videoDescription + '</p><a href="profile?id=' + res[i].userID + '&type=' + res[i].userType + '" >' + res[i].username + '</a>';
				html += '<p><i id="like' + res[i].videoID + '" onclick="rating(' + res[i].videoID + ')" class="fas fa-thumbs-up"></i> Rating: ' + res[i].rating + '</p></div></div></div>';

				videos[res[i].videoID] = res[i].rating;
			}
			homevideos.innerHTML = html;
			bestvid.innerHTML = best;
		}
	})
};

function goToProfile(user) {
	sessionStorage.seeProfile = user;
	window.location.ref = "profile";
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
	} else {

	}
}, 500);


