function getHeadshotImageUrl(filename) {
  const url = `/assets/headshots/${filename}`;
  return url;
}

function getShowImageUrl(show, filename) {
  const url = `/assets/shows/${show.id}/${filename}`;
  return url;
}

function getShowUrl(show) {
  const url = `/shows/${show.id}.html`;
  return url;
}

function getPerformerUrl(performer) {
  const url = `/performers/${performer.id}.html`;
  return url;
}

export {
  getHeadshotImageUrl,
  getShowImageUrl,
  getShowUrl,
  getPerformerUrl,
};
