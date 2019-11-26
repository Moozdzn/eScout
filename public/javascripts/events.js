/* var mymap = L.map('mapid').setView([38.7127, -9.1371], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
 */

window.onload = function () {
    var eventslist = document.getElementById("eventslist");
    $.ajax({
        url: '/api/events',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            var html = "";
            for (i in res)
                html += '<div class="col-lg-4 col-md-6 mb-4" onclick="showMarker('+res[i].eventID+')"><div class="card h-100"><div class="card-body"> <h4 class="card-title"><a href="#">'+res[i].eventName+'</a></h4><p class="card-text">'+res[i].eventDescription+'</p></div></div></div>';
                
            eventslist.innerHTML = html;
        }

    })
}

