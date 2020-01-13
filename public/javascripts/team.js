var teamName = document.getElementById("tName"),
    teamBio = document.getElementById("tBio"),
    thighlight = document.getElementById("thighlight"),
    tvideosList = document.getElementById("tvideosList");
    
var urlParams = new URLSearchParams(window.location.search);


window.onload = function () {
    getTeamInfo(urlParams.get('id'));
 };



function getTeamInfo(id) {
    $.ajax({
        url: '/api/team/' + id,
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;

            var html = "";

            for (i in res) {
                teamName.innerHTML = res[i].teamName;
                teamBio.innerHTML = res[i].teamDescription;
            }

        }

    })
};

