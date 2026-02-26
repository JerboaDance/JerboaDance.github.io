const fs = require('fs');
const path = require('path');

// Read the database file
const databasePath = path.join(__dirname, '../docs/scripts/database.js');
const databaseContent = fs.readFileSync(databasePath, 'utf8');

// Parse show IDs and names from database
const showsMatch = databaseContent.match(/const shows = \{([\s\S]*?)\n\};/);
const showsData = {};
if (showsMatch) {
  const showsSection = showsMatch[1];
  
  // Match each show block: showId: { id: 'showId', name: 'Name', ...
  const showBlocks = showsSection.match(/\s\s(\w+):\s*\{[\s\S]*?\n\s\s\}/g);
  
  if (showBlocks) {
    showBlocks.forEach(block => {
      // Extract show ID from the start of the block
      const idMatch = block.match(/^\s\s(\w+):\s*\{/);
      if (idMatch) {
        const showId = idMatch[1];
        
        // Extract name - look for name: followed by quotes, capture everything between quotes
        const nameMatch = block.match(/\n\s+name:\s*['"`](.*?)['"`],?\n/);
        if (nameMatch) {
          showsData[showId] = {
            id: showId,
            name: nameMatch[1],
          };
        }
      }
    });
  }
}

const showIds = Object.keys(showsData);

// Template for show pages - matches the existing NoMatter.html structure
const showPageTemplate = (showName) => `<html>
  <head>
    <meta http-equiv='content-language' content='en-US'>
    <link rel="icon" type="image/png" href="/assets/logos/logo-black.jpg" />
    <link rel="stylesheet" href="/css/main.css"/>
    <title>${showName} - Acrobatic Contemporary Dance | Jerboa Dance</title>
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
        findCurrentPerformanceOfShow,
        checkForPriorPerformances
      } from "/scripts/shows.js";
      import generateYouTubeEmbed from "/scripts/youTube.js"
      import { getShowImageUrl } from "/scripts/urls.js"
      

      function populateCurrentPerformance(show, currentPerformance) {
        const { dates, venue, eventbriteId, ticketTiers, showtimes, emcee, highlights, companyMembers } = currentPerformance;

        const datesElement = document.getElementById("currentDates");
        datesElement.innerText = dates;

        const venueElement = document.getElementById("currentVenue");
        populateVenue(venueElement, venue);

        const eventbriteElement = document.getElementById("currentBptWidget");
        populateEventbriteWidget(eventbriteElement, eventbriteId);

        const descriptionElement = document.getElementById("currentDescription");
        descriptionElement.innerHTML = show.description;

        const ticketTierListElement = document.getElementById("currentTicketTiers");
        populateTicketTiers(ticketTierListElement, ticketTiers);

        const showtimesListElement = document.getElementById("currentShowtimes")
        populateShowtimes(showtimesListElement, showtimes);

        const castListElement = document.getElementById("currentCastList");
        populateCastList(castListElement, emcee, highlights, companyMembers);
      }

      function populatePriorPerformances(priorPerformanceListElement, show) {
        const template = document.getElementById("priorPerformanceTemplate");
        show.performances?.forEach(performance => {
          if (performance.endDate < Date.now()) {
            const { dates, venue, emcee, highlights, companyMembers } = performance;
            const priorPerformanceElement = template.content.firstElementChild.cloneNode(true);
            priorPerformanceListElement.append(priorPerformanceElement);

            const datesElement = priorPerformanceElement.querySelector(".show-dates")
            datesElement.innerText = dates;

            const venueElement = priorPerformanceElement.querySelector('a[name="venue"]')
            populateVenue(venueElement, venue);

            const castListElement = priorPerformanceElement.querySelector(".cast-list")
            populateCastList(castListElement, emcee, highlights, companyMembers);
          }
        });
      }
      
      function populatePhotoGallery(photoGalleryElement, show) {
        if (show.photos?.length > 0) {
          const modal = document.getElementById("modal");
          const fullsizeImage = document.getElementById("fullsizeImage");
          const closeButton = document.getElementById("closeButton");
          const photoCredit = document.getElementById("photoCredit");
          modal.onclick = function(event) {
            if (event.target === modal || event.target === closeButton) {
              modal.style.display = "none";
              photoCredit.innerHTML = "";
            }
          }

          const showSlide = (photoIndex) => {
            const photo = show.photos[photoIndex];

            modal.style.display = "block";
            fullsizeImage.src = getShowImageUrl(show, show.photos[photoIndex].filename);
            fullsizeImage.setAttribute('photoIndex', photoIndex);

            if (photo.photographer?.url) {
              photoCredit.innerHTML = \`Photograph by <a href=\${photo.photographer.url}>\${photo.photographer.name}</a>\`;
            } else if (photo.photographer) {
              photoCredit.innerText = \`Photograph by \${photo.photographer.name}\`;
            }
          }

          for (let photoIndex = 0; photoIndex < show.photos.length; photoIndex++) {
            const imageElement = document.createElement("img");
            imageElement.src = getShowImageUrl(show, show.photos[photoIndex].thumbnailFilename);
            imageElement.loading = "lazy"; // TODO - this doesn't seem to work because of the flexbox layout; find an alternate solution? 
            imageElement.className = "photo-gallery-thumbnail";
            imageElement.onclick = showSlide.bind(this, [photoIndex]);
            photoGalleryElement.append(imageElement);
          }
          
          const previousButton = document.getElementById("previousPhoto");
          previousButton.onclick = (event) => {
            const photoIndex = parseInt(fullsizeImage.getAttribute("photoIndex"));
            let previousPhotoIndex = photoIndex - 1;
            previousPhotoIndex = (previousPhotoIndex < 0) ? show.photos.length - 1 : previousPhotoIndex;
            showSlide(previousPhotoIndex);
            event.cancelBubble = true;
          }
          
          const nextButton = document.getElementById("nextPhoto");
          nextButton.onclick = (event) => {
            const photoIndex = parseInt(fullsizeImage.getAttribute("photoIndex"));
            let nextPhotoIndex = photoIndex + 1;
            nextPhotoIndex = (nextPhotoIndex >= show.photos.length) ? 0 : nextPhotoIndex;
            showSlide(nextPhotoIndex);
            event.cancelBubble = true;
          }
        } else {
          photoGalleryElement.hidden = true;
        }
      }

      function populatePage() {
        const url = new URL(document.location);
        const pagePaths = url.pathname.split("/");
        const showId = pagePaths[pagePaths.length - 1].split(".")[0].toLowerCase();

        const mainElement = document.getElementById("main");

        // check for valid show
        if (showId && shows[showId]) {
          const show = shows[showId];
          
          const title = document.querySelector('title');
          title.innerText = \`\${show.name} - Acrobatic Contemporary Dance | Jerboa Dance\`;

          const headerImage = document.getElementById("headerImage");
          populateHeaderImage(headerImage, show);
          
          const nameElement = document.getElementById("name");
          nameElement.innerText = show.name;

          if (show.performances?.length > 0){
            const currentPerformance = findCurrentPerformanceOfShow(show);
            const hasPriorPerformances = checkForPriorPerformances(show);

            const currentPerformanceElement = document.getElementById("currentPerformance");
            if (currentPerformance) {
              populateCurrentPerformance(show, currentPerformance);
            } else {
              currentPerformanceElement.hidden = true;
              const descriptionElement = document.getElementById("priorPerformancesDescription");
              descriptionElement.innerHTML = show.description;
            }

            if (hasPriorPerformances) {

              if (currentPerformance) {
                const priorPerformancesHeadingElement = document.getElementById("priorPerformancesHeading");
                priorPerformancesHeadingElement.hidden = false;
              }
              
              const priorPerformanceListElement = document.getElementById("priorPerformancesList")
              populatePriorPerformances(priorPerformanceListElement, show);
            }

            /*
            if (show.videos && show.videos.length > 0){
              console.log(JSON.stringify(show.videos))
              show.videos.forEach(video => {
                const teaserVideo = document.createElement("div")
                teaserVideo.setAttribute("class", "performance-clip");
                teaserVideo.append(generateYouTubeEmbed({ id: video.id, aspectRatio:video.aspectRatio}));
                mainElement.append(teaserVideo);
              })
            }
            */

            if (show.photos?.length > 0) {
              const photoGalleryElement = document.getElementById("photoGallery");
              populatePhotoGallery(photoGalleryElement, show);
            }

          } else {
            mainElement.innerHTML = "This show has no performances";
          }
        } else {
          mainElement.innerHTML = "Show not found";
        }
      }

      populatePage();
    </script>

  </head>
  <body>
    <div class="bodyWrapper">
      <header id="header"></header>
      <div class="header-image"><img id="headerImage" /></div>
      <main id="main">
        <h1 id="name"></h1>

        <div id="currentPerformance">
          <h3 class="venue"><a id="currentVenue"></a></h3>
          <div id="currentBptWidget" class="tickets"></div>
          <p id="currentDescription"></p>
          <h2 id="currentDates" class="show-dates"></h2>
          <ul id="currentShowtimes" class="show-times"></ul>
          <ul id="currentTicketTiers" class="ticket-tiers"></ul>
          <ul id="currentCastList" class="cast-list"></ul>
        </div>

        <div id="priorPerformances">
          <p id="priorPerformancesDescription"></p>
          <h2 id="priorPerformancesHeading" hidden>Prior Performances</h2>
          <ul id="priorPerformancesList">
            <template id="priorPerformanceTemplate">
              <li>
                <h2 class="show-dates"></h2>
                <h3 class="venue"><a name="venue"></a></h3>
                <ul class="cast-list"></ul>
              </li>
            </template>
          </ul>
        </div>

        <div id="showVideos"></div>

        <div id="photoGallery" class="photo-gallery">
          <!-- The Modal -->
          <div id="modal" class="modal">
            <span id="closeButton" class="modal-close">&times;</span>
            <span id="previousPhoto" class="modal-prev-photo">&#10094;</span>
            <span id="nextPhoto" class="modal-next-photo">&#10095;</span>
            <img id="fullsizeImage" class="modal-content" />
            <div id="photoCredit" class="modal-photo-credit"></div>
          </div>
        </div>

      </main>
      <footer id="footer"></footer>
    </div>
  </body>
</html>
`;

// Helper to capitalize first letter of each word (for matching performances/ files)
function capitalizeFileName(id) {
  return id
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Mapping of lowercase show IDs to their Title Case equivalents in performances/
const performancesFileMap = {
  'nomatter': 'NoMatter.html',
  'flux': 'Flux.html',
  'fractured': 'Fractured.html',
  'unhinge': 'Unhinge.html',
  'delirium': 'Delirium.html',
  'moxie': 'Moxie.html',
  'reconstruct': 'reconstruct.html',
  'embrace': 'Embrace.html',
  'animalnature': 'AnimalNature.html',
  'continuum': 'continuum.html',
  'transformation': 'Transformation.html',
  'luminous': 'Luminous.html',
  'genderallyspeaking': 'GenderallySpeaking.html',
  'backfromthebrink': 'BackFromTheBrink.html',
};

const showsDir = path.join(__dirname, '../docs/shows');
const performancesDir = path.join(__dirname, '../docs/performances');

// Create shows directory if it doesn't exist
if (!fs.existsSync(showsDir)) {
  fs.mkdirSync(showsDir, { recursive: true });
}

console.log('Generating show pages in /shows/ directory...\n');

const generatedFiles = [];

showIds.forEach((showId) => {
  const lowercaseFilename = `${showId}.html`;
  const filePath = path.join(showsDir, lowercaseFilename);
  const showName = showsData[showId].name;
  
  // Generate the new lowercase file with show-specific title
  const pageContent = showPageTemplate(showName);
  fs.writeFileSync(filePath, pageContent);
  console.log(`  ✓ Created shows/${lowercaseFilename} (${showName})`);
  generatedFiles.push({ showId, filename: lowercaseFilename });
});

console.log(`\n✅ Generated ${showIds.length} show pages\n`);

// Validation: Compare generated files with originals
console.log('Validating generated files against performances/ originals...\n');

const mismatches = [];

generatedFiles.forEach(({ showId, filename }) => {
  const newFilePath = path.join(showsDir, filename);
  const oldFilename = performancesFileMap[showId];
  
  if (!oldFilename) {
    console.log(`  ⚠️  No mapping found for ${showId}`);
    return;
  }
  
  const oldFilePath = path.join(performancesDir, oldFilename);
  
  if (!fs.existsSync(oldFilePath)) {
    console.log(`  ⚠️  Original file not found: performances/${oldFilename}`);
    mismatches.push({
      showId,
      reason: 'Original file not found',
      expected: oldFilename
    });
    return;
  }
  
  const newContent = fs.readFileSync(newFilePath, 'utf8');
  const oldContent = fs.readFileSync(oldFilePath, 'utf8');
  
  if (newContent === oldContent) {
    console.log(`  ✓ shows/${filename} matches performances/${oldFilename}`);
  } else {
    console.log(`  ❌ shows/${filename} DOES NOT match performances/${oldFilename}`);
    mismatches.push({
      showId,
      newFile: `shows/${filename}`,
      oldFile: `performances/${oldFilename}`,
      reason: 'Content differs'
    });
  }
});

if (mismatches.length > 0) {
  console.log('\n⚠️  MISMATCHES DETECTED:\n');
  mismatches.forEach(mismatch => {
    console.log(`  - ${mismatch.showId}:`);
    console.log(`    Reason: ${mismatch.reason}`);
    if (mismatch.newFile) {
      console.log(`    New: ${mismatch.newFile}`);
      console.log(`    Old: ${mismatch.oldFile}`);
    }
  });
} else {
  console.log('\n✅ All files match their performances/ equivalents!');
}