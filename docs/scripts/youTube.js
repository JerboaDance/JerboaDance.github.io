function generateYouTubeEmbed(video) {
  const embedElement = document.createElement('div');
  embedElement.setAttribute('class', `youtube youtube-${video.aspectRatio}`);
  embedElement.innerHTML = `
  <iframe width="784" height="441" src="https://www.youtube.com/embed/${video.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  return embedElement;
}

export default generateYouTubeEmbed;
