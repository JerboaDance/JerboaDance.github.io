const fs = require('fs');
const path = require('path');

// Read the database file
const databasePath = path.join(__dirname, '../docs/scripts/database.js');
const databaseContent = fs.readFileSync(databasePath, 'utf8');

// Parse show IDs from database
const showsMatch = databaseContent.match(/const shows = \{([\s\S]*?)\n\};/);
const showIds = [];
if (showsMatch) {
  const showsSection = showsMatch[1];
  const lines = showsSection.split('\n');
  for (const line of lines) {
    const match = line.match(/^\s\s(\w+):\s*\{/);
    if (match) {
      showIds.push(match[1]);
    }
  }
}

// Template for show pages
const showPageTemplate = (showId) => `<html>
  <head>
    <meta http-equiv='content-language' content='en-US'>
    <link rel="icon" type="image/png" href="/assets/logos/logo-black.jpg" />
    <link rel="stylesheet" href="/css/main.css"/>
    <title>Jerboa Dance</title>
    <script src="/scripts/common.js" type="module"></script>
    <script type="module">
      import { shows } from "/scripts/database.js";
      import { 
        populateHeaderImage,
        populateVenue,
        populateEventbriteWidget,
        populateTicketTiers,
        populateShowtimes,
        populateCastList,
        populatePhotoGallery,
        populateVideos,
      } from "/scripts/shows.js";

      const showId = "${showId}";
      const show = shows[showId];

      if (!show) {
        document.body.innerHTML = '<h1>Show not found</h1>';
      } else {
        const performance = show.performances?.[0];
        if (performance) {
          const { dates, venue, eventbriteId, ticketTiers, showtimes, emcee, highlights, companyMembers } = performance;

          const headerImage = document.getElementById("headerImage");
          populateHeaderImage(headerImage, show);
          
          const eventbriteElement = document.getElementById("bptWidget");
          if (eventbriteId) {
            populateEventbriteWidget(eventbriteElement, eventbriteId);
          }

          const nameElement = document.getElementById("name");
          nameElement.innerText = show.name;

          const datesElement = document.getElementById("dates");
          datesElement.innerText = dates;

          const venueElement = document.getElementById("venue");
          populateVenue(venueElement, venue);

          const descriptionElement = document.getElementById("description");
          descriptionElement.innerHTML = show.description;

          if (ticketTiers) {
            const ticketTierListElement = document.getElementById("ticketTiers");
            populateTicketTiers(ticketTierListElement, ticketTiers);
          }

          if (showtimes) {
            const showtimesListElement = document.getElementById("showtimes");
            populateShowtimes(showtimesListElement, showtimes);
          }

          const castListElement = document.getElementById("castList");
          populateCastList(castListElement, emcee, highlights, companyMembers);
        }

        const photoGalleryElement = document.getElementById("photos");
        populatePhotoGallery(photoGalleryElement, show);

        const videosElement = document.getElementById("videos");
        populateVideos(videosElement, show);
      }
    </script>
  </head>
  <body>
    <div class="bodyWrapper">
      <header id="header"></header>
      <div class="header-image"><img id="headerImage" /></div>
      <main>
        <h1 id="name"></h1>
        <h2 id="dates" class="show-dates"></h2>
        <h3 class="venue"><a id="venue"></a></h3>
        <div id="bptWidget" class="tickets"></div>
        <p id="description"></p>
        <ul id="ticketTiers" class="ticket-tiers"></ul>
        <ul id="showtimes" class="show-times"></ul>
        <ul id="castList" class="cast-list"></ul>
        <div id="photos"></div>
        <div id="videos"></div>
      </main>
      <footer id="footer"></footer>
    </div>
  </body>
</html>
`;

// Template for redirect stub files
const redirectTemplate = (newUrl, title) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0;url=${newUrl}">
  <link rel="canonical" href="https://jerboadance.com${newUrl}">
  <script>window.location.href="${newUrl}";</script>
</head>
<body>
  <p>This page has moved. Redirecting to <a href="${newUrl}">${title}</a>...</p>
</body>
</html>
`;

// Mapping of old filenames to new (lowercase) filenames
const filenameMap = {
  'Flux.html': 'flux.html',
  'AnimalNature.html': 'animalnature.html',
  'BackFromTheBrink.html': 'backfromthebrink.html',
  'Delirium.html': 'delirium.html',
  'Embrace.html': 'embrace.html',
  'Fractured.html': 'fractured.html',
  'GenderallySpeaking.html': 'genderallyspeaking.html',
  'Luminous.html': 'luminous.html',
  'Moxie.html': 'moxie.html',
  'NoMatter.html': 'nomatter.html',
  'Transformation.html': 'transformation.html',
  'Unhinge.html': 'unhinge.html',
  'Reconstruct.html': 'reconstruct.html',
  // These are already lowercase
  'continuum.html': 'continuum.html',
  'reconstruct.html': 'reconstruct.html',
};

const performancesDir = path.join(__dirname, '../docs/performances');
if (!fs.existsSync(performancesDir)) {
  fs.mkdirSync(performancesDir, { recursive: true });
}

console.log('Generating show pages...');
const generatedFiles = new Set();

showIds.forEach((showId) => {
  const lowercaseFilename = `${showId}.html`;
  const filePath = path.join(performancesDir, lowercaseFilename);
  
  // Generate the new lowercase file
  fs.writeFileSync(filePath, showPageTemplate(showId));
  console.log(`  ✓ Created ${lowercaseFilename}`);
  generatedFiles.add(lowercaseFilename);
});

console.log('\nCreating redirect stubs for renamed files...');
Object.entries(filenameMap).forEach(([oldFilename, newFilename]) => {
  // Only create redirect if names are different (case change)
  if (oldFilename !== newFilename) {
    const oldFilePath = path.join(performancesDir, oldFilename);
    const newUrl = `/performances/${newFilename}`;
    
    // Check if this is just a case change
    if (oldFilename.toLowerCase() === newFilename.toLowerCase()) {
      // On case-insensitive filesystems, we can't have both files
      // The lowercase version already exists with correct content
      // Skip creating the redirect
      console.log(`  ⚠️  Skipping redirect ${oldFilename} (case-insensitive filesystem)`);
    } else if (!generatedFiles.has(oldFilename)) {
      fs.writeFileSync(oldFilePath, redirectTemplate(newUrl, newFilename.replace('.html', '')));
      console.log(`  ✓ Created redirect ${oldFilename} → ${newFilename}`);
    }
  }
});

console.log('\n✅ Show page generation complete!');
console.log(`Generated ${showIds.length} show pages with lowercase filenames`);