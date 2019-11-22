import { get } from "http";

window.onload = function () {
    var eventslist = document.getElementById("eventslist");
    loadEvents(eventslist);

    function loadEvents(e) {
        $.ajax({
            url: '/api/events',
            method: 'get',
            dataType: "json",
            success: function (res, status) {
                if (res.err) return;
                var html = "";
                for (i in res)
                    html += '<div>' + res[i].eventID[i].name + '</div>';

                e.innerHTML = html;
            }
            
        })
    }

};