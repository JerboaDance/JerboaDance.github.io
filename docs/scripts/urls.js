function getHeadshotImageUrl(filename) {
  const url = `/assets/headshots/${filename}`;
  return url;
}

function getShowImageUrl(show, filename) {
  const url = `/assets/shows/${show.id}/${filename}`;
  return url;
}

function getShowUrl(show) {
  const url = `/show/${show.id}`;
  return url;
}

function getCompanyMemberBioUrl(companyMember) {
  const url = `/performer/${companyMember.id}`;
  return url;
}

function getHighlightBioUrl(highlight) {
  const url = `/performer/${highlight.id}`;
  return url;
}

export {
  getHeadshotImageUrl,
  getShowImageUrl,
  getShowUrl,
  getCompanyMemberBioUrl,
  getHighlightBioUrl,
};
