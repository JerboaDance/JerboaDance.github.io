import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SourceTextModule, SyntheticModule, createContext } from 'node:vm';
import { companyMembers, highlights, shows } from '../docs/scripts/database.js';
import { getHeadshotImageUrl } from '../docs/scripts/urls.js';
import getLegacyRedirect from '../docs/scripts/legacyRedirects.js';

const docsDirectory = fileURLToPath(new URL('../docs/', import.meta.url));

test.each([
  ['/company/JaimeWaliczek.html', '/performers/jaimewaliczek.html'],
  ['/company/jaimewaliczek.html', '/performers/jaimewaliczek.html'],
  ['/COMPANY/JAIMEWALICZEK.HTML', '/performers/jaimewaliczek.html'],
  ['/company/%4AaimeWaliczek.html', '/performers/jaimewaliczek.html'],
  ['/company/pamelaturpin.html', '/performers/pamelaturpin.html'],
  ['/company/IraEcho.html', '/performers/iraecho.html'],
  ['/company/Hanna-LeeSakakibara.html', '/performers/hannaleesakakibara.html'],
  ['/company/JesusChapa-Malacara.html', '/performers/jesuschapamalacara.html'],
  ['/featured/emmacurtiss.html', '/performers/emmacurtiss.html'],
  ['/featured/BrennaDuffitt.html', '/performers/brennaduffitt.html'],
  ['/featured/jenwagner.html', '/performers/jenWagner.html'],
  ['/featured/SEANCALAVANDRAGQUEEN.html', '/performers/seancalavanDragQueen.html'],
  ['/featured/splinterdance.html', '/performers/splinterdance.html'],
  ['/performances/NoMatter.html', '/shows/nomatter.html'],
  ['/performances/BackFromTheBrink.html', '/shows/backfromthebrink.html'],
  ['/performances/Delirium.html', '/shows/delirium.html'],
  ['/performances/reconstruct.html', '/shows/reconstruct.html'],
])('maps the retired URL %s to %s', (oldPath, target) => {
  expect(getLegacyRedirect(oldPath)).toBe(target);
});

test.each([
  '/company/UnknownPerson.html',
  '/company/KristenKissel.html',
  '/company/JaimeWaliczek',
  '/company/JaimeWaliczek.html/extra',
  '/company/nested/JaimeWaliczek.html',
  '/company/%ZZ.html',
  '/company/%2Fjaimewaliczek.html',
  '/featured/UnknownGuest.html',
  '/performances/UnknownShow.html',
  '/shows/nomatter.html',
  '/performers/jaimewaliczek.html',
  '/other/JaimeWaliczek.html',
  '//company/JaimeWaliczek.html',
  '/company/https://example.com.html',
  '/company/../../About.html',
  '/missing.html',
  '/',
])('leaves unknown or unrelated URLs alone: %s', (pathname) => {
  expect(getLegacyRedirect(pathname)).toBeNull();
});

test('all data-backed redirect destinations exist and use current paths', () => {
  const performers = [
    ...Object.values(companyMembers).filter((performer) => !performer.suppressPage),
    ...Object.values(highlights).filter((performer) => !performer.suppressPage),
  ];
  const oldPaths = [
    ...performers.flatMap((performer) => [
      `/company/${performer.id}.html`,
      `/featured/${performer.id}.html`,
    ]),
    ...Object.values(shows).map((show) => `/performances/${show.id}.html`),
  ];
  oldPaths.forEach((oldPath) => {
    const target = getLegacyRedirect(oldPath);
    expect(target).toMatch(/^\/(performers|shows)\/[^/]+\.html$/);
    expect(existsSync(path.join(docsDirectory, target))).toBe(true);
  });
});

