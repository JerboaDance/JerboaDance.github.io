import { shows } from '/scripts/database.js';
import { findCurrentShow } from '/scripts/shows.js';
import { getShowUrl } from '/scripts/urls.js';
/* eslint-disable */
function addGoogleAnalytics() {
  (function (i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
  }(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'));

  ga('create', '{{ site.google_analytics }}', 'auto');
  ga('send', 'pageview');
}

function addTwitterUniversalTag() {
  !(function (e, t, n, s, u, a) {
    e.twq || (s = e.twq = function () {
      s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
    }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = '//static.ads-twitter.com/uwt.js',
    a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a));
  }(window, document, 'script'));
  // Insert Twitter Pixel ID and Standard Event data below
  twq('init', 'o7lmj');
  twq('track', 'PageView');
}
/* eslint-enable */

async function populateHeader() {
  const headerContent = await (await fetch('/fragments/header.html')).text();
  const header = document.getElementById('header');
  header.innerHTML = headerContent;

  const showsSubmenu = document.getElementById('showsSubmenu');
  Object.keys(shows).forEach((showId) => {
    const menuItem = document.createElement('li');
    const show = shows[showId];
    menuItem.innerHTML = `<a href="${getShowUrl(show)}">${show.name}</a>`;
    showsSubmenu.append(menuItem);
  });

  const { currentShow } = findCurrentShow(shows);
  const currentShowElement = document.getElementById('currentShow');
  if (currentShow) {
    currentShowElement.innerHTML = `<a href="${getShowUrl(currentShow)}">${currentShow.name}</a>`;
  } else {
    currentShowElement.innerHTML = '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=7G65H8ZWEKR74" target="_blank" rel="nofollow">Donate</a>';
  }
}

async function populateFooter() {
  const footerHtml = await (await fetch('/fragments/footer.html')).text();
  const footer = document.getElementById('footer');
  footer.innerHTML = footerHtml;
}

populateHeader();
populateFooter();
addGoogleAnalytics();
addTwitterUniversalTag();
