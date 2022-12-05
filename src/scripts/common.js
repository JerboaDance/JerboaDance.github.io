import { shows } from "/scripts/database.js";
import { findCurrentShow } from "/scripts/shows.js";

function addGoogleAnalytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '{{ site.google_analytics }}', 'auto');
    ga('send', 'pageview');
}
function addTwitterUniversalTag() {
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    // Insert Twitter Pixel ID and Standard Event data below
    twq('init','o7lmj');
    twq('track','PageView');
}

async function populateHeader() {
    const headerContent = await (await fetch('/fragments/header.html')).text();
    let header = document.getElementById("header");
    header.innerHTML = headerContent;


    let showsSubmenu = document.getElementById("showsSubmenu");
    Object.keys(shows).forEach(key => {
        const menuItem = document.createElement("li");
        menuItem.innerHTML =`<a href="/show.html?showId=${key}">${shows[key].name}</a>`;
        showsSubmenu.append(menuItem);
    });

    const currentShow = findCurrentShow(shows);
    if (currentShow) {
        const currentShowElement = document.getElementById("currentShow");
        currentShowElement.innerHTML = `<a href="/show.html?showId=${currentShow.id}">${currentShow.name}</a>`;
    } else {
        // TODO donate?
    }
}

async function populateFooter() {
    const footerHtml = await (await fetch('/fragments/footer.html')).text();
    let footer = document.getElementById('footer');
    footer.innerHTML = footerHtml;
}

populateHeader();
populateFooter();
// addGoogleAnalytics();
// addTwitterUniversalTag();