async function render404(url) {
  const html = readFileSync(path.join(docsDirectory, '404.html'), 'utf8');
  const code = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
  const parsedUrl = new URL(url);
  const replace = import.meta.jest.fn();
  const elements = {
    heading: { innerText: 'Page not found' },
    destination: {
      href: '/',
      setAttribute(name, value) { this[name] = value; },
    },
  };
  const document = {
    title: 'Page not found | Jerboa Dance',
    getElementById(id) { return elements[id]; },
  };
  const context = createContext({
    document,
    window: {
      location: {
        pathname: parsedUrl.pathname,
        search: parsedUrl.search,
        hash: parsedUrl.hash,
        replace,
      },
    },
  });
  const module = new SourceTextModule(code, { context });
  await module.link((specifier) => {
    expect(specifier).toBe('/scripts/legacyRedirects.js');
    return new SyntheticModule(['default'], function initialize() {
      this.setExport('default', getLegacyRedirect);
    }, { context });
  });
  await module.evaluate();
  return { document, elements, replace };
}

test.each([
  ['/company/JaimeWaliczek.html', '/performers/jaimewaliczek.html'],
  ['/featured/emmacurtiss.html', '/performers/emmacurtiss.html'],
  ['/performances/NoMatter.html', '/shows/nomatter.html'],
])('the actual 404 page replaces browser history for %s and preserves query and fragment', async (oldPath, target) => {
  const { document, elements, replace } = await render404(`https://jerboadance.com${oldPath}?ref=external#bio`);
  const destination = `${target}?ref=external#bio`;

  expect(replace).toHaveBeenCalledTimes(1);
  expect(replace).toHaveBeenCalledWith(destination);
  expect(elements.destination.href).toBe(destination);
  expect(elements.heading.innerText).toBe('This page has moved');
  expect(document.title).toBe('Page moved | Jerboa Dance');
});

test('the actual 404 page keeps a home link and does not redirect an unknown address', async () => {
  const { document, elements, replace } = await render404('https://jerboadance.com/company/Unknown.html');

  expect(replace).not.toHaveBeenCalled();
  expect(elements.destination.href).toBe('/');
  expect(elements.heading.innerText).toBe('Page not found');
  expect(document.title).toBe('Page not found | Jerboa Dance');
});

async function renderPerformerPage(target) {
  const html = readFileSync(path.join(docsDirectory, target), 'utf8');
  const code = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
  const elements = Object.fromEntries([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => [
    match[1],
    {
      innerHTML: '',
      setAttribute(name, value) { this[name] = value; },
    },
  ]));
  const title = {};
  const context = createContext({
    URL,
    document: {
      location: `https://jerboadance.com${target}`,
      getElementById(id) { return elements[id]; },
      querySelector() { return title; },
    },
  });
  const modules = {
    '/scripts/database.js': { companyMembers, highlights },
    '/scripts/urls.js': { getHeadshotImageUrl },
  };
  const module = new SourceTextModule(code, { context });
  await module.link((specifier) => {
    const values = modules[specifier];
    return new SyntheticModule(Object.keys(values), function initialize() {
      Object.entries(values).forEach(([name, value]) => this.setExport(name, value));
    }, { context });
  });
  await module.evaluate();
  return elements;
}

