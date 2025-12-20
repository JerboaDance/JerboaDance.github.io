/* eslint-disable no-console */
import { writeFile, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import format from 'xml-formatter';

import { shows, companyMembers, highlights } from '../docs/scripts/database.js';
import { findCurrentShow } from '../docs/scripts/shows.js';
import {
  getShowUrl,
} from '../docs/scripts/urls.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const priorities = {
  urgent: 1.0,
  important: 0.7,
  nonUrgent: 0.2,
};

// Helper function to capitalize first letter of each word for file names
function capitalizeFileName(id) {
  return id
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Helper function to get company member bio URL (direct HTML file or fallback)
function getCompanyMemberBioUrlForSitemap(companyMember) {
  const fileName = capitalizeFileName(companyMember.id);
  const htmlPath = path.join(__dirname, '../docs/company', `${fileName}.html`);
  
  if (existsSync(htmlPath)) {
    return `/company/${fileName}.html`;
  }
  
  console.warn(`Warning: HTML file not found for company member "${companyMember.name}" (${companyMember.id}). Expected: ${htmlPath}`);
  return `/castMember.html?companyMemberId=${companyMember.id}`;
}

// Helper function to get highlight bio URL (direct HTML file or fallback)
function getHighlightBioUrlForSitemap(highlight) {
  // Check if highlight should use company member page
  if (highlight.useCompanyMemberPage) {
    const fileName = capitalizeFileName(highlight.id);
    const htmlPath = path.join(__dirname, '../docs/company', `${fileName}.html`);
    
    if (existsSync(htmlPath)) {
      return `/company/${fileName}.html`;
    }
    
    console.warn(`Warning: HTML file not found for highlight "${highlight.name}" (${highlight.id}). Expected: ${htmlPath}`);
    return `/castMember.html?highlightId=${highlight.id}`;
  }
  
  // Otherwise check featured directory
  const fileName = highlight.id;
  const htmlPath = path.join(__dirname, '../docs/featured', `${fileName}.html`);
  
  if (existsSync(htmlPath)) {
    return `/featured/${fileName}.html`;
  }
  
  console.warn(`Warning: HTML file not found for highlight "${highlight.name}" (${highlight.id}). Expected: ${htmlPath}`);
  return `/castMember.html?highlightId=${highlight.id}`;
}

// An array with your links
const links = [
  { url: '/index.html', priority: priorities.urgent },
  { url: '/About.html', priority: priorities.important },
];

const { currentShow, currentPerformance } = findCurrentShow(shows);
Object.keys(shows).forEach((showId) => {
  const priority = (currentShow?.id === showId) ? priorities.urgent : priorities.nonUrgent;
  links.push({ url: getShowUrl(shows[showId]), priority });
});

const currentCompanyMembers = currentPerformance?.companyMembers;
Object.keys(companyMembers).forEach((companyMemberId) => {
  const companyMember = companyMembers[companyMemberId];
  if (!companyMember.suppressPage) {
    const isCurrent = !!(currentCompanyMembers?.find(
      (currentCompanyMember) => currentCompanyMember.id === companyMember.id,
    ));
    const priority = isCurrent ? priorities.urgent : priorities.nonUrgent;
    links.push({ url: getCompanyMemberBioUrlForSitemap(companyMember), priority });
  }
});

const currentHighlights = currentPerformance?.highlights;
Object.keys(highlights).forEach((highlightId) => {
  const highlight = highlights[highlightId];
  if (highlight.bio) {
    const isCurrent = !!(currentHighlights?.find(
      (currentHighlight) => currentHighlight.id === highlight.id,
    ));
    const isCurrentEmcee = currentPerformance?.emcee === highlight;
    const priority = isCurrent || isCurrentEmcee ? priorities.urgent : priorities.nonUrgent;
    links.push({ url: getHighlightBioUrlForSitemap(highlight), priority });
  }
});

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://jerboadance.com' });

// Return a promise that resolves with your XML string
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  const sitemap = format(data.toString());
  const sitemapFilepath = path.join(__dirname, '../docs/sitemap.xml');
  writeFile(sitemapFilepath, sitemap, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Wrote update sitemap to ${sitemapFilepath}`);
    }
  });
});
