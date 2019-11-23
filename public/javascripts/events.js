

window.onload = function () {
    console.log("batata");
    var eventslist = document.getElementById("eventslist");
    $.ajax({
        url: '/api/events',
        method: 'get',
        dataType: "json",
        success: function (res, status) {
            if (res.err) return;
            var html = "";
            for (i in res)
                html += '<div>' + res[i].name + '</div>';

            eventslist.innerHTML = html;
        }

    })
}

