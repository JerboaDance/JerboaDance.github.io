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
  
  // Match each show block
  const showBlocks = showsSection.match(/\s\s(\w+):\s*\{[\s\S]*?\n\s\s\}/g);
  
  if (showBlocks) {
    showBlocks.forEach(block => {
      const idMatch = block.match(/^\s\s(\w+):\s*\{/);
      if (idMatch) {
        const showId = idMatch[1];
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

// Template for redirect files
const redirectTemplate = (showName, newUrl) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting to ${showName}...</title>
  <meta http-equiv="refresh" content="0;url=${newUrl}">
  <link rel="canonical" href="https://jerboadance.com${newUrl}">
  <script>window.location.href="${newUrl}";</script>
</head>
<body>
  <p>This page has moved to <a href="${newUrl}">${showName}</a>. Redirecting...</p>
</body>
</html>
`;

// Mapping of lowercase show IDs to their Title Case equivalents in performances/
const performancesFileMap = {
  nomatter: 'NoMatter.html',
  flux: 'Flux.html',
  fractured: 'Fractured.html',
  unhinge: 'Unhinge.html',
  delirium: 'Delirium.html',
  moxie: 'Moxie.html',
  reconstruct: 'reconstruct.html',
  embrace: 'Embrace.html',
  animalnature: 'AnimalNature.html',
  continuum: 'continuum.html',
  transformation: 'Transformation.html',
  luminous: 'Luminous.html',
  genderallyspeaking: 'GenderallySpeaking.html',
  backfromthebrink: 'BackFromTheBrink.html',
};

const performancesDir = path.join(__dirname, '../docs/performances');

console.log('Creating redirect files in performances/ directory...\n');

let redirectCount = 0;

Object.keys(showsData).forEach((showId) => {
  const performanceFilename = performancesFileMap[showId];
  
  if (!performanceFilename) {
    console.log(`  ⚠️  No mapping found for ${showId}`);
    return;
  }
  
  const performanceFilePath = path.join(performancesDir, performanceFilename);
  const newUrl = `/shows/${showId}.html`;
  const showName = showsData[showId].name;
  
  // Create redirect file
  const redirectContent = redirectTemplate(showName, newUrl);
  fs.writeFileSync(performanceFilePath, redirectContent);
  
  console.log(`  ✓ Created redirect performances/${performanceFilename} → ${newUrl}`);
  redirectCount++;
});

console.log(`\n✅ Created ${redirectCount} redirect files in performances/`);
console.log('\nAll old performance URLs now redirect to the new /shows/ directory!');