test.each([
  ['/company/BrennaDuffitt.html', '/performers/brennaduffitt.html'],
  ['/company/Hanna-LeeSakakibara.html', '/performers/hannaleesakakibara.html'],
  ['/company/JessicaGlein.html', '/performers/jessicaglein.html'],
  ['/company/KatieSawicki.html', '/performers/katiesawicki.html'],
  ['/featured/ajrogers.html', '/performers/ajrogers.html'],
  ['/featured/andreasfetz.html', '/performers/andreasfetz.html'],
  ['/featured/andrewscott.html', '/performers/andrewscott.html'],
  ['/featured/angelaharriell.html', '/performers/angelaharriell.html'],
  ['/featured/brandonmilner.html', '/performers/brandonmilner.html'],
  ['/featured/christinajohnson.html', '/performers/christinajohnson.html'],
  ['/featured/dustinguyjackson.html', '/performers/dustinguyjackson.html'],
  ['/featured/gypsyleo.html', '/performers/gypsyleo.html'],
  ['/featured/hannahduffy.html', '/performers/hannahduffy.html'],
  ['/featured/harmonygwinn.html', '/performers/harmonygwinn.html'],
  ['/featured/jaimewaliczek.html', '/performers/jaimewaliczek.html'],
  ['/featured/jenWagner.html', '/performers/jenWagner.html'],
  ['/featured/jenniferelder.html', '/performers/jenniferelder.html'],
  ['/featured/jesuschapamalacara.html', '/performers/jesuschapamalacara.html'],
  ['/featured/jjbrychell.html', '/performers/jjbrychell.html'],
  ['/featured/marcvonholzen.html', '/performers/marcvonholzen.html'],
  ['/featured/nellwaliczek.html', '/performers/nellwaliczek.html'],
  ['/featured/noelleprice.html', '/performers/noelleprice.html'],
  ['/featured/parisoriginal.html', '/performers/parisoriginal.html'],
  ['/featured/phenixlaughlin.html', '/performers/phenixlaughlin.html'],
  ['/featured/randirascal.html', '/performers/randirascal.html'],
  ['/featured/sarahschmidt.html', '/performers/sarahschmidt.html'],
  ['/featured/scottomoore.html', '/performers/scottomoore.html'],
  ['/featured/seancalavan.html', '/performers/seancalavan.html'],
  ['/featured/seancalavanDragQueen.html', '/performers/seancalavanDragQueen.html'],
  ['/featured/sebastianlangeandmajazavaljevski.html', '/performers/sebastianlangeandmajazavaljevski.html'],
  ['/featured/splinterdance.html', '/performers/splinterdance.html'],
  ['/featured/stevedolan.html', '/performers/stevedolan.html'],
  ['/featured/taephoenix.html', '/performers/taephoenix.html'],
  ['/featured/theloveshownyc.html', '/performers/theloveshownyc.html'],
  ['/featured/thomasphelan.html', '/performers/thomasphelan.html'],
  ['/featured/tomtomthephenomenon.html', '/performers/tomtomthephenomenon.html'],
])('the legacy link %s reaches its working canonical page %s', async (oldPath, target) => {
  expect(getLegacyRedirect(oldPath)).toBe(target);
  const elements = await renderPerformerPage(target);
  const id = path.basename(target, '.html');
  const performer = companyMembers[id] || highlights[id];

  expect(elements.name.innerText).toBe(performer.name);
  expect(elements.main.innerHTML).toBe('');
  expect(elements.headshot.src).toBe(getHeadshotImageUrl(performer.headshot?.filename || 'default.png'));
  if (performer.bio) {
    expect(elements.bio.innerHTML).toBe(performer.bio);
  }
});

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return htmlFiles(filename);
    }
    return entry.name.endsWith('.html') ? [filename] : [];
  });
}

test('published HTML links and the sitemap do not point to retired path families', () => {
  const origin = 'https://jerboadance.com';
  const references = htmlFiles(docsDirectory).flatMap((filename) => {
    const html = readFileSync(filename, 'utf8');
    return [...html.matchAll(/\b(?:href|src|action)\s*=\s*(["'])(.*?)\1/gi)]
      .filter((match) => !match[2].startsWith('${'))
      .map((match) => ({ filename, reference: match[2] }));
  });
  const sitemap = readFileSync(path.join(docsDirectory, 'sitemap.xml'), 'utf8');
  [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].forEach((match) => {
    references.push({ filename: 'sitemap.xml', reference: match[1] });
  });

  const retiredReferences = references.filter(({ filename, reference }) => {
    const base = `${origin}/${path.relative(docsDirectory, filename).split(path.sep).join('/')}`;
    const url = new URL(reference, base);
    return url.origin === origin && /^\/(company|featured|performances)\//i.test(url.pathname);
  });
  expect(retiredReferences).toEqual([]);
});
