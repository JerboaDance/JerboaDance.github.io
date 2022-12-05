function populateHeaderImage(headerImageElement, show){
  if (show.headerImage && show.headerImage.filename) {
    headerImage.setAttribute("src", `/assets/shows/${show.id}/${show.headerImage.filename}`)
    headerImage.setAttribute("alt", `Header image for ${show.name}`);
  } else {
    headerImage.hidden = true;
  }
}

function populateVenue(venueElement, venue) {
  venueElement.innerHTML = `<a href="${venue.url}">${venue.name}, ${venue.city}</a>`;
}


function populateBrownPaperTicketsWidget(bptElement, bptId) {
  if (bptId) {
    const widgetText = `
      <link rel="stylesheet" type="text/css" href="https://www.brownpapertickets.com/widget_v671.css" /> 
      <DIV ID="bpt_eventbody">
          <CENTER>
              <BR><BR>
                  Brown Paper Tickets Ticket Widget Loading...
              <BR><BR>
              <A HREF="https://www.brownpapertickets.com/event/${bptId}">Click Here</A> to visit the Brown Paper Tickets event page.
          </CENTER>
          <BR><BR>
      </DIV>
      <script src="https://www.brownpapertickets.com/eventwidget.js?event=${bptId}&nodescription=1&notitle=1" type="text/javascript" language="javascript"></script>
      <script src="https://www.brownpapertickets.com/widget_v671.js?event=${bptId}" type="text/javascript" language="javascript"></script>
    `;
    
    bptElement.innerHTML = widgetText;
  } else {
    bptElement.hidden = true;
  }
}


function populateTicketTiers(ticketTiersListElement, ticketTiers) {
  if (ticketTiers) {
    ticketTiers.forEach(ticketTier => {
      const ticketTierElement = document.createElement("li");
      ticketTierElement.innerHTML=`<h3>${ticketTier.name}</h3><p>${ticketTier.description}</p>`
      ticketTiersListElement.append(ticketTierElement);
    });
  }
}


function populateShowtimes(showtimesListElement, showtimes) {
  if(showtimes) {
    showtimes.forEach(showtime => {
      const showtimeElement = document.createElement("li");
      showtimeElement.innerText = showtime;
      showtimesListElement.append(showtimeElement);
    });
  }
}


function generateHighlight(highlight, isEmcee) {
  const highlightElement = document.createElement("li");

  if (highlight.url) {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> <a href="${highlight.url}">${highlight.name}</a>`;
  } else if (highlight.bio) {
    if (isEmcee) {
      highlightElement.innerHTML = `<h3>${highlight.role}</h3> <a href="/castMember.html?emceeId=${highlight.id}">${highlight.name}</a>`;
    } else {
      highlightElement.innerHTML = `<h3>${highlight.role}</h3> <a href="/castMember.html?highlightId=${highlight.id}">${highlight.name}</a>`;
    }
  }
  else {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> ${highlight.name}`;
  }

  return highlightElement;
}

function generateCompanyMembersList(companyMembers) {
  const companyMembersElement = document.createElement("li");
  companyMembersElement.innerHTML ="<h3>Company</h3>";

  const companyMembersListElement = document.createElement("ul");
  companyMembersListElement.setAttribute("class", "company-list");

  if (companyMembers && companyMembers.length > 0) {
    companyMembers.forEach(companyMember => {
      const companyMemberElement = document.createElement("li");
      if (companyMember.id) {
        companyMemberElement.innerHTML = `<a href="/castMember.html?companyMemberId=${companyMember.id}">${companyMember.name}</a>`;
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
    const emceeElement = generateHighlight(emcee, /*isEmcee*/ true);
    castListElement.append(emceeElement);
    
  }
  
  if (highlights) {
    highlights.forEach(highlight => {
      const highlightElement = generateHighlight(highlight);
      castListElement.append(highlightElement);
    })
  }

  const companyMembersElement = generateCompanyMembersList(companyMembers);
  castListElement.append(companyMembersElement);
}

function generateLink(show) {
  const link = document.createElement("a");
  link.setAttribute("href", `<a href="/show.html?showId=${show.id}">${show.name}</a>`);
  return link;
}

function checkForCurrentPerformance(show) {
  return show.performances 
    && show.performances.length > 0 
    && show.performances[0].endDate > Date.now();
}

function checkForPriorPerformances(show) {
  const hasCurrentPerformance = checkForCurrentPerformance(show);
  return !hasCurrentPerformance || (hasCurrentPerformance && show.performances.length > 1);
}

function findCurrentShow(shows) {
  let nextCurrentShow;
  Object.keys(shows).forEach(showId => {
    const show = shows[showId];
    if (checkForCurrentPerformance(show)) {
      if (!nextCurrentShow) {
        nextCurrentShow = show;
      } else {
        const nextCurrentPerformance = nextCurrentShow.performances[0];
        if  (nextCurrentPerformance.startDate > show.performances[0].startDate) {
          nextCurrentShow = show;
        }
      }
    }
  });
  return nextCurrentShow;
}

export {
  generateLink,
  populateHeaderImage,
  populateVenue,
  populateBrownPaperTicketsWidget,
  populateTicketTiers,
  populateShowtimes,
  populateCastList,
  checkForCurrentPerformance, 
  checkForPriorPerformances,
  findCurrentShow
}