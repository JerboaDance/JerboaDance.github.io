const fs = require('fs');
const path = require('path');

// Read the database file
const databasePath = path.join(__dirname, '../docs/scripts/database.js');
const databaseContent = fs.readFileSync(databasePath, 'utf8');

// Parse companyMembers from database
const companyMembersMatch = databaseContent.match(/const companyMembers = \{([\s\S]*?)\n\};/);
const companyMembersData = {};
if (companyMembersMatch) {
  const section = companyMembersMatch[1];
  const blocks = section.match(/\s\s(\w+):\s*\{[\s\S]*?\n\s\s\}/g);
  
  if (blocks) {
    blocks.forEach(block => {
      const idMatch = block.match(/^\s\s(\w+):\s*\{/);
      if (idMatch) {
        const id = idMatch[1];
        const nameMatch = block.match(/\n\s+name:\s*['"`](.*?)['"`],?\n/);
        if (nameMatch) {
          companyMembersData[id] = {
            id: id,
            name: nameMatch[1],
            type: 'company'
          };
        }
      }
    });
  }
}

// Parse highlights from database
const highlightsMatch = databaseContent.match(/const highlights = \{([\s\S]*?)\n\};/);
const highlightsData = {};
if (highlightsMatch) {
  const section = highlightsMatch[1];
  const blocks = section.match(/\s\s(\w+):\s*\{[\s\S]*?\n\s\s\}/g);
  
  if (blocks) {
    blocks.forEach(block => {
      const idMatch = block.match(/^\s\s(\w+):\s*\{/);
      if (idMatch) {
        const id = idMatch[1];
        const nameMatch = block.match(/\n\s+name:\s*['"`](.*?)['"`],?\n/);
        if (nameMatch) {
          highlightsData[id] = {
            id: id,
            name: nameMatch[1],
            type: 'highlight'
          };
        }
      }
    });
  }
}

// Combine both into a single performers object
const performersData = { ...companyMembersData, ...highlightsData };
const performerIds = Object.keys(performersData);

console.log(`Found ${Object.keys(companyMembersData).length} company members`);
console.log(`Found ${Object.keys(highlightsData).length} highlights`);
console.log(`Total: ${performerIds.length} performers\n`);

// Template for performer pages
const performerPageTemplate = (performerName) => `<html>
  <head>
    <meta http-equiv='content-language' content='en-US'>
    <link rel="icon" type="image/png" href="/assets/logos/logo-black.jpg" />
    <link rel="stylesheet" href="/css/main.css"/>
    <title>${performerName} - Acrobatic Contemporary Dance | Jerboa Dance</title>
    <script src="/scripts/common.js" type="module"></script>
    <script type="module">
      import { companyMembers, highlights} from "/scripts/database.js";
      import { getHeadshotImageUrl } from "/scripts/urls.js";
      const url = new URL(document.location);
      let castMember;

      const pagePaths = url.pathname.split("/");
      const companyMemberId = pagePaths[pagePaths.length - 1].split(".")[0].toLowerCase();
      if (companyMemberId) {
        castMember = companyMembers[companyMemberId];
        if (castMember) {  
          if (castMember?.suppressPage) {
            castMember = null;
          } 
        } else {
          castMember = highlights[companyMemberId];
        }
      }

      // check for valid cast member
      if (castMember) {        
        const title = document.querySelector('title');
        const name = document.getElementById("name");
        const role = document.getElementById("role");
        const bio = document.getElementById("bio");
        const headshot = document.getElementById("headshot");
        const photoCredit = document.getElementById("photoCredit");

        title.innerText = \`\${castMember.name} - Acrobatic Contemporary Dance | Jerboa Dance\`;

        name.innerText = castMember.name;
        
        if (castMember.bio) {
          bio.innerHTML = castMember.bio;
        } else {
          bio.innerText = "No bio provided"
        }

        if (castMember.role) {
          role.innerText = castMember.role;
        } else {
          role.hidden = true;
        }

        const filename = castMember.headshot?.filename ? castMember.headshot.filename : "default.png";
        headshot.setAttribute("src", \`\${getHeadshotImageUrl(filename)}\`);
        headshot.setAttribute("alt", \`Photograph of \${castMember.name}\`);
        
        if (castMember.headshot?.photographer) {
          const photographer = castMember.headshot.photographer;
          let innerHTML = "Photo credit: "
          if (photographer.url) {
            innerHTML += \`<a href="\${photographer.url}">\${photographer.name}</a>\`
          } else {
            innerHTML += photographer.name;
          }

          photoCredit.innerHTML = innerHTML;
        }

      } else {
        const main = document.getElementById("main");
        main.innerHTML = "Cast member not found";
      }
    </script>
  </head>
  <body>
    <div class="bodyWrapper">
      <header id="header"></header>
      <main id="main">
        <div class="bio-image">
            <img id="headshot" />
            <p id="photoCredit">
        </div>
        <div class="bio-title">
            <h1 id="name"></h1>
            <h2 id="role"></h2>  
        </div>  
        <p id="bio" class="bio"></p>
      </main>
      <footer id="footer"></footer>
    </div>
  </body>
</html>
`;

const performersDir = path.join(__dirname, '../docs/performers');
const companyDir = path.join(__dirname, '../docs/company');
const featuredDir = path.join(__dirname, '../docs/featured');

// Create performers directory if it doesn't exist
if (!fs.existsSync(performersDir)) {
  fs.mkdirSync(performersDir, { recursive: true });
}

console.log('Generating performer pages in /performers/ directory...\n');

const generatedFiles = [];

performerIds.forEach((performerId) => {
  const lowercaseFilename = `${performerId}.html`;
  const filePath = path.join(performersDir, lowercaseFilename);
  const performerName = performersData[performerId].name;
  
  // Generate the new lowercase file with performer-specific title
  const pageContent = performerPageTemplate(performerName);
  fs.writeFileSync(filePath, pageContent);
  
  const type = performersData[performerId].type;
  console.log(`  ✓ Created performers/${lowercaseFilename} (${performerName}) [${type}]`);
  generatedFiles.push({ 
    performerId, 
    filename: lowercaseFilename,
    name: performerName,
    type: type
  });
});

console.log(`\n✅ Generated ${performerIds.length} performer pages\n`);

// Validation: Compare generated files with originals
console.log('Validating generated files against company/ and featured/ originals...\n');

const mismatches = [];

generatedFiles.forEach(({ performerId, filename, name, type }) => {
  const newFilePath = path.join(performersDir, filename);
  
  // Determine which directory to check based on type
  const oldDir = type === 'company' ? companyDir : featuredDir;
  
  // Try to find the original file (check various case combinations)
  const possibleOldFiles = fs.readdirSync(oldDir).filter(f => 
    f.toLowerCase() === filename.toLowerCase()
  );
  
  if (possibleOldFiles.length === 0) {
    console.log(`  ⚠️  No original file found for ${performerId} in ${type}/`);
    mismatches.push({
      performerId,
      reason: 'Original file not found',
      type: type
    });
    return;
  }
  
  const oldFilePath = path.join(oldDir, possibleOldFiles[0]);
  
  const newContent = fs.readFileSync(newFilePath, 'utf8');
  const oldContent = fs.readFileSync(oldFilePath, 'utf8');
  
  if (newContent === oldContent) {
    console.log(`  ✓ performers/${filename} matches ${type}/${possibleOldFiles[0]}`);
  } else {
    console.log(`  ❌ performers/${filename} DOES NOT match ${type}/${possibleOldFiles[0]}`);
    mismatches.push({
      performerId,
      newFile: `performers/${filename}`,
      oldFile: `${type}/${possibleOldFiles[0]}`,
      reason: 'Content differs'
    });
  }
});

if (mismatches.length > 0) {
  console.log('\n⚠️  MISMATCHES DETECTED:\n');
  mismatches.forEach(mismatch => {
    console.log(`  - ${mismatch.performerId}:`);
    console.log(`    Reason: ${mismatch.reason}`);
    if (mismatch.newFile) {
      console.log(`    New: ${mismatch.newFile}`);
      console.log(`    Old: ${mismatch.oldFile}`);
    }
  });
  console.log(`\nTo see specific differences, run:`);
  console.log(`  diff docs/performers/{id}.html docs/company/{Id}.html`);
  console.log(`  diff docs/performers/{id}.html docs/featured/{id}.html`);
} else {
  console.log('\n✅ All files match their company/ or featured/ equivalents!');
}