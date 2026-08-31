"use strict";
window.addEventListener("load", async function() {
    setupDays();
    //if(!(daysToSetup % 7 == 0)) {}
    setupCalendar();
    adjustSize();
    setupInfo();
    displayMonths();
    await getCalendarData();
});

function setupDays() {
    globalThis.d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear();
    let leapyear = year % 4;
    globalThis.daysCurrent = daysInMonth(month, leapyear);
    month = month + 1;
    month = endOfYear(month);
    globalThis.daysNext = daysInMonth(month, leapyear);
    globalThis.daysToSetup = daysCurrent + daysNext;
    month = d.getMonth();
    globalThis.firstDay = year + ", " + month + ", 1";
    globalThis.firstDay = new Date(year, month, "1");
    globalThis.firstDayInfo = firstDay.getDay();
}

function daysInMonth(month, leapyear) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(leapyear == 0) { // ironically, the value for false means true due to how the modulus works
        days[1] = 29;
    }
    let g = days[month];
    return g;
}

function setupCalendar() {
    var dayNum = 1;
    var monthStage = 0;
    var thisWeek = "";

    let firstWeek = document.getElementById("week0");
    for (var i = 0; i < 7; i++) {
        if(i == firstDayInfo || i > firstDayInfo) {
            let thisDay = "<h1>"+dayNum.toString()+"</h1>";
            let thisContainer = `<div class="calendarDay calendarCurrentMonth" id="month`+monthStage+`day`+dayNum+`">`;
            var thisWeek = thisWeek + thisContainer + thisDay + "</div>";
            var dayNum = dayNum + 1;
        } else {
            var thisWeek = thisWeek + `<div class="calendarDisabled calendarCurrentDisabled"></div>`;
        }
    }
    firstWeek.innerHTML = thisWeek;

    for (var i = 1; i < 13; i++) {
        let thisElement = document.getElementById("week"+i);
        var thisWeek = "";
        for (var i2 = 0; i2 < 7; i2++) {
            if(monthStage == 0) {
                var thisContainer = `<div class="calendarDay calendarCurrentMonth" id="month`+monthStage+`day`+dayNum+`">`;
            } else {
                var thisContainer = `<div class="calendarDay" id="month`+monthStage+`day`+dayNum+`">`;
            }
            let thisDay = "<h1>"+dayNum.toString()+"</h1>";
            //var thisWeek = thisWeek + thisContainer + thisDay + "</div>";
            var dayNum = dayNum + 1;
            if(monthStage == 0) {
                if(dayNum > daysCurrent) {
                    var dayNum = 1;
                    var monthStage = 1;
                }
            } else {
                if(dayNum > (daysNext + 1) && !(monthStage == 3)) {
                    monthStage = 2;
                }
            }
            if(!(monthStage == 2)) {
                var thisWeek = thisWeek + thisContainer + thisDay + "</div>";
            } else if(monthStage == 3) {
                var thisWeek = "";
            } else {
                var thisWeek = thisWeek + `<div class="calendarDisabled"></div>`;
            }
        }
        thisElement.innerHTML = thisWeek;
        if(monthStage == 2) {
            var monthStage = 3;
            return;
        }
    }
}

function adjustSize() {
    for(var i = 0; i < 13; i++) {
        let thisWeek = document.getElementById("week"+i).innerHTML;
        if(thisWeek == "" || thisWeek == null) {
            var lastWeek = i - 1;
            var i = 13;
        }
    }
    let sizes = [92, 46, 31, 22, 18, 15, 13, 11.7, 10.2, 9.1, 8.2, 7.314, 6.7, 6.2];
    var thisSize = sizes[lastWeek];
    var thisSize = thisSize.toString() + "vh";
    
    let activeItems = document.getElementsByClassName("calendarDay");
    for(let i = 0; i < activeItems.length; i++) {
        activeItems[i].style.height = thisSize;
    }

    let disabledItems = document.getElementsByClassName("calendarDisabled");
    for(let i = 0; i < disabledItems.length; i++) {
        disabledItems[i].style.height = thisSize;
    }
}

function setupInfo() {
    return;
}

function displayMonths() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let thisMonth = d.getMonth();
    thisMonth = months[thisMonth];
    document.getElementById("monthCurrent").innerHTML = thisMonth;
    thisMonth = d.getMonth();
    thisMonth = thisMonth + 1;
    thisMonth = endOfYear(thisMonth);
    thisMonth = months[thisMonth];
    document.getElementById("monthNext").innerHTML = thisMonth;
}

async function getCalendarData() {
    globalThis.calendarData = window.localStorage.getItem("stickytabCalendar");
    globalThis.includeDayNum = window.localStorage.getItem("stickytabCalendarIncludeDayNum");
    if(globalThis.includeDayNum === null) {
        globalThis.includeDayNum = 1;
    } else {
        globalThis.includeDayNum = Number(includeDayNum);
    }
    if(globalThis.calendarData === null) {
        return;
    }
    globalThis.calendarData = await JSON.parse(calendarData);
    let dataItems = Object.keys(globalThis.calendarData).length;
    if(dataItems > 2) {
        var monthThis = d.getMonth();
        var monthNext = monthThis + 1;
        for (let i = 0; i < dataItems; i++) {
            var thisItem = Object.keys(globalThis.calendarData)[i];
            if(!(thisItem == monthThis || thisItem == monthNext)) {
                let entries = Object.entries(globalThis.calendarData);
                entries.splice(i, 1);
                globalThis.calendarData = Object.fromEntries(entries);
            }
        }
    }
    console.log(globalThis.calendarData);
    setCalendarData(globalThis.calendarData);
    //first month
    let frozen = d.getMonth();
    pushToCalendar(frozen, 0, includeDayNum);
    //second month
    frozen = frozen + 1;
    pushToCalendar(frozen, 1, includeDayNum);
    /*for (let i = 0; i < globalThis.calendarData.length; i++) {
        let thisKey = Object.keys(globalThis.calendarData)[i];
        let thisValue = globalThis.calendarData[thisKey];

        let thisContent = document.getElementById(thisKey).innerHTML;
        thisContent = thisContent + "<p>" + thisValue + "</p>";
        document.getElementById(thisKey).innerHTML = thisContent;
    }*/
}

function endOfYear(month) {
    if(month == 12) {
        return 0;
    } else {
        return month;
    }
}

function setCalendarData(data) {
    let pie = JSON.stringify(data);
    window.localStorage.setItem("stickytabCalendar", pie);
}

function pushToCalendar(monthIndex, setupIndex, includeDayNum) {
    var dataCurrent = globalThis.calendarData[monthIndex];
    //console.log(dataCurrent);
    let rotisserie = Object.keys(dataCurrent).length;
    for (let i = 0; i < rotisserie; i++) {
        let thisKey = Object.keys(dataCurrent)[i];
        let thisValue = dataCurrent[thisKey];
        if(includeDayNum) {
            var thisContent = document.getElementById("month0day"+thisKey).innerHTML;
        } else {
            var thisContent = "";
        }
        var thisContent = thisContent + "<p class='calendarDayInfoScroll calendarDayInfo"+setupIndex+"'>" + thisValue + "</p>";
        document.getElementById("month"+setupIndex+"day"+thisKey).innerHTML = thisContent;
    }
}