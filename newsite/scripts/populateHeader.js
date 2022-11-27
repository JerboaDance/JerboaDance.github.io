import { shows } from "/scripts/database.js";
function populateHeader() {
    fetch('/header.html')
    .then(res => res.text())
    .then(headerContent => {
        let header = document.getElementById("header");
        header.innerHTML = headerContent;
        let showsSubmenu = document.getElementById("showsSubmenu");
        Object.keys(shows).forEach(key => {
            const menuItem = document.createElement("li");
            menuItem.innerHTML =`<a href="/show.html?showId=${key}">${shows[key].name}</a>`;
            showsSubmenu.append(menuItem);
        });
    })
}

populateHeader();