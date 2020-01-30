
//Send login to server for validation

$('#confirm').submit(function (evt) {
  evt.preventDefault();
  $.ajax({
    url: "/api/auth",
    method: "post",
    contentType: "application/json",
    data: JSON.stringify({
      username: $("#inputUsername").val(),
      password: $("#inputPassword").val(),
    }),
    success: function (res, status) {
      console.log(res)
      localStorage.userID = res.user.id;
      localStorage.userType = res.user.type;
      window.location.href = '/';
    }
    , error: function (err) {
      if(err.status === 401) alert('Combination is invalid');
    }
  });
})
