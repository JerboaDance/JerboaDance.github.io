#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import database to get all performers
const { companyMembers, highlights } = require('../docs/scripts/database.js');

const DOCS_DIR = path.join(__dirname, '../docs');
const COMPANY_DIR = path.join(DOCS_DIR, 'company');
const FEATURED_DIR = path.join(DOCS_DIR, 'featured');

// Helper to capitalize filename (matches old convention)
function capitalizeFileName(id) {
  return id
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Create redirect HTML
function createRedirect(newPath) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${newPath}">
  <link rel="canonical" href="${newPath}" />
  <script>window.location.href = "${newPath}";</script>
</head>
<body>
  <p>Redirecting to <a href="${newPath}">${newPath}</a>...</p>
</body>
</html>`;
}

console.log('Creating redirect files for old performer URLs...\n');

let companyCount = 0;
let featuredCount = 0;

// Create redirects for company members
Object.keys(companyMembers).forEach((memberId) => {
  const member = companyMembers[memberId];
  if (!member.suppressPage) {
    const oldFileName = capitalizeFileName(memberId);
    const oldPath = path.join(COMPANY_DIR, `${oldFileName}.html`);
    const newPath = `/performers/${memberId}.html`;
    
    // Only create redirect if the old file exists
    if (fs.existsSync(oldPath)) {
      fs.writeFileSync(oldPath, createRedirect(newPath));
      console.log(`  ✓ Created redirect company/${oldFileName}.html → ${newPath}`);
      companyCount++;
    }
  }
});

// Create redirects for highlights
Object.keys(highlights).forEach((highlightId) => {
  const highlight = highlights[highlightId];
  if (highlight.bio) {
    const oldPath = path.join(FEATURED_DIR, `${highlightId}.html`);
    const newPath = `/performers/${highlightId}.html`;
    
    // Only create redirect if the old file exists
    if (fs.existsSync(oldPath)) {
      fs.writeFileSync(oldPath, createRedirect(newPath));
      console.log(`  ✓ Created redirect featured/${highlightId}.html → ${newPath}`);
      featuredCount++;
    }
  }
});

console.log(`\n✅ Created ${companyCount} redirect files in company/`);
console.log(`✅ Created ${featuredCount} redirect files in featured/`);
console.log(`\nAll old performer URLs now redirect to the new /performers/ directory!`);