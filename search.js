"use strict";
globalThis.autocomplete = 0;
globalThis.searchItems = 0;

function websearchAutocomplete() {
    if(storage === null) {
        return;
    }
    document.getElementById("searchAutocomplete").style.display = "block";
    //document.getElementById("searchAutocompleteAnimation").classList.add("searchAutocompleteAnimation");
    var siteListLength = siteList.length;
    var query = document.getElementById("webpage").value;
    if(query == "") {
        document.getElementById("searchAutocomplete").innerHTML = "";
        document.getElementById("searchAutocomplete").style.display = "none";
        return;
    }
    var queryLength = query.length;
    var item;
    var autocomplete="";
    globalThis.searchItems = 0;
    for (var i = 0; i < siteListLength; i++) {
        var item = siteList[i];
        var item = item.slice(0, queryLength);
        if(item == query) {
            globalThis.searchItems = searchItems + 1;
            var autocomplete = autocomplete + `<button class="autocompleteOption" onclick="autocompleteRedirect(this)" 
            style="background-color: transparent;" 
            id="searchOption`+searchItems+`">`
            +siteList[i]+`</button>`;
        }
    }
    document.getElementById("searchAutocomplete").innerHTML = autocomplete;
    globalThis.tracker = 1;
    if(autocomplete.length > 0) {
        highlightSelection(1);
    } else {
        document.getElementById("searchAutocomplete").style.display = "none";
    }
}

function autocompleteRedirect(thisElement) {
    globalThis.autocomplete = 1;
    let linking = thisElement.innerHTML;
    linking = siteList.indexOf(linking);
    linking = storage[linking];
    window.location.href = linking;
}


document.addEventListener("keydown", (event) => {
    var show = document.getElementById("searchAutocomplete").style.display;
    if(event.key === "Enter") {
        if(show == "none") {
            webpage(document.getElementById("webpage"));
        } else if(tracker > searchItems) {
            alert("none selected");
        } else {
            let selection = document.getElementById("searchOption"+tracker).innerHTML;
            selection = siteList.indexOf(selection);
            selection = storage[selection];
            window.location.href = selection;
        }
    } else if(event.key === "ArrowUp") {
        event.preventDefault();
        if(tracker > 1) {
            globalThis.tracker = tracker - 1;
            highlightSelection(1);
        }
    } else if(event.key === "ArrowDown") {
        event.preventDefault();
        if(tracker < searchItems) {
            globalThis.tracker = tracker + 1;
            highlightSelection(1);
        } else if(tracker == searchItems) {
            globalThis.tracker = tracker + 1;
            highlightSelection(0);
        } else if(tracker > searchItems) {
            globalThis.tracker = 1;
            highlightSelection(1);
        }
    } else {
        return;
    }
});

function highlightSelection(selectedTrue) {
    const zeElement = document.getElementById("searchAutocomplete");
    for (const child of zeElement.children) {
        child.style.backgroundColor = "transparent";
    }
    if(selectedTrue) {
        document.getElementById("searchOption"+tracker).style.backgroundColor = "var(--colorAccent)";
    }
}

function autocompleteTransparent() {
    const zeElement = document.getElementById("searchAutocomplete");
    for (const child of zeElement.children) {
        child.style.backgroundColor = "transparent";
    }
}