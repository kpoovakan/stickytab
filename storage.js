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
    }
    let fred = storage;
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
    let freda = fred.indexOf(item);
    if(freda === -1) {
        alert("not found; remember to edit the response thingy for this");
        return;
    }
    fred.splice(freda, 1);
    fred = JSON.stringify(fred);
    console.log(localStorage.getItem("stickytabSites"));
    console.log(fred);
    window.localStorage.setItem("stickytabSites", fred);
    setupStorage();
    //editSitesList();
    thisElement.remove();
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