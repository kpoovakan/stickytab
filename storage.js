"use strict";


globalThis.storage = localStorage.getItem("stickytabSites");
if(!(storage === null)) {
    globalThis.storage = JSON.parse(storage);
    setupStorage();
    editSitesList();
}


async function setupStorage() {
    globalThis.siteList = [];
    globalThis.siteListView = '<tr><th class="siteListRight siteListHeading">your saved sites⠀/</th><th class="siteListLeft siteListHeading"><a href="javascript:void(0)" onclick="editSites()">/⠀tap here to edit</a></th></tr>';
    let storageLength = storage.length;
    for (let i = 0; i < storageLength; i = i+2) {
        let item = storage[i];
        let siteHttp = item.slice(0,7);
        let siteHttps = item.slice(0,8);
         if(siteHttp == "http://") {
            item = item.slice(7);
            globalThis.siteList.push(item);
            item = "<tr><td class='siteListLeft'><a href='http://"+item+"'>"+item+"</a></td>";
            globalThis.siteListView = siteListView + item;
        } else if(siteHttps == "https://") {
            item = item.slice(8);
            globalThis.siteList.push(item);
            item = "<tr><td class='siteListLeft'><a href='https://"+item+"'>"+item+"</a></td>";
            globalThis.siteListView = siteListView + item;
        }
        //repeat for second thing
        item = storage[i+1];
        if (!(item === undefined)) {
            siteHttp = item.slice(0,7);
            siteHttps = item.slice(0,8);
             if(siteHttp == "http://") {
                item = item.slice(7);
                globalThis.siteList.push(item);
                item = "<td class='siteListRight'><a href='http://"+item+"'>"+item+"</a></td></tr>";
                globalThis.siteListView = siteListView + item;
            } else if(siteHttps == "https://") {
                item = item.slice(8);
                globalThis.siteList.push(item);
                item = "<td class='siteListRight'><a href='https://"+item+"'>"+item+"</a></td></tr>";
                globalThis.siteListView = siteListView + item;
            }
        } else {
            globalThis.siteListView = siteListView + "<td class='siteListRight'></td></tr>"
        }
    }
    document.getElementById("siteList").innerHTML = siteListView;
}

async function storageAdd(item) {
    let freda = document.getElementById("addSite")
    freda = freda.value;
    if(freda === undefined) {
        alert("please enter site URL");
        return;
    } else if(!(freda.slice(0,4) == "http")) {
        alert("please include the http or https");
        return;
    }
    let fred = storage;
    if(fred === null) {
    fred = [];
    }
    fred.push(item);
    globalThis.storage = fred;
    fred = JSON.stringify(fred);
    console.log(localStorage.getItem("stickytabSites"));
    console.log(fred);
    window.localStorage.setItem("stickytabSites", fred);
    setupStorage();
    location.reload();
}

function storageRemove(item, thisElement) {
    let fred = storage;
    if(fred === null) {
    fred = [];
    }
    let freda = fred.indexOf(item);
    if(freda === -1) {
        alert("uh.. i have no clue what you just did..");
        return;
    }
    fred.splice(freda, 1);
    fred = JSON.stringify(fred);
    //console.log(localStorage.getItem("stickytabSites"));
    //console.log(fred);
    window.localStorage.setItem("stickytabSites", fred);
    setupStorage();
    //editSitesList();
    //thisElement.remove();
    location.reload();
}

function editSitesList() {
    globalThis.editSitesList = [];
    globalThis.editSitesListView = '<tr><th class="editSitesListRight editSitesListHeading">your saved sites⠀/</th><th class="editSitesListLeft editSitesListHeading"><a href="javascript:void(0)" onclick="editSites()">/⠀tap a site to remove it</a></th></tr>';
    let storageLength = storage.length;
    for (let i = 0; i < storageLength; i = i+2) {
        let item = storage[i];
        let siteHttp = item.slice(0,7);
        let siteHttps = item.slice(0,8);
         if(siteHttp == "http://") {
            let site = item;
            item = item.slice(7);
            globalThis.editSitesList.push(item);
            item = `<tr><td class='editSitesListLeft'><a href='javascript:void(0)' onclick='storageRemove("`+site+`", this)'>`+item+`</a></td>`;
            globalThis.editSitesListView = editSitesListView + item;
        } else if(siteHttps == "https://") {
            let site = item;
            item = item.slice(8);
            globalThis.editSitesList.push(item);
            item = `<tr><td class='editSitesListLeft'><a href='javascript:void(0)' onclick='storageRemove("`+site+`", this)'>`+item+`</a></td>`;
            globalThis.editSitesListView = editSitesListView + item;
        }
        //repeat for second thing
        item = storage[i+1];
        if (!(item === undefined)) {
            siteHttp = item.slice(0,7);
            siteHttps = item.slice(0,8);
             if(siteHttp == "http://") {
                let site = item;
                item = item.slice(7);
                globalThis.editSitesList.push(item);
                item = `<td class='editSitesListRight'><a href='javascript:void(0)' onclick='storageRemove("`+site+`", this)'>`+item+`</a></td></tr>`;
                globalThis.editSitesListView = editSitesListView + item;
            } else if(siteHttps == "https://") {
                let site = item;
                item = item.slice(8);
                globalThis.editSitesList.push(item);
                item = `<td class='editSitesListRight'><a href='javascript:void(0)' onclick='storageRemove("`+site+`", this)'>`+item+`</a></td></tr>`;
                globalThis.editSitesListView = editSitesListView + item;
            }
        } else {
            globalThis.editSitesListView = editSitesListView + "<td class='editSitesListRight'></td></tr>"
        }
    }
    document.getElementById("editSitesList").innerHTML = editSitesListView;
}

// the following code is probably for saving and loading storage
// the functions are for testing purposes only and are never actually called anywhere in the scripts

function getStorage() {
    var storageStickies = localStorage.getItem("extensions.turbowarp.org/local-storage:kpoovakan/stickytab");
    /*if(!(storageStickies === null)) {
        var storageStickies = JSON.parse(storageStickies);
    }*/

    var storageDesmos = localStorage.getItem("stickytabDesmos");
    /*if(!(storageDesmos === null)) {
        var storageDesmos = JSON.parse(storageDesmos);
    }*/

    var storageEngine = localStorage.getItem("stickytabEngine");
    /*if(!(storageEngine === null)) {
        var storageEngine = JSON.parse(storageEngine);
    }*/

    var storageSites = localStorage.getItem("stickytabSites");
    /*if(!(storageSites === null)) {
        var storageSites = JSON.parse(storageSites);
    }*/

    var storageTime = localStorage.getItem("stickytabTime");
    /*if(!(storageTime === null)) {
        var storageTime = JSON.parse(storageTime);
    }*/

    var saveStorage = [];
    saveStorage.push(storageStickies);
    saveStorage.push(storageDesmos);
    saveStorage.push(storageEngine);
    saveStorage.push(storageSites);
    saveStorage.push(storageTime);
    navigator.clipboard.writeText(saveStorage);
    console.log(saveStorage);

}

function setStorage(query) {
    var storageStickies = query[0];
    var storageDesmos = query[1];
    var storageEngine = query[2];
    var storageSites = query[3];
    console.log(storageSites);
    var storageTime = query [4];
    //window.localStorage.setItem("extensions.turbowarp.org/local-storage:kpoovakan/stickytab", storageStickies);
    window.localStorage.setItem("stickytabDesmos", storageDesmos);
    window.localStorage.setItem("stickytabEngine", storageEngine);
    window.localStorage.setItem("stickytabSites", storageSites);
    window.localStorage.setItem("stickytabTime", storageTime);
}