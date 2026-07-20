"use strict";
/* random stuff saved for later:
https://www.w3schools.com/html/html5_webstorage.asp
https://duckduckgo.com?q=pumpkin pie

window.addEventListener("keydown", function(event) {
  if (event.key == "a"){
        document.querySelector("#result").innerHTML = "You pressed the A key";
    }
});
*/

window.onload = function() {
    document.getElementById("checkJavaScript").remove();
    getTime();
}

window.setInterval(getTime(), 1000);

function getTime() {
    const d = new Date();
    let year = d.getFullYear();
    let time24 = d.getHours();
    console.log(time24);
    if(time24 > 12) {
        let time12 = d.getHours();
        time12 = time12 - 12;
    } else {
        let time12 = time24;
    } console.log (time12);
    let timeMinutes = d.getMinutes();
    document.getElementById("date").innerHTML = year;
}