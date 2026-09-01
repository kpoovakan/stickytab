"use strict";
let arrayDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let arrayMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

window.onload = function() {
    globalThis.searchEngine = localStorage.getItem("stickytabEngine");
    if(searchEngine == null) {
        globalThis.searchEngine = "Google";
    }
    document.getElementById("searchoption").value = searchEngine;
    globalThis.timeFormat = localStorage.getItem("stickytabTime");
    if(timeFormat == null) {
        globalThis.timeFormat = 12;
    }
    globalThis.desmosLink = localStorage.getItem("stickytabDesmos");
    if(desmosLink == null) {
        window.localStorage.setItem("stickytabDesmos", "scientific");
    }
    getDate();
    getTime();
    //window.setInterval(getTime(), 1000);
    if(window.localStorage.getItem("stickytabMobile") == null) {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        var ratio = windowWidth / 960;
        var ratio = ratio * 473;
        let ratioBig = windowHeight + 31;
        let ratioSmall = windowHeight - 31;
        if(!(ratioSmall < ratio && ratio < ratioBig)) {
            document.getElementById("preventMobile").showModal();
        }
    }
}

function getTime() {
    const d = new Date();
    let time24 = d.getHours();
    time24 = Number(time24);
    if(time24 > 12) {
        var time12 = d.getHours();
        time12 = Number(time12);
        time12 = time12 - 12;
    } else {
        var time12 = time24;
    }
    let timeMinutes = d.getMinutes();
    if(timeMinutes < 10) {
        timeMinutes = timeMinutes.toString();
        timeMinutes = "0" + timeMinutes;
    }
    if(time24 < 10) {
        time24 = time24.toString();
        time24 = "0" + time24;
    }
    if(timeFormat == 24) {
        var time = time24 + ":" + timeMinutes;
    } else {
        var time = time12 + ":" + timeMinutes;
    }
    document.getElementById("time").innerHTML = time;
}

/*async*/ function getDate() {
    //let months = await fetch("jsondata/months.json");
    //months = await months.text();
    let months = arrayMonths;
    //months = await JSON.parse(months);
    //let weekdays = await fetch("jsondata/days.json");
    //weekdays = await weekdays.text();
    let weekdays = arrayDays;
    //weekdays = await JSON.parse(weekdays);
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    month = months[month];
    let weekday = d.getDay();
    weekday = weekdays[weekday];
    let day = d.getDate();
    //let date = weekday + ", " + day + " " + month + " " + year;
    let date = weekday + ", " + month + "&nbsp;" + day
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
    if(query == "") {
        return;
    }
    if (searchEngine === "DuckDuckGo") {
        globalThis.searchURL = "https://duckduckgo.com?q=" + query;
    } else if(searchEngine === "Google") {
        globalThis.searchURL = "https://google.com/search?q=" + query;
    } else if(searchEngine === "Bing") {
        globalThis.searchURL = "https://bing.com/search?q=" + query;
    } else { alert("please use the dropdown menu to select a search engine. the dropdown menu is to the right of the websearch bar. set a default search engine in the settings."); }
    window.location.href = searchURL;
}

function webpage(thisElement) {
    if(autocomplete) {
        return;
    }
    let query = thisElement.value;
    if(!query.includes("http") || !query.includes("://")) {
        if(query.includes("localhost:")) {
            query = "http://" + query;
        } else {
            query = "https://" + query;
        }
    }
    window.location.href = query;
}

function editSites() {
    document.getElementById("editSites").showModal();
}

function editSettings() {
    document.getElementById("settings").showModal();
}

function editCalendar() {
    document.getElementById("calendarSettings").showModal();
}

function closeSiteEditor() {
    document.getElementById("editSites").close();
}

function closeSettingsEditor() {
    document.getElementById("settings").close();
}

function closeCalendarEditor() {
    document.getElementById("calendarSettings").close();
}

function openHelp() {
    window.location.href="https://github.com/kpoovakan/stickytab#stickytab";
}

function setTimeFormat(thisElement) {
    globalThis.timeFormat = thisElement.value;
    window.localStorage.setItem("stickytabTime", timeFormat);
    location.reload();

}

function setSearchEngine(thisElement) {
    globalThis.searchEngine = thisElement.value;
    window.localStorage.setItem("stickytabEngine", searchEngine);
    //location.reload();
    document.getElementById("searchoption").value = searchEngine;
}

function setDesmos(thisElement) {
    globalThis.desmosLink = thisElement.value;
    window.localStorage.setItem("stickytabDesmos", desmosLink);
    //location.reload();
}

function closeMobileWarning() {
    document.getElementById("preventMobile").close();
    window.localStorage.setItem("stickytabMobile", "1");
}

/* document.getElementById("calendarSettingsPreview").addEventListener("load", function() {
    const iframe = document.getElementById("calendarSettingsPreview");
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const style = doc.createElement("style");
    style.textContent = `body {
        background-color: var(--colorForeground);
    }`;
    doc.head.appendChild(style);
}); */

