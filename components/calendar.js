"use strict";
window.addEventListener("load", function() {
    setupDays();
    //if(!(daysToSetup % 7 == 0)) {}
    setupCalendar();
    adjustSize();
    setupInfo();
});

function setupDays() {
    globalThis.d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear();
    let leapyear = year % 4;
    globalThis.daysCurrent = daysInMonth(month, leapyear);
    month = month + 1;
    globalThis.daysNext = daysInMonth(month, leapyear);
    globalThis.daysToSetup = daysCurrent + daysNext;
    globalThis.firstDay = year + "-" + month + "-01";
    globalThis.firstDay = new Date(firstDay);
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
            let thisDay = "<p>"+dayNum.toString()+"</p>";
            let thisContainer = `<div class="calendarDay" id="month`+monthStage+`day`+dayNum+`">`;
            var thisWeek = thisWeek + thisContainer + thisDay + "</div>";
            var dayNum = dayNum + 1;
        } else {
            var thisWeek = thisWeek + `<div class="calendarDisabled"></div>`;
        }
    }
    firstWeek.innerHTML = thisWeek;

    for (var i = 1; i < 13; i++) {
        let thisElement = document.getElementById("week"+i);
        var thisWeek = "";
        for (var i2 = 0; i2 < 7; i2++) {
            let thisContainer = `<div class="calendarDay" id="month`+monthStage+`day`+dayNum+`">`;
            let thisDay = "<p>"+dayNum.toString()+"</p>";
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
        if(thisWeek == "") {
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