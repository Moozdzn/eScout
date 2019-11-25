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
            url: "/api/profile?user",
            method: "get",
            dataType: "json",
            success: function (res, status) {
                if (res.err) return;
                pusername.innerHTML = res.username;
                pName.innerHTML = res.name;
                pAge.innerHTML = currentDate.getFullYear() - res.birthDate.getFullYear();
                pRegion.innerHTML = res.region;
                pGame.innerHTML = res.game;
                pMainPos.innerHTML = res.mainPosition;
                pTeam.innerHTML = res.teamName;
                pBio.innerHTML = res.bio;
                
            }

        })
}

