import { companyMembers, highlights, shows } from '../docs/scripts/database.js';
import { populateCastList, findCurrentShow } from '../docs/scripts/shows.js';

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
      expect(currentShow).toBeUndefined();
    }
  } finally {
    now.mockRestore();
  }
});
