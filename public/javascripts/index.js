
var homevideos = document.getElementById("homeVideos");

var PUBG = document.getElementById("PUBGF");
var LOL = document.getElementById("LOLF");

window.onload = function(){
	showPUBGvids();
}

/* function changeGame(Game) {
	var PUBG = document.getElementById("PUBGF");
	var LOL = document.getElementById("LOLF");
	switch (Game) {
		case 'PUBG':
			var show = document.getElementById("PUBG");
			var hide = document.getElementById("LOL");
			showPUBGvids();
			if (show.style.display === "none") {
				show.style.display = "flex";
				hide.style.display = "none";
			}
			if (!PUBG.classList.contains('active')) {
				PUBG.classList.add('active');
				LOL.classList.remove('active');


			}
			break;
		case 'LOL':
			var show = document.getElementById("LOL");
			var hide = document.getElementById("PUBG");
			showLOLvids();
			if (show.style.display === "none") {
				show.style.display = "flex";
				hide.style.display = "none";
			}
			if (!LOL.classList.contains('active')) {
				LOL.classList.add('active');
				PUBG.classList.remove('active');
			}
			break;
	}

}; */

function showPUBGvids() {
	PUBG.classList.add('active');
	LOL.classList.remove('active');

	$.ajax({
		url: '/api/videos/pubg',
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