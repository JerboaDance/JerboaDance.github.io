import { companyMembers, highlights, shows } from '../docs/scripts/database.js';
import {
  populateCastList,
  populateEventbriteWidget,
  populateHeaderImage,
  populateShowtimes,
  populateVenue,
  findCurrentPerformanceOfShow,
  findCurrentShow,
  checkForPriorPerformances,
} from '../docs/scripts/shows.js';
import { getShowUrl } from '../docs/scripts/urls.js';

const originalDocument = globalThis.document;

beforeAll(() => {
  globalThis.document = {
    createElement: () => ({
      innerHTML: '',
      children: [],
      append(child) {
        this.children.push(child);
      },
      setAttribute(name, value) {
        this[name] = value;
      },
    }),
  };
});

afterAll(() => {
  globalThis.document = originalDocument;
});

function renderHighlight(highlight) {
  const castList = document.createElement('ul');
  populateCastList(castList, null, [highlight], []);
  return castList.children[0].innerHTML;
}

test.each([
  ['seancalavan', 'seancalavan'],
  ['thomasphelan', 'thomasphelan'],
  ['jaimewaliczek', 'jaimewaliczek'],
  ['angelaharriell', 'angelaharriell'],
  ['seancalavanDragQueen', 'seancalavan'],
  ['andreasfetz', 'andreasfetz'],
  ['jenniferelder', 'jenniferelder'],
])('links the %s highlight to the %s company bio', (highlightId, companyMemberId) => {
  const highlight = highlights[highlightId];
  const html = renderHighlight(highlight);

  expect(html).toContain(`<h3>${highlight.role}</h3>`);
  expect(html).toContain(`<a href="/performers/${companyMemberId}.html">${highlight.name}</a>`);
});

test('links an emcee to their company bio', () => {
  const castList = document.createElement('ul');
  populateCastList(castList, highlights.seancalavan, [], []);

  expect(castList.children[0].innerHTML).toContain('<a href="/performers/seancalavan.html">Sean Calavan</a>');
});

test('links Jaime to the same bio under Choreographer and Company', () => {
  const castList = document.createElement('ul');
  populateCastList(castList, null, [highlights.jaimewaliczek], [companyMembers.jaimewaliczek]);
  const companyList = castList.children[1].children[0];
  const link = '<a href="/performers/jaimewaliczek.html">Jaime Waliczek</a>';

  expect(castList.children[0].innerHTML).toContain(link);
  expect(companyList.children[0].innerHTML).toBe(link);
});

test('keeps external URLs ahead of company bio links', () => {
  const highlight = { ...highlights.jaimewaliczek, url: 'https://example.com/' };

  expect(renderHighlight(highlight)).toContain('<a href="https://example.com/">Jaime Waliczek</a>');
});

test('keeps highlights with their own bio linked to their performer page', () => {
  expect(renderHighlight(highlights.brennaduffitt)).toContain('<a href="/performers/brennaduffitt.html">Brenna Duffitt</a>');
});

test('leaves highlights without a bio or company page as plain text', () => {
  expect(renderHighlight(highlights.splinterdance)).toBe('<h3>Dance company</h3> Splinter Dance');
});

test('does not link a suppressed company bio', () => {
  const highlight = {
    id: 'kristenkissel',
    name: companyMembers.kristenkissel.name,
    role: 'Guest',
    companyMember: companyMembers.kristenkissel,
  };

  expect(renderHighlight(highlight)).toBe('<h3>Guest</h3> Kristen Kissel');
});

test('renders the NYC rework with two choreographers and five company members', () => {
  const performance = shows.deliriumnyc.performances[0];
  const castList = document.createElement('ul');
  populateCastList(
    castList,
    performance.emcee,
    performance.highlights,
    performance.companyMembers,
  );

  expect(castList.children).toHaveLength(3);
  expect(castList.children[0].innerHTML).toBe('<h3>Choreographer</h3> <a href="/performers/jaimewaliczek.html">Jaime Waliczek</a>');
  expect(castList.children[1].innerHTML).toBe('<h3>Choreographer</h3> <a href="/performers/angelaharriell.html">Angela Harriell</a>');

  const companyList = castList.children[2].children[0];
  expect(companyList.children).toHaveLength(5);
  ['angelaharriell', 'christinajohnson', 'stellakutz', 'renadotozer', 'jaimewaliczek'].forEach((id, index) => {
    expect(companyList.children[index].innerHTML).toBe(`<a href="/performers/${id}.html">${companyMembers[id].name}</a>`);
  });
});

