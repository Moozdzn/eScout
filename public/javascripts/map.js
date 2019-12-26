

/* mapboxgl.accessToken = 'pk.eyJ1IjoiZXNjb3V0YXBwIiwiYSI6ImNrNGx1aDRlbDA5Y3gzbG81MmdwNjkybm8ifQ.UkXi3bv_-HTlgp612_qBYg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11'
}); */

/* var eventCoords;
var eventAdress;

var mymap = L.map('mapid').setView([38.7127, -9.1371], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	var geocoder = L.Control.geocoder().on('markgeocode', function(event) {
		//event.geocode.name
		//event.properties.adress
		var center = event.geocode.center;
		eventCoords = center;
		eventAdress = event.geocode.properties.address;
    	L.marker(center).addTo(mymap);
    	mymap.setView(center, mymap.getZoom());
		}).addTo(mymap); */

	/* geocoder.on('markgeocode', function(e) {
			console.log(e)
		})
		.addTo(mymap); */
/*
////
var circle = L.circle([51.508, -0.11], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(mymap);

var polygon = L.polygon([
	[38.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047]
]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
	.setLatLng([38.8, -9.15])
	.setContent("I am a standalone popup.")
	.openOn(mymap);
	
var popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}

mymap.on('click', onMapClick);
////
// get user location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
var userPos;
function showPosition(position) {
   userPos = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup('You are here!<br>Or at least somewhere around')
		.openPopup();
}
function getRoute(){
	try{
		L.Routing.control({
			waypoints: [
			L.latLng(userPos._latlng.lat, userPos._latlng.lng),
			L.latLng(38.7150, -9.1310)
			]
		}).addTo(mymap);
	}
	catch(err){
		if(err instanceof TypeError){
			alert('We don\'t have access to your location.');
		}
		
	}
}




var clicked1 = false;
var clicked2 = false;
var clicked3 = false;
var marker1;
var marker2;
var marker3;
function showMarker(event){
	
	switch(event) {
		case 1:
			if(clicked1){
				clicked1 = false;
				mymap.removeLayer(marker1);
			}
			else{
				marker1 = L.marker([38.7130, -9.1371]).addTo(mymap).bindPopup('Event 1')
		.openPopup();
			clicked1 = true;
			}
			break;
		case 2:
			if(clicked2){
					clicked2 = false;
					mymap.removeLayer(marker2);
				}
			else {
				marker2 = L.marker([38.7140, -9.1380]).addTo(mymap).bindPopup('Event 2').openPopup();
				clicked2 = true;
			}
			break;
		case 3:
			if(clicked3){
				clicked3 = false;
				mymap.removeLayer(marker3);
			}
			else {
				marker3 = L.marker([38.7150, -9.1310]).addTo(mymap).bindPopup('Event 3')
		.openPopup();
				clicked3 = true;
			}
			
			break;
		default:
			console.log("Something's wrong if this is displaying");
	}
}*/