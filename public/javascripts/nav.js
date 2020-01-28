$(document).ready(function(){
    var profile = document.getElementById("ddprofile");
    var login = document.getElementById("ddlogin");
    var logout = document.getElementById("ddlogout");
    var messages = document.getElementById("ddmessages");
    if (sessionStorage.userID != undefined) {

        profile.style.display = 'block';
        messages.style.display = 'block';
        logout.style.display = 'block';
    } else login.style.display = 'block';
    
   
    showClickedHighlight()
});

function logOut() {
    delete sessionStorage.userID;
};


// Nav Bar is common to all pages, higlights which page the user is at
function showClickedHighlight() {
    var homePage = document.getElementById("homePage");
    var profilePage = document.getElementById("profilePage");
    var eventsPage = document.getElementById("eventsPage");
    var activePage = homePage;
    switch (window.location.pathname) {
        case '/':
            activePage.classList.remove("active");
            homePage.classList.add("active");
            activePage = homePage;
            break;
        case '/events':
            activePage.classList.remove("active");
            eventsPage.classList.add("active");
            activePage = eventsPage;
            break;
        case '/profile':
            activePage.classList.remove("active");
            profilePage.classList.add("active");
            activePage = profilePage;
            break;
        case '/createEvent':
            activePage.classList.remove("active");
            eventsPage.classList.add("active");
            activePage = eventsPage;
            break;
        case '/uploadVideo':
            activePage.classList.remove("active");
            profilePage.classList.add("active");
            activePage = profilePage;
            break;
        case '/chat':
            activePage.classList.remove("active");
            profilePage.classList.add("active");
            activePage = profilePage;
            break;
        case '/team':
            activePage.classList.remove("active");
            profilePage.classList.add("active");
            activePage = profilePage;
            break;


    }
}