/* eslint-disable no-console */
import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import format from 'xml-formatter';

import { shows, companyMembers, highlights } from '../docs/scripts/database.js';
import { findCurrentShow } from '../docs/scripts/shows.js';
import {
  getShowUrl,
  getCompanyMemberBioUrl,
  getHighlightBioUrl,
} from '../docs/scripts/urls.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const priorities = {
  urgent: 1.0,
  important: 0.7,
  nonUrgent: 0.2,
};

// An array with your links
const links = [
  { url: '', priority: priorities.urgent },
  { url: '/index.html', priority: priorities.urgent },
  { url: '/about.html', priority: priorities.important },
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
    links.push({ url: getCompanyMemberBioUrl(companyMember), priority });
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
    links.push({ url: getHighlightBioUrl(highlight), priority });
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