function setCalendarData(data) {
    let pie = JSON.stringify(data);
    window.localStorage.setItem("stickytabCalendar", pie);
}

function calendarAddEvent() {
    var calendarData = window.localStorage.getItem("stickytabCalendar");
    var calendarData = JSON.parse(calendarData);
    const d = new Date();
    var month = document.getElementById("calendarSetMonth").value;
    var month = Number(month);
    if(month == "onload") {
        alert("why are you setting this event to take place... last month??");
        return;
    } else {
        var monthIndex = d.getMonth();
        var monthIndex = Number(monthIndex);
        var monthIndex = monthIndex + month;
    }
    const date = document.getElementById("calendarSetDate").value;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let leapyear = d.getFullYear();
    leapyear = leapyear % 4;
    if(leapyear == 0) { // ironically, the value for false means true due to how the modulus works
        daysInMonth[1] = 29;
    }
    let monthDays = daysInMonth[monthIndex];
    if(!(date > 0 && date < monthDays + 1)) {
        alert("looks like this date is nonexistent...");
        return;
    }
    const details = document.getElementById("calendarSetDetails").value;
    if(details == "") {
        alert("but... what's happening on that day?");
        return;
    }
    /*if(calendarData == null || calendarData == undefined) {
        let currentMonth = d.getMonth();
        let nextMonth = Number(currentMonth);
        nextMonth = nextMonth + 1;
        var calendarData = `{`+currentMonth+`:{},`+nextMonth+`:{}}`;
        console.log(calendarData);
    }
    console.log(calendarData[monthIndex]);
    if(calendarData[monthIndex] == null || calendarData[monthIndex] == undefined) {
        calendarData[monthIndex] = {};
    }*/
    if(calendarData == null || calendarData == undefined) {
        let currentMonth = d.getMonth();
        let nextMonth = Number(currentMonth);
        nextMonth = nextMonth + 1;
        var thisData = new Object({});
        thisData[currentMonth] = new Object({});
        thisData[nextMonth] = new Object({});
        var calendarData = thisData;
        console.log("level 1");
    }
    var thisGroup = calendarData[monthIndex];
    var checkLength = Object.keys(calendarData[monthIndex]).length;
    if(thisGroup == null || thisGroup == undefined || checkLength == 0) {
        var thisData = new Object({});
        calendarData[monthIndex] = thisData;
        console.log("level 2");
    }
    var thisDay = calendarData[monthIndex][date];
    if(thisDay == undefined || thisDay == null) {
        calendarData[monthIndex][date] = details;
        console.log("level 3");
        setCalendarData(calendarData);
    } else {
        if(!(Array.isArray(thisDay))) {
            var thisDay = new Array(thisDay);
        }
        thisDay.push(details);
        calendarData[monthIndex][date] = thisDay;
        setCalendarData(calendarData);
    }
    location.reload();
}

function calendarRemoveEvent(thisElement, month, date) {
    var calendarData = window.localStorage.getItem("stickytabCalendar");
    var calendarData = JSON.parse(calendarData);
    var thisData = calendarData[month][date];
    if(Array.isArray(thisData)) {
        var thisEvent = thisElement.innerHTML;
        var thisIndex = thisData.indexOf(thisEvent);
        thisData.splice(thisIndex, 1);
        calendarData[month][date] = thisData;
    } else {
        delete calendarData[month][date];
    }
    setCalendarData(calendarData);
    location.reload();
}

function calendarEventsToRemove() {
    const monthEntered = document.getElementById("calendarRemoveMonth").value;
    const dateEntered = document.getElementById("calendarRemoveDate").value;
    const options = document.getElementById("calendarRemoveSpecify");
    if(monthEntered == "onload" || dateEntered == "") {
        return;
    }
    var calendarData = window.localStorage.getItem("stickytabCalendar");
    var calendarData = JSON.parse(calendarData);
    const d = new Date();
    var month = d.getMonth();
    var month = month + Number(monthEntered);
    var thisData = calendarData[month][dateEntered];
    if(thisData == undefined) {
        options.innerHTML = "no events on this date...";
        return;
    }
    const prompt = "which event do you wish to remove? <br>";
    const buttonBase = `<button onclick="calendarRemoveEvent(this, '`+month+`', '`+dateEntered+`')" class="settingsButton settingsCalendar" style="margin-right: 13px;">`;
    if(Array.isArray(thisData)) {
        options.innerHTML = prompt;
        let arrayLength = thisData.length;
        for (let i = 0; i < arrayLength; i++) {
            options.innerHTML = options.innerHTML + buttonBase + thisData[i] + "</button>";
        }
    } else {
        options.innerHTML = prompt + buttonBase + thisData + "</button>";
    }
}

// work on includeDayNum