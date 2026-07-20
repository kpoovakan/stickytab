"use strict";
/* random stuff saved for later:
https://www.w3schools.com/html/html5_webstorage.asp
https://duckduckgo.com?q=pumpkin pie
https://google.com/search?q=pumpkin+pie
https://bing.com/search?q=pumpkin+pie

window.addEventListener("keydown", function(event) {
  if (event.key == "a"){
        document.querySelector("#result").innerHTML = "You pressed the A key";
    }
});
*/

window.onload = function() {
    document.getElementById("checkJavaScript").remove();
    globalThis.searchEngine = "DuckDuckGo";
    getDate();
    getTime();
}

window.setInterval(getTime(), 1000);

/* document.getElementById("websearch").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.ctrlKey){
        websearch(event);
    }
}); */

function getTime() {
    const d = new Date();
    let time24 = d.getHours();
    /*if(time24 > 12) {
        let time12 = d.getHours();
        time12 = time12 - 12;
    } else {
        let time12 = time24;
    } console.log (time12);*/
    let timeMinutes = d.getMinutes();
    if(timeMinutes < 10) {
        timeMinutes = timeMinutes.toString();
        timeMinutes = "0" + timeMinutes;
    }
    if(time24 < 10) {
        time24 = time24.toString();
        time24 = "0" + time24;
    }
    let time = time24 + ":" + timeMinutes;
    document.getElementById("time").innerHTML = time;
}

async function getDate() {
    let months = await fetch("jsondata/months.json");
    months = await months.text();
    months = await JSON.parse(months);
    let weekdays = await fetch("jsondata/days.json");
    weekdays = await weekdays.text();
    weekdays = await JSON.parse(weekdays);
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    month = months[month];
    let weekday = d.getDay();
    weekday = weekdays[weekday];
    let day = d.getDate();
    //let date = weekday + ", " + day + " " + month + " " + year;
    let date = weekday + ", " + month + " " + day
    document.getElementById("date").innerHTML = date;
}

function searchOption() {
    globalThis.searchEngine = document.getElementById("searchoption").value;
}

/* async function websearch(thisElement) {
    let query = thisElement.value;
    if(query.includes(" ")) {
        query = query.replaceAll(" ", "+");
    }
    
    let queryHttp = query.slice(0,7);
    let queryHttps = query.slice(0,8);
    if(queryHttp == "http://") {
        window.location.href = query;
    } else if(queryHttps == "https://") {
        window.location.href = query;
    }
    queryHttp = "http://" + query;
    queryHttps = "https://" + query;

    let pageStatus = await fetch(queryHttps, { method: "HEAD" }); {
        if(pageStatus.status !== 404) {
            window.location.href = query;
        } else {
            pageStatus = await fetch(queryHttp, { method: "HEAD"}); {
                if(pageStatus.status !== 404) {
                    window.location.href = query;
                } else {
                     if (searchEngine === "DuckDuckGo") {
                        globalThis.searchURL = "https://duckduckgo.com?q=" + query;
                    } else if(searchEngine === "Google") {
                        globalThis.searchURL = "https://google.com/search?q=" + query;
                    } else if(searchEngine === "Bing") {
                        globalThis.searchURL = "https://bing.com/search?q=" + query;
                    } else { alert("error with search engines determination"); }
                    window.location.href = searchURL;
                }
            }
        }
    }
} */

function websearch(thisElement) {
    const query = thisElement.value;
    if (searchEngine === "DuckDuckGo") {
        globalThis.searchURL = "https://duckduckgo.com?q=" + query;
    } else if(searchEngine === "Google") {
        globalThis.searchURL = "https://google.com/search?q=" + query;
    } else if(searchEngine === "Bing") {
        globalThis.searchURL = "https://bing.com/search?q=" + query;
    } else { alert("error with search engines determination"); }
    window.location.href = searchURL;
}

function webpage(thisElement) {
    let query = thisElement.value;
    if(!query.includes("http") || !query.includes("://")) {
        query = "https://" + query;
    }
    window.location.href = query;
}