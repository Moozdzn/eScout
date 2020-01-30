
// Loads map
var mymap = L.map('mapid').setView([38.7127, -9.1371], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

var userPos;
var markerList;
var markedEvent;
var initRoute = true;
var Route;
var eventCoord;

var activeEventGame = PUBG
var eventslist = document.getElementById("eventslist");
var createEvtBtn = document.getElementById("newevtbtn");

window.onload = function () {
    showEvents('PUBG');
    getLocation();

    if(sessionStorage.userType == 'EO')
        createEvtBtn.innerHTML = '<input type="button" value="Create Event">';
   

}

function showEvents(game) {
    markerList = [];
    manageActive(game)
    $.ajax({
        url: '/api/events/' + game,
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            var gameIcon = L.icon({
                iconUrl: 'images/'+game+'.png',
                iconSize:     [70, 70], 
                iconAnchor:   [35, 63], 
                popupAnchor:  [0, -63] 
            });
            var html = "";

            for (i in res) {
                date = res[i].eventStartTime.slice(0, 10);
                time = res[i].eventStartTime.slice(11, 16);
                markerList.push([L.marker([res[i].latitude, res[i].longitude],{icon: gameIcon}).bindPopup(res[i].eventName), false]);
                html += '<div class="col-lg-4 col-md-6 mb-4" onclick="showMarker(' + i + ')" style="min-width: 200px"><div class="card h-100"><div class="card-body"> <h4 class="card-title"><a href="#">' + res[i].eventName + '</a></h4><p class="card-text">' + res[i].eventDescription + '</p><p>' + date + '  ' + time + 'H </p></div></div></div>';
            }
            eventslist.innerHTML = html;

        }

    })
};

var circle;
var exists = false;
function eventsNear(otherC){
    
    var radius = parseFloat($("#radiusValue").val())*1000;

    if(exists){
        circle.removeFrom(mymap)
        exists = !exists
        if(otherC) eventsNear();
    }
    else {
        circle = L.circle([userPos._latlng.lat, userPos._latlng.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: radius
        }).addTo(mymap);
        exists = !exists;
        for(i in markerList){
               var d = mymap.distance(markerList[i][0]._latlng, circle.getLatLng());
               var isInside = d < circle.getRadius();
               if(isInside) {
                   if(markerList[i][1] === false) showMarker(i)
                }
        }
    }
}

function showMarker(id) {

    var marker = markerList[id];

    if (marker[1] === false) {
        marker[0].addTo(mymap).openPopup();
        marker[1] = true;
        markedEvent = marker[0];
    } else {
        mymap.removeLayer(marker[0]);
        marker[1] = false;
    }
}


function showPosition(position) {
    var userIcon = L.icon({
        iconUrl: 'images/position.png',
        iconSize:     [50, 50], 
        iconAnchor:   [25, 45], 
        popupAnchor:  [0, -45]
    });
    userPos = L.marker([position.coords.latitude, position.coords.longitude],{icon: userIcon}).addTo(mymap).bindPopup('You are here!<br>Or at least somewhere around').openPopup();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }  
}

function getRoute() {
       try {
            eventCoord = L.latLng(markedEvent._latlng.lat, markedEvent._latlng.lng)
        } catch (TypeError) {
            alert('You must select an event.');
            return;
        }
        
        if (initRoute) {
            initRoute = false;
            Route = L.Routing.control({
                waypoints: [
                    L.latLng(userPos._latlng.lat, userPos._latlng.lng),
                    eventCoord
                ],
                show: false,
                createMarker: function() {return null;}
            }).addTo(mymap).on('routingerror', function(e) {
                alert('The OSRM demo server appears down, or a network error occured. Please try again later.');
            });

        }
        else {
            Route.spliceWaypoints(Route.getWaypoints().length - 1, 1, eventCoord);
        }
} 
