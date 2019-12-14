var currentDate = new Date();

window.onload = function () {
    var pusername = document.getElementById("pusername"),
        pName = document.getElementById("pName"),
        pAge = document.getElementById("pAge"),
        pRegion = document.getElementById("pRegion"),
        pGame = document.getElementById("pGame"),
        pMainPos = document.getElementById("pMainPos"),
        pTeam = document.getElementById("pTeam"),
        pBio = document.getElementById("pBio");

    $.ajax({
        url: "/api/users/profile/" + sessionStorage.userID,
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
        },
        error: function () {
            window.location.href = "auth";

        }
    })

    getVideos();
}


function getVideos(){
    var videosList = document.getElementById("videosList");

    $.ajax({
        url: "/api/users/profile/"+sessionStorage.userID+"/videos",
        method: "get",
        dataType: "json",
        success: function(res, status){
            if(res.err) return;

            var html ="";
            for(i in res){
                html += '<div class="col-lg-4 col-md-6 mb-4" ><div class="card h-100"><iframe class="card-img-top" src="https://drive.google.com/file/d/'+res[i].reference+'/preview" ></iframe> <div class="card-body"><h4 class="card-title"><a href="#">'+ res[i].videoTitle +'</a></h4><p class="card-text">'+ res[i].videoDescription +'</p></div></div></div></div>'
            }
            videosList.innerHTML = html;
        }

    })
}
