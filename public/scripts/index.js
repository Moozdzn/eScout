function myFunction(Game) {
	var PUBG = document.getElementById("PUBGF");
	var LOL = document.getElementById("LOLF");
	switch(Game){
		case 'PUBG':
			var show = document.getElementById("PUBG");
			var hide = document.getElementById("LOL");
			
			if (show.style.display === "none") {
				show.style.display = "flex";
				hide.style.display = "none";
				if(!PUBG.classList.contains('active')){
					PUBG.classList.add('active');
					LOL.classList.remove('active');
				}
			} 
			break;
		case 'LOL':
			var show = document.getElementById("LOL");
			var hide = document.getElementById("PUBG");
			if (show.style.display === "none") {
				show.style.display = "flex";
				hide.style.display = "none";}
				if(!LOL.classList.contains('active')){
					LOL.classList.add('active');
					PUBG.classList.remove('active');
				}
			break;
	}
  
}