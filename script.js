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
}

function getTime() {
    const d = new Date();
    let year = d.getFullYear();
    let time24 = d.getHours() + ":" + d.getMinutes();
    if(d.getHours() > 12) {
        let time12 = d.getHours();
        time12 = time12 - 12;
        time12 = time12 + ":" + d.getMinutes();
    } else {
        let time12 = time24;
    }
    document.getElementById("date").innerHTML = year;
    alert("12 hour format:" + time12 + " 24 hour format:" + time24);
}