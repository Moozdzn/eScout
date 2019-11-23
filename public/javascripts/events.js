

window.onload = function () {
    var eventslist = document.getElementById("eventslist");
    $.ajax({
        url: '/api/events',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            var html = "";
            for (i in res){
                html += '<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><div class="card-body"> <h4 class="card-title"><a onclick="showMarker(1)">'+res[i].eventName+'</a></h4><p class="card-text">'+res[i].eventDescription+'</p></div></div></div>';
              
                 
            }
            eventslist.innerHTML = html;
        }

    })
}

