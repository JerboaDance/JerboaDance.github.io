import { companyMembers, highlights } from '../docs/scripts/database.js';
import { populateCastList } from '../docs/scripts/shows.js';

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
