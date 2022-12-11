function getHeadshotImageUrl(filename) {
  const url = `/assets/headshots/${filename}`;
  return url;
}

function getShowImageUrl(show, filename) {
  const url = `/assets/shows/${show.id}/${filename}`;
  return url;
}

function getShowUrl(show) {
  const url = `/show.html?showId=${show.id}`;
  return url;
}

function getCompanyMemberBioUrl(companyMember) {
  const url = `/castMember.html?companyMemberId=${companyMember.id}`;
  return url;
}

function getHighlightBioUrl(highlight) {
  const url = `/castMember.html?highlightId=${highlight.id}`;
  return url;
}

export {
  getHeadshotImageUrl,
  getShowImageUrl,
  getShowUrl,
  getCompanyMemberBioUrl,
  getHighlightBioUrl
}