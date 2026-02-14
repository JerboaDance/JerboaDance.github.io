import { getShowImageUrl, getCompanyMemberBioUrl, getHighlightBioUrl } from './urls.js';

function populateHeaderImage(headerImageElement, show) {
  if (show.headerImage?.filename) {
    headerImageElement.setAttribute('src', getShowImageUrl(show, show.headerImage.filename));
    headerImageElement.setAttribute('alt', `Header image for ${show.name}`);
  } else {
    headerImageElement.hidden = true;
  }
}

function populateVenue(venueElement, venue) {
  venueElement.innerHTML = `<a href="${venue.url}">${venue.name}, ${venue.city}</a>`;
}

function populateEventbriteWidget(eventbriteElement, eventbriteId) {
  if (eventbriteId) {
    // Create container div with unique ID
    const containerId = `eventbrite-widget-container-${eventbriteId}`;
    eventbriteElement.innerHTML = `<div id="${containerId}"></div>`;

    // Load Eventbrite widget script if not already loaded
    if (!document.querySelector('script[src*="eb_widgets.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
      script.onload = () => initializeEventbriteWidget(eventbriteId, containerId);
      document.head.append(script);
    } else {
      // Script already loaded, initialize immediately
      initializeEventbriteWidget(eventbriteId, containerId);
    }
  } else {
    eventbriteElement.hidden = true;
  }
}

function initializeEventbriteWidget(eventId, containerId) {
  window.EBWidgets.createWidget({
    widgetType: 'checkout',
    eventId: eventId,
    iframeContainerId: containerId,
    iframeContainerHeight: 625
  });
}

function populateTicketTiers(ticketTiersListElement, ticketTiers) {
  if (ticketTiers) {
    ticketTiers.forEach((ticketTier) => {
      const ticketTierElement = document.createElement('li');
      ticketTierElement.innerHTML = `<h3>${ticketTier.name}</h3><p>${ticketTier.description}</p>`;
      ticketTiersListElement.append(ticketTierElement);
    });
  }
}

function populateShowtimes(showtimesListElement, showtimes) {
  if (showtimes) {
    showtimes.forEach((showtime) => {
      const showtimeElement = document.createElement('li');
      showtimeElement.innerText = showtime;
      showtimesListElement.append(showtimeElement);
    });
  }
}

function generateHighlight(highlight) {
  const highlightElement = document.createElement('li');

  if (highlight.url) {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> <a href="${highlight.url}">${highlight.name}</a>`;
  } else if (highlight.useCompanyMemberPage) {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> <a href="${getCompanyMemberBioUrl(highlight)}">${highlight.name}</a>`;
  } else if (highlight.bio) {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> <a href="${getHighlightBioUrl(highlight)}">${highlight.name}</a>`;
  } else {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> ${highlight.name}`;
  }

  return highlightElement;
}

function generateCompanyMembersList(companyMembers) {
  const companyMembersElement = document.createElement('li');
  companyMembersElement.innerHTML = '<h3>Company</h3>';

  const companyMembersListElement = document.createElement('ul');
  companyMembersListElement.setAttribute('class', 'company-list');

  if (companyMembers && companyMembers.length > 0) {
    companyMembers.forEach((companyMember) => {
      const companyMemberElement = document.createElement('li');
      if (!companyMember.suppressPage) {
        companyMemberElement.innerHTML = `<a href="${getCompanyMemberBioUrl(companyMember)}">${companyMember.name}</a>`;
      } else {
        companyMemberElement.innerText = companyMember.name;
      }
      companyMembersListElement.append(companyMemberElement);
    });
  }

  companyMembersElement.append(companyMembersListElement);
  return companyMembersElement;
}

function populateCastList(castListElement, emcee, highlights, companyMembers) {
  if (emcee) {
    const emceeElement = generateHighlight(emcee);
    castListElement.append(emceeElement);
  }

  if (highlights) {
    highlights.forEach((highlight) => {
      const highlightElement = generateHighlight(highlight);
      castListElement.append(highlightElement);
    });
  }

  const companyMembersElement = generateCompanyMembersList(companyMembers);
  castListElement.append(companyMembersElement);
}

function findCurrentPerformanceOfShow(show) {
  let currentPerformance = null;
  if (show?.performances?.length > 0 && show.performances[0].endDate >= Date.now()) {
    currentPerformance = show.performances[0];
  }
  return currentPerformance;
}

function findCurrentShow(shows) {
  let currentShow;
  let currentPerformance;
  Object.keys(shows).forEach((showId) => {
    const show = shows[showId];
    const performance = findCurrentPerformanceOfShow(show);
    if (performance) {
      if (!currentShow) {
        currentShow = show;
        currentPerformance = performance;
      } else if (performance.startDate < currentPerformance.startDate) {
        currentShow = show;
        currentPerformance = performance;
      }
    }
  });
  return { currentShow, currentPerformance };
}

function checkForPriorPerformances(show) {
  const currentPerformance = findCurrentPerformanceOfShow(show);
  return (!currentPerformance && show.performances.length > 0)
    || (!!currentPerformance && show.performances.length > 1);
}

export {
  populateHeaderImage,
  populateVenue,
  populateEventbriteWidget,
  populateTicketTiers,
  populateShowtimes,
  populateCastList,
  findCurrentPerformanceOfShow,
  findCurrentShow,
  checkForPriorPerformances,
};
