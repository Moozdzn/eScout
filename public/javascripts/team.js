var teamName = document.getElementById("tName"),
    teamBio = document.getElementById("tBio"),
    tvideosList = document.getElementById("tvideosList");
    
var urlParams = new URLSearchParams(window.location.search);
var videos = [];

window.onload = function () {
    getTeamInfo(urlParams.get('id'));
    getTeamVideos(urlParams.get('id'));
 };



function getTeamInfo(id) {
    $.ajax({
        url: '/api/team/' + id,
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            for (i in res) {
                teamName.innerHTML = res[i].teamName;
                teamBio.innerHTML = res[i].teamDescription;
            }

        }

    })
};

function getTeamVideos(id){
    $.ajax({
        url: '/api/team/' + id+'/videos',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            console.log(res)
            var html = "";
            for (i in res) {
                html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100" ><iframe id="'+res[i].videoID+'" class="card-img-top" src="https://drive.google.com/file/d/'+res[i].reference+'/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">'+ res[i].videoTitle +'</a></h4><p class="card-text">'+ res[i].videoDescription +'</p><a href="profile?id='+res[i].userID+'&type='+res[i].userType+'" >'+res[i].username+'</a>';
				if(sessionStorage.userType == 'Scout')
					html += '<p><i id="like'+res[i].videoID+'" onclick="rating('+res[i].videoID+')" class="fas fa-thumbs-up"></i> Rating: '+res[i].rating+'</p></div></div></div></div>';
				else
					html +=  '<p>Rating: '+res[i].rating+'</p></div></div></div></div>';
                  
                videos[res[i].videoID] = res[i].rating;;
            }
            tvideosList.innerHTML = html;  
        }

    })
};
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

function updateRating(rating){
	$.ajax({
        url: "/api/videos/updateRating",
        method : "post",
        contentType: "application/json",
        data : JSON.stringify(rating),
        success: function(res, status){ 
		 console.log(res);
        }
        , error : function(res) {console.log(res); }
        });
}

