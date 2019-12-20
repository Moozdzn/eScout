
var homevideos = document.getElementById("homeVideos");


var PUBG = document.getElementById("PUBG");
var LOL = document.getElementById("LOL");

var activeGame = PUBG;

var videos = [];

$(document).ready(function(){
	 showVids('PUBG');
});

function showVids(game) {
	activeGame.classList.remove('active');
	var currGame = document.getElementById(game)
	currGame.classList.add('active');
	activeGame = currGame;

	$.ajax({
		url: '/api/videos/'+game,
		method: 'get',
		dataType: 'json',
		success: function (res, status) {
			if (res.err) return;

			var html = "";
			
			for (i in res) {
				html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100" ><iframe id="'+res[i].videoID+'" class="card-img-top" src="https://drive.google.com/file/d/'+res[i].reference+'/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">'+ res[i].videoTitle +'</a></h4><p class="card-text">'+ res[i].videoDescription +'</p><a href="profile?id='+res[i].userID+'&type='+res[i].userType+'" >'+res[i].username+'</a><p><i id="like'+res[i].videoID+'" onclick="rating('+res[i].videoID+','+1+')" class="fas fa-thumbs-up"></i> <i id="dislike'+res[i].videoID+'" onclick="rating('+res[i].videoID+','+-1+')" class="fas fa-thumbs-down"></i> - '+res[i].rating+'</p></div></div></div></div>';
				videos[res[i].videoID] = {rate: res[i].rating,userRating: 0, viewed: 0};			
			}
			homevideos.innerHTML = html;
		}
	})
};

function goToProfile(user){
	sessionStorage.seeProfile = user;
	window.location.ref = "profile";
}

function rating(videoID,rate){
	var thumbsUp = document.getElementById('like'+videoID);
	var thumbsDown = document.getElementById('dislike'+videoID);
	var parent = thumbsUp.parentElement;
	if (rate == -1){
		if(thumbsDown.hasAttribute('style')) {
			thumbsDown.removeAttribute('style')
			videos[videoID].userRating = 0;
			parent.innerHTML = thumbsUp.outerHTML + " "+ thumbsDown.outerHTML + " - "+videos[videoID].rate;
		}
		else if (thumbsUp.hasAttribute('style')) alert('video already rated, remove prev rating')
		else {
			thumbsDown.style.color = "red";
			videos[videoID].userRating = -1;
			parent.innerHTML = thumbsUp.outerHTML + " "+ thumbsDown.outerHTML + " - "+parseInt(videos[videoID].rate + videos[videoID].userRating);
		}
	}
	else {
		if(thumbsUp.hasAttribute('style')) {
			thumbsUp.removeAttribute('style')
			videos[videoID].userRating = 0;
			parent.innerHTML = thumbsUp.outerHTML + " "+ thumbsDown.outerHTML + " - "+videos[videoID].rate;
		}
		else if (thumbsDown.hasAttribute('style')) alert('video already rated, remove prev rating')
		else {
			thumbsUp.style.color = "green";
			videos[videoID].userRating = 1;
			parent.innerHTML = thumbsUp.outerHTML + " "+ thumbsDown.outerHTML + " - "+parseInt(videos[videoID].rate + videos[videoID].userRating);
		}
	}
}



	var monitor = setInterval(function(){
    var elem = document.activeElement;
    if(elem && elem.tagName == 'IFRAME'){
				console.log('Clicked ' + elem.id);
				elem.blur();
				videos[elem.id].viewed = 1;
				//clearInterval(monitor);
				
    } else {
        		
    }
}, 500);


