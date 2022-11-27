import { shows } from "/scripts/database.js";
import { generateBrownPaperTicketsWidget } from "/scripts/brownPaperTickets.js";

function generateHighlightElement(highlight) {
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
  castListElement.setAttribute("class", "class-list");

  performance.highlights.forEach(highlight => {
    const highlightElement = generateHighlightElement(highlight, /*showRole*/ true);
    castListElement.append(highlightElement);
  })

  const companyMembersElement = document.createElement("li");
  companyMembersElement.innerHTML ="<h3>Company</h3>";
  companyMembersElement.append(generateCompanyMembersList(performance));

  castListElement.append(companyMembersElement); 

  return castListElement;
}

function generatePerformance(parentElement, performance, isUpcoming) {
  const datesElement = document.createElement("h2");
  datesElement.setAttribute("class", "show-date");
  datesElement.innerText = performance.when;

  const venue = performance.venue;
  const venueElement = document.createElement("h3");
  venueElement.setAttribute("class", "venue");
  venueElement.innerHTML = `<a href="${venue.url}">${venue.name}, ${venue.city}</a>`;

  // For an upcoming show
  if (isUpcoming) {
    let bptElement;
    if (performance.bptId) {
      bptElement = document.createElement("div");
      bptElement.innerHTML = generateBrownPaperTicketsWidget(performance.bptId);
    }

    const showtimesElement = document.createElement("ul");
    // TODO fill in show times
  
    const castListElement = generateCastList(performance);
  
    parentElement.append(
      datesElement, 
      venueElement, 
      bptElement, 
      showtimesElement,
      castListElement
    );
  }
}

const url = new URL(document.location);
const showId = url.searchParams.get("showId");

const mainElement = document.getElementById("main");

// check for valid show
if (showId && shows[showId]) {
  const show = shows[showId];
  
  const nameElement = document.getElementById("name");
  nameElement.innerText = show.name;
  
  const descriptionElement = document.getElementById("showDescription");
  descriptionElement.innerHTML = show.description;

  generatePerformance(mainElement, show.performances[0], /* upcomingShow */ true);
} else {
  mainElement.innerHTML = "Show not found";
}