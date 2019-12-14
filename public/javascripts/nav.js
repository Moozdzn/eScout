window.onload = function(){
    var profile = document.getElementById("ddprofile");
	var login = document.getElementById("ddlogin");
	var logout = document.getElementById("ddlogout");
	var messages = document.getElementById("ddmessages");
	console.log(sessionStorage.userID)
	if(sessionStorage.userID != undefined){
		console.log('wtf')
		profile.style.display = 'block';
		messages.style.display = 'block';
		logout.style.display = 'block';
	}else login.style.display ='block';
};



function logOut(){
	delete sessionStorage.userID ;
};