

var eventCoords;
var eventAdressProperties;
var eventAdressName;
var regionRadius;
var regionCircles = [];
var regionDensity = [];
var geojson;
var toggled = true;

window.onload = function () {
    getRegions()
}
var mymap = L.map('mapid').setView([39.359785, -8.074951], 6);
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
    $.ajax({
        url: '/api/events/newEvent',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            /*
            for (i in res) {
                var r = res[i].regionRadius * 2000
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


            }*/
            for(i in res){
                regionDensity[i] = {name: res[i].regionName,density: res[i].regionRadius}
            }
            $.getJSON("geodata/portugal.json",function(data){
                geojson = L.geoJson(data,{style: style, onEachFeature: onEachFeature}).addTo(mymap);
            });


        }, error: function () {
            alert(JSON.stringify('error'));
        }

    })
}

var info = L.control();

	info.onAdd = function (mymap) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Users by district</h4>' +  (props ?
			'<b>' + props.name + '</b><br />' + props.density + ' users'
            : 'Hover over a district <br>or no users registered');
        
	};

	info.addTo(mymap);

function getColor(name) {
    var d;
    if(typeof name === 'number') d = name;
    else{
        for(i in regionDensity){
            if (name == regionDensity[i].name) d = regionDensity[i].density; 
        }
    }
    return d > 10  ? '#E31A1C' :
           d > 8  ? '#FC4E2A' :
           d > 6   ? '#FD8D3C' :
           d > 4   ? '#FEB24C' :
           d > 2   ? '#FED976' :
                      '#FFEDA0';
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.name),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(regionDensity[layer.feature.properties.id]);
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (mymap) {

		var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 2, 4, 6, 8, 10],
            //colors =['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C'],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

    legend.addTo(mymap);
    
function toggle(){
    if (toggled){
        mymap.removeLayer(geojson);
        mymap.removeControl(legend)
        mymap.removeControl(info)
        toggled = false;
        $("#btnHeatmap").removeClass("btn-succcess");
        $("#btnHeatmap").addClass("btn-danger").text('Toggle Heatmap: OFF');

    }
    else{
        geojson.addTo(mymap)
        legend.addTo(mymap)
        info.addTo(mymap)
        toggled = true;
        $("#btnHeatmap").removeClass("btn-danger");
        $("#btnHeatmap").addClass("btn-success").text('Toggle Heatmap: ON');
    }

}

