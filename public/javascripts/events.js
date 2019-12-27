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
var lastEventClicked;
var lastID;
var routesList = [];
var route;

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
                date = res[i].eventStartTime.slice(0, 10);
                time = res[i].eventStartTime.slice(11, 16);
                markerList.push([L.marker([res[i].latitude, res[i].longitude]).bindPopup(res[i].eventName), false]);
                html += '<div class="col-lg-4 col-md-6 mb-4" onclick="showMarker(' + i + ')"><div class="card h-100"><div class="card-body"> <h4 class="card-title"><a href="#">' + res[i].eventName + '</a></h4><p class="card-text">' + res[i].eventDescription + '</p><p>' + date + '  ' + time + 'H </p></div></div></div>';
            }
            eventslist.innerHTML = html;

        }

    })
};

function showMarker(id) {
    var marker = markerList[id];



    if (marker[1] === false) {
        marker[0].addTo(mymap).openPopup();
        marker[1] = true;
        lastEventClicked = marker[0];
    } else {
        mymap.removeLayer(marker[0]);
        marker[1] = false;
        lastID = id;

    }
}


function showPosition(position) {
    userPos = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup('You are here!<br>Or at least somewhere around').openPopup();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function getRoute() {

    if (lastEventClicked === undefined) {
        alert("There is no event selected.");
        return;
    }

    console.log(routesList[0])
    try {
        if (routesList.length === 0) {

            routesList.push([lastEventClicked._latlng.lat, lastEventClicked._latlng.lng]);
            
            route =  L.Routing.control({
            waypoints: [
                L.latLng(userPos._latlng.lat, userPos._latlng.lng),
                L.latLng(lastEventClicked._latlng.lat, lastEventClicked._latlng.lng)
            ]
          }).addTo(mymap);

        } else {
            route.spliceWaypoints(route.getWaypoints().length - 1, 1, e._latlng);
           
            routesList.pop();
        } 

    } catch (err) {
        if (err instanceof TypeError) {
            alert('We don\'t have access to your location.');
        }
    }
}   
