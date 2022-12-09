import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import format from 'xml-formatter';

import { shows, companyMembers, highlights, emcees } from '../src/scripts/database.js';
import { findCurrentShow } from '../src/scripts/shows.js'

const priorities = {
  urgent: 1.0,
  important: 0.7,
  nonUrgent: 0.2
}

// An array with your links
let links = [
  { url: '', priority: priorities.urgent },
  { url: '/index.html', priority: priorities.urgent },
  { url: '/about.html', priority: priorities.important },
];

const currentShow = findCurrentShow(shows);
Object.keys(shows).forEach(showId => {
  const priority = (currentShow?.id === showId) ? priorities.urgent : priorities.nonUrgent;
  links.push({ url: `/show.html?showId=${showId}`, priority});
});

const currentCompanyMembers = currentShow?.performances[0].companyMembers;
Object.keys(companyMembers).forEach(companyMemberId => {
  const companyMember = companyMembers[companyMemberId];
  if (companyMember.id) { // check against id to exclude folks like Kristen Kissel
    const isCurrentCompanyMember = !!(currentCompanyMembers?.find(currentCompanyMember => currentCompanyMember.id === companyMember.id));
    const priority = isCurrentCompanyMember ? priorities.urgent : priorities.nonUrgent;
    links.push({ url: `/castMember.html?companyMemberId=${companyMemberId}`, priority })
  }
});

Object.keys(emcees).forEach(emceeId => {
  const emcee = emcees[emceeId];
  if (emcee.bio) {
    const isCurrentEmcee = currentShow?.performances[0].emcee === emcee;
    const priority = isCurrentEmcee ? priorities.urgent : priorities.nonUrgent;
    links.push({ url: `/castMember.html?emceeId=${emceeId}`, priority })
  }
});

const currentHighlights = currentShow?.performances[0].highlights;
Object.keys(highlights).forEach(highlightId => {
  const highlight = highlights[highlightId];
  if (highlight.bio) {
    const isCurrentHighlight = !!(currentHighlights?.find(currentHighlight => currentHighlight.id === highlight.id));
    const priority = isCurrentHighlight ? priorities.urgent : priorities.nonUrgent;
    links.push({ url: `/castMember.html?highlightId=${highlightId}`, priority })
  }
});

// Create a stream to write to
const stream = new SitemapStream( { hostname: 'https://jerboadance.com' } )

// Return a promise that resolves with your XML string
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  const sitemap = format(data.toString());
  const sitemapFilepath = path.join(__dirname, '../src/sitemap.xml');
  writeFile(sitemapFilepath, sitemap, (err) => {
    if (err) return console.log(err);
    console.log(`Wrote update sitemap to ${sitemapFilepath}`);
  });
});

