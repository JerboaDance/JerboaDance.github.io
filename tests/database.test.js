import * as database from '../docs/scripts/database.js';
import { existsSync } from 'node:fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { getHeadshotImageUrl, getShowImageUrl } from "../docs/scripts/urls.js"

function toBeValidString(actual) {
  if (typeof actual !== 'string') {
    return {
      pass: false,
      message: () => `expected ${this.utils.printReceived(actual)} to be ${this.utils.printExpected("a string")}`
    }
  } else if (!actual) {
    return {
      pass: false,
      message: () => `expected ${this.utils.printReceived(actual)} to be ${this.utils.printExpected("defined and non-null")}`
    }
  } else if (actual === "") {
    return {
      pass: false,
      message: () => `expected ${this.utils.printReceived(actual)} to be ${this.utils.printExpected("non-empty")}`
    }
  } else {
    return {
      pass: true,
      message: () => `expected ${this.utils.printReceived(actual)} not to be ${this.utils.printExpected("undefined, null, or empty")}`
    }
  }
}
expect.extend({toBeValidString});


function validatePhotographData(photograph) {
  // Headshot property is optional, but if present it must not be null and must have a filename
  expect(photograph).not.toBeNull();
  expect(photograph.filename).toBeValidString();

  if (photograph.photographer !== undefined) {
    // Photographer property is optional, but if present it must map to an existing photographer
    expect(photograph.photographer).not.toBeNull();
    expect(Object.values(database.photographers)).toContain(photograph.photographer);
  }
}

function checkAssetExists(assetPath) {
  const fullPath = path.join(__dirname, '../docs', assetPath);
  expect(existsSync(fullPath)).toBeTruthy();
}


test.each(Object.keys(database.venues))("venue id: %s", (venueId) => {
  const venue = database.venues[venueId];
  expect(venue.id).toEqual(venueId);
  expect(venue.name).toBeValidString();
  expect(venue.city).toBeValidString();
  expect(venue.url).toBeValidString(); // TODO check url is a url
});


test.each(Object.keys(database.photographers))("photographer id: %s", (photographerId) => {
  const photographer = database.photographers[photographerId];
  expect(photographer.id).toEqual(photographerId);
  expect(photographer.name).toBeValidString();
  if (photographer.url !== undefined) {
    expect(photographer.url).toBeValidString(); // TODO check url is a url
  }
});


test.each(Object.keys(database.companyMembers))("companyMember id: %s", (companyMemberId) => {
  const companyMember = database.companyMembers[companyMemberId];
  expect(companyMember.id).toEqual(companyMemberId);
  expect(companyMember.name).toBeValidString();

  if (companyMember.role !== undefined) {
    expect(companyMember.role).toBeValidString();
  }

  if (companyMember.headshot !== undefined) {
    validatePhotographData(companyMember.headshot);
    checkAssetExists(getHeadshotImageUrl(companyMember.headshot.filename));
  }
  // Bio is optional - site will replace with "No bio provided" when necessary
});


test.each(Object.keys(database.highlights))("highlight id: %s", (highlightId) => {
  const highlight = database.highlights[highlightId];
  expect(highlight.id).toEqual(highlightId);
  expect(highlight.name).toBeValidString();
  expect(highlight.role).toBeValidString();

  if (highlight.url !== undefined) {
    // url property is optional, but if present it must not be null
    expect(highlight.url).not.toBeNull(); // TODO check url is a url
    expect(highlight.headshot).toBeUndefined();
    expect(highlight.bio).toBeUndefined();
  } else if (highlight.bio !== undefined) {
    expect(highlight.bio).toBeValidString();
    if (highlight.headshot !== undefined) {
      validatePhotographData(highlight.headshot);
      checkAssetExists(getHeadshotImageUrl(highlight.headshot.filename));
    }
  } else {
    expect(highlight.headshot).toBeUndefined();
  }
});


test.each(Object.keys(database.shows))("show id: %s", (showId) => {
  const show = database.shows[showId];
  expect(show.id).toEqual(showId);
  expect(show.name).toBeValidString();
  expect(show.description).toBeValidString();
  validatePhotographData(show.headerImage);
  checkAssetExists(getShowImageUrl(show, show.headerImage.filename));

  // videos
  // TODO - when the videos are fixed

  // photos
  if (show.photos !== undefined) {
    expect(show.photo).not.toBeNull();
    show.photos.forEach(photo => {
      expect(photo.filename).toBeValidString();
      checkAssetExists(getShowImageUrl(show, photo.filename));
      expect(photo.thumbnailFilename).toBeValidString(); 
      checkAssetExists(getShowImageUrl(show, photo.thumbnailFilename));
    });
  }

  // performances
  show.performances.forEach(performance => {
    // Check date string
    expect(performance.dates).toBeValidString();
    
    // Check dates
    expect(performance.endDate.valueOf()).toBeGreaterThanOrEqual(performance.startDate.valueOf());

    // Check venue
    expect(Object.values(database.venues)).toContain(performance.venue);

    // Check emcee
    if (performance.emcee !== undefined) {
      expect(performance.emcee).not.toBeNull();
      expect(Object.values(database.highlights)).toContain(performance.emcee);
    }

    // Check highlights
    if (performance.highlights !== undefined) {
      expect(performance.highlights).not.toBeNull();
      performance.highlights.forEach(highlight => {
        expect(highlight).not.toBeNull();
        expect(Object.values(database.highlights)).toContain(highlight);
      })
    }

    // Check company members
    expect(performance.companyMembers).not.toBeNull();
    performance.companyMembers.forEach(companyMember => {
      expect(companyMember).not.toBeNull();
      expect(Object.values(database.companyMembers)).toContain(companyMember);
    })
    
    if (performance.legacy) {
      // Skip this data for performances prior to the website redesign because the data is missing
      expect(performance.showtimes).toBeUndefined();
      expect(performance.bptId).toBeUndefined();
      expect(performance.ticketTiers).toBeUndefined();
    } else {
      // Check showtimes
      expect(performance.showtimes).toBeDefined();
      expect(performance.showtimes).not.toBeNull();
      performance.showtimes.forEach(showtime => {
        expect(showtime).toBeValidString();
      });
      
      // Check bptId
      expect(performance.bptId).toBeDefined();
      expect(performance.bptId).not.toBeNull();
      expect(typeof performance.bptId).toEqual('number');

      // Check ticketTiers
      expect(performance.ticketTiers).toBeDefined();
      expect(performance.ticketTiers).not.toBeNull();
      performance.ticketTiers.forEach(ticketTier => {
        expect(ticketTier.name).toBeValidString();
        expect(ticketTier.description).toBeValidString();
      });
    }
  });
});