test.each([
  ['2026-10-28T00:00:00Z', true],
  ['2026-11-08T02:29:59Z', true],
  ['2026-11-08T02:30:01Z', false],
])('selects the NYC rework at %s only while upcoming or running', (time, isCurrent) => {
  const now = import.meta.jest.spyOn(Date, 'now').mockReturnValue(Date.parse(time));
  try {
    const { currentShow } = findCurrentShow(shows);
    if (isCurrent) {
      expect(currentShow?.id).toBe('deliriumnyc');
      expect(currentShow).not.toBe(shows.delirium);
    } else {
      expect(currentShow).toBe(shows.muse);
    }
  } finally {
    now.mockRestore();
  }
});

test('renders Muse with the known MC, guest, choreographer, and company', () => {
  const performance = shows.muse.performances[0];
  const castList = document.createElement('ul');
  populateCastList(
    castList,
    performance.emcee,
    performance.highlights,
    performance.companyMembers,
  );

  expect(castList.children).toHaveLength(4);
  expect(castList.children[0].innerHTML).toContain('Brenna Duffitt');
  expect(castList.children[1].innerHTML).toBe('<h3>Choreographer</h3> <a href="/performers/jaimewaliczek.html">Jaime Waliczek</a>');
  expect(castList.children[2].innerHTML).toContain('Emma Curtiss');
  const companyList = castList.children[3].children[0];
  expect(companyList.children).toHaveLength(7);
  ['stellakutz', 'constanzevillines', 'desireekong', 'alexandrakronz', 'laurandrackett', 'evelynbartlett', 'jaimewaliczek'].forEach((id, index) => {
    expect(companyList.children[index].innerHTML).toBe(`<a href="/performers/${id}.html">${companyMembers[id].name}</a>`);
  });
});

test('renders the five Muse times including the family matinee', () => {
  const showtimes = document.createElement('ul');
  populateShowtimes(showtimes, shows.muse.performances[0].showtimes);

  expect(showtimes.children.map((child) => child.innerText)).toEqual([
    '2/5 7:30pm Pacific',
    '2/6 7:30pm Pacific',
    '2/7 3:00pm Pacific (family matinee)',
    '2/12 7:30pm Pacific',
    '2/13 7:30pm Pacific',
  ]);
});

test('displays an undated performance without featuring it or treating it as past', () => {
  const show = shows.stackedcircus;

  expect(findCurrentPerformanceOfShow(show)).toBe(show.performances[0]);
  expect(checkForPriorPerformances(show)).toBe(false);
  expect(findCurrentShow({ stackedcircus: show })).toEqual({
    currentShow: undefined,
    currentPerformance: undefined,
  });
});

test('omits unknown venue, artwork, and company instead of showing placeholders', () => {
  const show = shows.stackedcircus;
  const performance = show.performances[0];
  const venue = document.createElement('a');
  const image = document.createElement('img');
  const castList = document.createElement('ul');

  populateVenue(venue, performance.venue);
  populateHeaderImage(image, show);
  populateCastList(castList, performance.emcee, performance.highlights, performance.companyMembers);

  expect(venue.hidden).toBe(true);
  expect(image.hidden).toBe(true);
  expect(image.src).toBeUndefined();
  expect(castList.children).toHaveLength(0);
});

test('shows a coming-soon message without attempting to load checkout when tickets are unknown', () => {
  const widget = document.createElement('div');
  populateEventbriteWidget(widget);

  expect(widget.innerText).toBe('Ticket link coming soon!');
  expect(widget.hidden).not.toBe(true);
  expect(widget.children).toHaveLength(0);
});

test('keeps the June URL when dates are filled in and the performance becomes eligible', () => {
  const original = shows.stackedcircus;
  const completed = {
    ...original,
    performances: [{
      ...original.performances[0],
      startDate: new Date('2027-06-05T19:30:00-07:00'),
      endDate: new Date('2027-06-06T00:00:00-07:00'),
    }],
  };
  const now = import.meta.jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2027-05-01T00:00:00Z'));
  try {
    expect(getShowUrl(completed)).toBe(getShowUrl(original));
    expect(getShowUrl(completed)).toBe('/shows/stackedcircus.html');
    expect(findCurrentShow({ stackedcircus: completed }).currentShow).toBe(completed);
  } finally {
    now.mockRestore();
  }
});

test.each([
  ['2027-02-14T07:59:59Z', 'muse'],
  ['2027-02-14T08:00:01Z', undefined],
])('respects the last Muse performance day at %s', (time, showId) => {
  const now = import.meta.jest.spyOn(Date, 'now').mockReturnValue(Date.parse(time));
  try {
    expect(findCurrentShow(shows).currentShow?.id).toBe(showId);
  } finally {
    now.mockRestore();
  }
});
