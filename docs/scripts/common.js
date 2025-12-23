import { shows } from '/scripts/database.js';
import { findCurrentShow } from '/scripts/shows.js';
import { getShowUrl } from '/scripts/urls.js';
/* eslint-disable */
function addGoogleAnalytics() {
  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9JSV1XS3DN';
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-9JSV1XS3DN');
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
