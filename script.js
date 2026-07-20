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
    document.getElementById("date").innerHTML = year;
}