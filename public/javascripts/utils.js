var active;
// Manages active for index.hbs,chat.hbs and events.hbs
function manageActive(activeClass){
    if (active != undefined) active.classList.remove("active");
    var curr = document.getElementById(activeClass);
    curr.classList.add("active");
    active = curr;
}