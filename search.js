"use strict";
globalThis.siteList = siteList;

function websearchAutocomplete() {
    document.getElementById("searchAutocomplete").style.display = "block";
    //document.getElementById("searchAutocompleteAnimation").classList.add("searchAutocompleteAnimation");
    var siteListLength = siteList.length;
    var query = document.getElementById("webpage").value;
    if(query == "") {
        document.getElementById("searchAutocomplete").innerHTML = "";
        return;
    }
    var queryLength = query.length;
    var item;
    var autocomplete="";
    for (var i = 0; i < siteListLength; i++) {
        var item = siteList[i];
        var item = item.slice(0, queryLength);
        if(item == query) {
            var autocomplete = autocomplete + "<p>"+siteList[i]+"</p>";
        }
    }
    document.getElementById("searchAutocomplete").innerHTML = autocomplete;
}