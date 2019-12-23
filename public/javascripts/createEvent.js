$('#createEvt').click(function (evt) {
    evt.preventDefault();

    $.ajax({
        url: "/api/events/newEvent",
        method: "post",
        contentType: "application/json",
        data:  JSON.stringify({
            Ename: $("#Ename").val(),
            Edesc: $("#Edesc").val(),
            Estart: $("#Estart").val(),
            Eloc: $("#Eloc").val(),
            Edate: $("#Edate").val(),
            Eprice: $("#Eprice").val(),
            Oname: $("#Oname").val(),}),
        processData: false,
        success: function (res, status) {
            //document.getElementById("res").innerHTML = JSON.stringify(res); 
            console.log(res)
        }
        ,error: function () {
            alert(JSON.stringify('error'));
        }

    });
})




$(document).ready(function () {

})

/* */