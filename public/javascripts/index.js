
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
				html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100" ><iframe id="'+res[i].videoID+'" class="card-img-top" src="https://drive.google.com/file/d/'+res[i].reference+'/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">'+ res[i].videoTitle +'</a></h4><p class="card-text">'+ res[i].videoDescription +'</p><a href="profile?id='+res[i].userID+'&type='+res[i].userType+'" >'+res[i].username+'</a><p><i id="like'+res[i].videoID+'" onclick="rating('+res[i].videoID+')" class="fas fa-thumbs-up"></i> Rating: '+res[i].rating+'</p></div></div></div></div>';
				videos[res[i].videoID] = res[i].rating;			
			}
			homevideos.innerHTML = html;
		}
	})
};

function goToProfile(user){
	sessionStorage.seeProfile = user;
	window.location.ref = "profile";
}

function rating(videoID){
	var thumbsUp = document.getElementById('like'+videoID);
	var parent = thumbsUp.parentElement;
		if(thumbsUp.hasAttribute('style')) {
			thumbsUp.removeAttribute('style')
			parent.innerHTML = thumbsUp.outerHTML + " Rating: "+videos[videoID];
			updateRating({vID: videoID,rating:1});
		}
		else {
			thumbsUp.style.color = "green";
			parent.innerHTML = thumbsUp.outerHTML + " Rating: "+parseInt(videos[videoID] + 1);
			updateRating({vID: videoID,rating:0});
		}
}
function updateRating(rating){
	$.ajax({
        url: "/api/videos/updateRating",
        method : "post",
        data : rating,
        processData: false,
        contentType: false,
        success: function(res, status){ 
         console.log(res)
        }
        
        , error : function(res) { console.log(res); }
        
        });
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


