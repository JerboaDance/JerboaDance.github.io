import { shows } from "/scripts/database.js";

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

function generateDates(date){
  const datesElement = document.createElement("h2");
  datesElement.setAttribute("class", "show-dates");
  datesElement.innerText = date;
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

function generateDescription(description){
  const descriptionElement = document.createElement("p");
  descriptionElement.innerHTML = description;
  return descriptionElement;
}

function generateUpcomingPerformance(show) {
  const performance = show.performances[0];
  const datesElement = generateDates(performance.dates);
  const venueElement = generateVenue(performance.venue);

  let bptElement;
  if (performance.bptId) {
    bptElement = generateBrownPaperTicketsWidget(performance.bptId);
  }

  const descriptionElement = generateDescription(show.description);
  const showtimesElement = generateShowtimes(performance.showtimes);
  const castListElement = generateCastList(performance);

  return [
    datesElement, 
    venueElement, 
    bptElement, 
    descriptionElement,
    showtimesElement,
    castListElement
  ];
}

function generatePriorPerformance(priorPerformance) {
  const priorPerformanceElement = document.createElement("li");
  const datesElement = generateDates(priorPerformance.dates);
  const venueElement = generateVenue(priorPerformance.venue);
  const castListElement = generateCastList(priorPerformance);
  priorPerformanceElement.append(datesElement, venueElement, castListElement);
  return priorPerformanceElement;
}

const url = new URL(document.location);
const showId = url.searchParams.get("showId");

const mainElement = document.getElementById("main");

// check for valid show
if (showId && shows[showId]) {
  const show = shows[showId];
  
  const nameElement = document.getElementById("name");
  nameElement.innerText = show.name;

  if (show.performances && show.performances.length > 0){
    const hasUpcomingPerformance = (show.performances[0].endDate > Date.now());
    const hasPriorPerformances = !hasUpcomingPerformance || (hasUpcomingPerformance && show.performances.length > 1);

    if (hasUpcomingPerformance) {
      mainElement.append(...generateUpcomingPerformance(show));
    } else {
      mainElement.append(generateDescription(show.description));
    }

    if (hasPriorPerformances) {
      const priorPerformances = document.createElement("div");

      if (hasUpcomingPerformance) {
        priorPerformances.innerHTML = "<h2>Prior Shows</h2>";
      }

      const priorPerformancesList = document.createElement("ul");
      priorPerformancesList.setAttribute("class", "prior-performances");
      priorPerformances.append(priorPerformancesList);

      let performanceIndex = hasUpcomingPerformance ? 1 : 0;
      while (performanceIndex < show.performances.length) {
        const priorPerformance = generatePriorPerformance(show.performances[performanceIndex]);
        priorPerformancesList.append(priorPerformance);
        performanceIndex++;
      }

      mainElement.append(priorPerformances);
    }
  } else {
    mainElement.innerHTML = "This show has no performances";
  }
} else {
  mainElement.innerHTML = "Show not found";
}