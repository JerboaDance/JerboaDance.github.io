
import { shows } from "/scripts/database.js";

function generateLink(show) {
  const link = document.createElement("a");
  link.setAttribute("href", `<a href="/show.html?showId=${show.id}">${shows.name}</a>`);
  return link;
}

function generateHighlight(highlight) {
  const highlightElement = document.createElement("li");

  if (highlight.url) {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> <a href="${highlight.url}">${highlight.name}</a>`;
  } else {
    highlightElement.innerHTML = `<h3>${highlight.role}</h3> ${highlight.name}`;
  }

  return highlightElement;
}

function generateCompanyMembersList(performance) {
  const companyMembersListElement = document.createElement("ul");
  companyMembersListElement.setAttribute("class", "company-list");

  performance.companyMembers.forEach(companyMember => {
    const companyMemberElement = document.createElement("li");
    if (companyMember.id) {
      companyMemberElement.innerHTML = `<a href="/companyMember.html?companyMemberId=${companyMember.id}">${companyMember.name}</a>`;
    } else {
      companyMemberElement.innerText = companyMember.name;
    }
    companyMembersListElement.append(companyMemberElement);
  });

  return companyMembersListElement;
}

function generateCastList(performance) {
  const castListElement = document.createElement("ul");
  castListElement.setAttribute("class", "cast-list");

  // TODO add the emcee

  if (performance.highlights) {
    performance.highlights.forEach(highlight => {
      const highlightElement = generateHighlight(highlight);
      castListElement.append(highlightElement);
    })
  }

  const companyMembersElement = document.createElement("li");
  companyMembersElement.innerHTML ="<h3>Company</h3>";
  companyMembersElement.append(generateCompanyMembersList(performance));

  castListElement.append(companyMembersElement); 

  return castListElement;
}

function generateVenue(venue){
  const venueElement = document.createElement("h3");
  venueElement.setAttribute("class", "venue");
  venueElement.innerHTML = `<a href="${venue.url}">${venue.name}, ${venue.city}</a>`;
  return venueElement;
}

function generateName(name){
  const nameElement = document.createElement("h1");
  nameElement.innerText = name;
  return nameElement;
}

function generateDates(dates){
  const datesElement = document.createElement("h2");
  datesElement.setAttribute("class", "show-dates");
  datesElement.innerText = dates;
  return datesElement;
}

function generateBrownPaperTicketsWidget(bptId) {
  const bptElement = document.createElement("div");
  bptElement.setAttribute("class", "tickets");
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
  return bptElement;
}

function generateShowtimes(showtimes) {
  if (showtimes) {
    const showtimesListElement = document.createElement("ul");
    showtimesListElement.setAttribute("class", "show-times");
    showtimes.forEach(showtime => {
      const showtimeElement = document.createElement("li");
      showtimeElement.innerText = showtime;
      showtimesListElement.append(showtimeElement);
    });
    return showtimesListElement;
  }
}

function generateTicketTiers(ticketTiers) {
  if (ticketTiers) {
    const ticketTierListElement = document.createElement("ul");
    ticketTierListElement.setAttribute("class", "ticket-tiers");

    ticketTiers.forEach(ticketTier => {
      const ticketTierElement = document.createElement("li");
      ticketTierElement.innerHTML=`<h3>${ticketTier.name}</h3><p>${ticketTier.description}</p>`
      ticketTierListElement.append(ticketTierElement);
    })
    return ticketTierListElement;
  }
}

function generateDescription(description){
  const descriptionElement = document.createElement("p");
  descriptionElement.innerHTML = description;
  return descriptionElement;
}

function checkForUpcomingPerformance(show) {
  return show.performances 
    && show.performances.length > 0 
    && show.performances[0].endDate > Date.now();
}

function checkForPriorPerformances(show) {
  const hasUpcomingPerformance = checkForUpcomingPerformance(show);
  return !hasUpcomingPerformance || (hasUpcomingPerformance && show.performances.length > 1);
}

function findNextUpcomingShow() {
  let nextUpcomingShow;
  Object.keys(shows).forEach(showId => {
    const show = shows[showId];
    if (checkForUpcomingPerformance(show)) {
      if (!nextUpcomingShow) {
        nextUpcomingShow = show;
      } else {
        const nextUpcomingPerformance = nextUpcomingShow.performances[0];
        if  (nextUpcomingPerformance.startDate > show.performances[0].startDate) {
          nextUpcomingShow = show;
        }
      }
    }
  });
  return nextUpcomingShow;
}

export {
  generateLink,
  generateName,
  generateDates, 
  generateVenue,
  generateBrownPaperTicketsWidget,
  generateDescription, 
  generateTicketTiers,
  generateShowtimes,
  generateCastList,
  checkForUpcomingPerformance, 
  checkForPriorPerformances,
  findNextUpcomingShow
}