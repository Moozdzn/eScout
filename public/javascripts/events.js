var mymap = L.map('mapid').setView([38.7127, -9.1371], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

var userPos;
var markerList = [];
var pepehands = 0;

var eventslist = document.getElementById("eventslist");

window.onload = function () {
    $.ajax({
        url: '/api/events',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;

            var html = "";
            for (i in res) {
                markerList.push([[res[i].latitude, res[i].longitude], res[i].eventName, false]);
                console.log(markerList[i]);
                html += '<div class="col-lg-4 col-md-6 mb-4" onclick="showMarker(' + i + ')"><div class="card h-100"><div class="card-body"> <h4 class="card-title"><a href="#">' + res[i].eventName + '</a></h4><p class="card-text">' + res[i].eventDescription + '</p></div></div></div>';
                pepehands++;

            }
            eventslist.innerHTML = html;

        }

    })
};

function showMarker(id) {
    console.log(pepehands);
    /*  $("#eventslist").on("click",'#'+pepehands , function(){  id="'+pepehands+'
         alert(i);
     }); */
    var marker = markerList[id];
    
    console.log(marker)
    if (marker[2] === false) {
        L.marker(marker[0]).addTo(mymap).bindPopup(marker[1]).openPopup();
        marker[2] = true;
    } else {
        mymap.removeLayer(L.marker(marker[0]).addTo(mymap).bindPopup(marker[1]).openPopup());
        marker[2] = false;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    userPos = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup('You are here!<br>Or at least somewhere around')
        .openPopup();
}
function getRoute() {
    try {
        L.Routing.control({
            waypoints: [
                L.latLng(userPos._latlng.lat, userPos._latlng.lng),
                L.latLng(38.7150, -9.1310)
            ]
        }).addTo(mymap);
    }
    catch (err) {
        if (err instanceof TypeError) {
            alert('We don\'t have access to your location.');
        }

    }
} 