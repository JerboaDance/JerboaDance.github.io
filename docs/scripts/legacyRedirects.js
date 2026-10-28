import { companyMembers, highlights, shows } from './database.js';
import { getPerformerUrl, getShowUrl } from './urls.js';

const performers = [
  ...Object.values(companyMembers),
  ...Object.values(highlights),
];

const performerAliases = {
  'hanna-leesakakibara': 'hannaleesakakibara',
  'jesuschapa-malacara': 'jesuschapamalacara',
};

function getLegacyRedirect(pathname) {
  const match = /^\/(company|featured|performances)\/([^/]+)\.html$/i.exec(pathname);
  if (!match) {
    return null;
  }

  let id;
  try {
    id = decodeURIComponent(match[2]).toLowerCase();
  } catch {
    return null;
  }

  if (match[1].toLowerCase() === 'performances') {
    const show = Object.values(shows).find((candidate) => candidate.id.toLowerCase() === id);
    return show ? getShowUrl(show) : null;
  }

  id = performerAliases[id] || id;
  const performer = performers.find(
    (candidate) => !candidate.suppressPage && candidate.id.toLowerCase() === id,
  );
  return performer ? getPerformerUrl(performer) : null;
}

export default getLegacyRedirect;
