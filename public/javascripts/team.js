var teamName = document.getElementById("tName"),
    teamBio = document.getElementById("tBio");
    
var videos = [];

window.onload = function () {
    getTeamInfo(urlParams.get('tid'));
    getVideos();
 };
//Loads and displays team info
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

