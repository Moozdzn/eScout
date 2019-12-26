var eventCoords;
var eventAdressProperties;
var eventAdressName;
var regionRadius;
var regionCircles = []

window.onload = function () {
    getRegions()
}
var mymap = L.map('mapid').setView([38.7127, -9.1371], 7);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

var geocoder = L.Control.geocoder().on('markgeocode', function (event) {
    eventAdressName = event.geocode.name
    //event.properties.adress
    var center = event.geocode.center;
    $("#Eloc").val(event.geocode.name);
    eventCoords = center;
    eventAdressProperties = event.geocode.properties.address;
    L.marker(center).addTo(mymap);
    mymap.setView(center, mymap.getZoom());
}).addTo(mymap);

$('#createEvt').click(function (evt) {
    evt.preventDefault();
    var event = JSON.stringify({
        Ename: $("#Ename").val(),
        Edesc: $("#Edesc").val(),
        Estart: $("#Estart").val(),
        Edate: $("#Edate").val(),
        Eprice: $("#Eprice").val(),
        Oname: $("#Oname").val(),
        Elat: eventCoords.lat,
        Elng: eventCoords.lng,
        Eadress: $("#Eloc").val()
    })

    $.ajax({
        url: "/api/events/newEvent",
        method: "post",
        contentType: "application/json",
        data: event,
        processData: false,
        success: function (res, status) {
            //document.getElementById("res").innerHTML = JSON.stringify(res); 

            window.location.href = "events";
        }
        , error: function () {
            alert(JSON.stringify('error'));
        }
    });
})




$(document).ready(function () {
    $("#Eloc").prop("disabled", true);
})




//////////////////////////////////////////////////////////

////////////////////////  HEATMAP ////////////////////////

//////////////////////////////////////////////////////////


function getRegions() {
    console.log('entrei na funçao')
    $.ajax({
        url: '/api/events/newEvent',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;

            for (i in res) {
                var r = res[i].regionRadius * 2500
                if (res[i].regionRadius > 5000) {
                    regionCircles.push(L.circle([res[i].regionLat, res[i].regionLong], { radius: 5000 }).addTo(mymap));

                }
                else {
                    regionCircles.push(L.circle([res[i].regionLat, res[i].regionLong], { radius: r }).addTo(mymap));
                }

                var popUp ="<dl><dt>"+ res[i].regionName+"</dt>"
                            + "<dd>" + res[i].regionRadius + " players</dd>"

                regionCircles[i].bindPopup(popUp);
                regionCircles[i].on('mouseover', function (e) {
                       this.openPopup();
                   });
                   regionCircles[i].on('mouseout', function (e) {
                       this.closePopup();
                   }) 


            }



        }, error: function () {
            alert(JSON.stringify('error'));
        }

    })
}