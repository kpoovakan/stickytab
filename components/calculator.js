"use strict";
/* STEPS

phi) whatever's entered first is for Value One
euler's number) whatever action button is pressed is for Mid Value
pi) whatever value is entered next is for Value Two
Chinese unlucky number) once the equal button is pressed, you combine Value One with Value Two using the Mid Value
555 - hahaha in Thai) then the answer is shown on screen, and the answer becomes the new Value One
6 - don't say seven) Mid Value and Value Two are erased and new calculations can be performed

*/


var valueOne = "";
var valueTwo = "";
var valueMid = "";
var prevDecimal = 0; //for decimal code
var currentEdit = 1;
var actionNames = '{"add":"+", "subtract":"-", "multiply":"x", "divide":"÷", "sqrt":"√", "":""}';
var actionNames = JSON.parse(actionNames);



function updateCurrentValue(withThis) {
    if(currentEdit == 1) {
        if(String(valueOne).length > 5) {
            alert("whoa.. that's a big number. use Desmos instead.");
            return;
        }
    } else if(currentEdit == 2) {
        if(String(valueTwo).length > 5) {
            alert("whoa.. that's a big number. use Desmos instead.");
            return;
        }
    }
    if (withThis == "decimal") {
        globalThis.prevDecimal = 1;
        return;
    } else if(prevDecimal) {
        if(currentEdit == 1) {
            var value = String(valueOne) + "." + String(withThis);
            globalThis.valueOne = Number(value);
            globalThis.prevDecimal = 0;
        } else if(currentEdit == 2) {
            var value = String(valueTwo) + "." + String(withThis);
            globalThis.valueTwo = Number(value);
            globalThis.prevDecimal = 0;
        }
    } else {
        if(currentEdit == 1) {
            var value = String(valueOne) + String(withThis);
            globalThis.valueOne = Number(value);
        } else if(currentEdit == 2) {
            var value = String(valueTwo) + String(withThis);
            globalThis.valueTwo = Number(value);
        }
    }
    document.getElementById("answer").innerHTML = "<p style='margin: 0px;'>"+String(valueOne)+actionNames[valueMid]+String(valueTwo)+"</p>";
}

function action(action) {
    if(action == "sqrt") {
        equals();
        globalThis.valueMid = action;
        equals();
        return;
    }
    if(currentEdit > 1) {
        equals();
        globalThis.valueMid = action;
        globalThis.currentEdit = 2;
    } else {
        globalThis.valueMid = action;
        globalThis.currentEdit = 2;
    }
    document.getElementById("answer").innerHTML = "<p style='margin: 0px;'>"+String(valueOne)+actionNames[valueMid]+String(valueTwo)+"</p>";
}

function equals() {
    if(valueMid == "add") {
        globalThis.valueOne = valueOne + valueTwo;
        eraseVariables();
    } else if(valueMid == "subtract") {
        globalThis.valueOne = valueOne - valueTwo;
        eraseVariables();
    } else if(valueMid == "multiply") {
        globalThis.valueOne = valueOne * valueTwo;
        eraseVariables();
    } else if(valueMid == "divide") {
        globalThis.valueOne = valueOne / valueTwo;
        eraseVariables();
    } else if(valueMid == "sqrt") {
        globalThis.valueOne = Math.sqrt(valueOne);
        eraseVariables();
    } if(valueMid == "") {
        return;
    } else {
        alert("calculation error; press OK to redirect to Desmos");
        openDesmos();
    }
}

function eraseVariables() {
    globalThis.valueTwo = "";
    globalThis.valueMid = "";
    globalThis.currentEdit = 1;
    document.getElementById("answer").innerHTML = "<p style='margin: 0px;'>"+String(valueOne)+"</p>";
}

function openDesmos() {
    globalThis.desmosLink = localStorage.getItem("stickytabDesmos");
    if(desmosLink == null) {
        window.top.location.href = "https://www.desmos.com/scientific"
    } else {
        window.top.location.href = "https://www.desmos.com/"+desmosLink;
    }
}