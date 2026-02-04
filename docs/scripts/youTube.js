function generateYouTubeEmbed(video, options = {}) {
  const { autoplay = false, muted = false } = options;
  const params = [];
  if (autoplay) params.push('autoplay=1');
  if (muted) params.push('mute=1');
  const queryString = params.length > 0 ? '?' + params.join('&') : '';
  
  const embedElement = document.createElement('div');
  embedElement.setAttribute('class', `youtube youtube-${video.aspectRatio}`);
  embedElement.innerHTML = `
  <iframe width="784" height="441" src="https://www.youtube.com/embed/${video.id}${queryString}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  return embedElement;
}

export default generateYouTubeEmbed;
