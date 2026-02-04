function generateYouTubeEmbed(video, options = {}) {
  const { autoplay = false, muted = false, playerId = null } = options;
  const params = [];

  if (autoplay) {
    params.push('autoplay=1');
    params.push('mute=1'); // Always mute when autoplay (required by browsers)
    params.push(`playlist=${video.id}`); // Required for better autoplay support
    params.push('rel=0'); // Show video thumbnail instead of related videos
  } else if (muted) {
    params.push('mute=1');
  }

  if (playerId) {
    params.push('enablejsapi=1'); // Enable YouTube API for event tracking
  }

  const queryString = params.length > 0 ? '?' + params.join('&') : '';

  const embedElement = document.createElement('div');
  embedElement.setAttribute('class', `youtube youtube-${video.aspectRatio}`);

  const iframeId = playerId ? `id="${playerId}"` : '';
  embedElement.innerHTML = `
  <iframe ${iframeId} width="784" height="441" src="https://www.youtube.com/embed/${video.id}${queryString}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  return embedElement;
}

export default generateYouTubeEmbed;
