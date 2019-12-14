
var homevideos = document.getElementById("homeVideos");

var PUBG = document.getElementById("PUBG");
var LOL = document.getElementById("LOL");

var active = PUBG;

window.onload = function(){
	showVids('PUBG');

}

function showVids(game) {
	active.classList.remove('active');
	var currGame = document.getElementById(game)
	currGame.classList.add('active');
	active = currGame;

	$.ajax({
		url: '/api/videos/'+game,
		method: 'get',
		dataType: 'json',
		success: function (res, status) {
			if (res.err) return;

			var html = "";

			for (i in res) {
				html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100"><iframe class="card-img-top" src="https://drive.google.com/file/d/'+res[i].reference+'/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">'+ res[i].videoTitle +'</a></h4><p class="card-text">'+ res[i].videoDescription +'</p><a href="">'+res[i].username+'</a></div></div></div></div>';
			}
			homevideos.innerHTML = html;
		}
	})
};

function showLOLvids() {
	LOL.classList.add('active');
	PUBG.classList.remove('active');
	$.ajax({
		url: '/api/videos/lol',
		method: 'get',
		dataType: 'json',
		success: function (res, status) {
			if (res.err) return;

			var html = "";

			for (i in res) {
				html += '<div class="card h-100"><a href="#"><iframe src="https://drive.google.com/file/d/' + res[i].reference + '/preview"></iframe></a><div class="card-body"><h4 class="card-title"><a href="#">' + res[i].videoTitle + '</a></h4><p class="card-text">' + res[i].videoDescription + '</p><p><a href="">' + res[i].username + '</a> </p></div></div>';
			}
			homevideos.innerHTML = html;
		}
	})
};

function messagePlayer(){
	$("#messageModal").modal();
}
