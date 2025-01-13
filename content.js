document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.html5-video-player');
  if (player) {
    const button = document.createElement('button');
    button.id = 'screenshot-button';
    button.innerText = 'Screenshot';
    button.style.cssText = `
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 9999;
      background-color: #ff0000;
      color: #ffffff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    `;
    player.appendChild(button);

    button.addEventListener('click', () => {
      const video = player.querySelector('video');
      if (video) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        const timestamp = Math.floor(video.currentTime);
        chrome.runtime.sendMessage({ action: 'downloadScreenshot', dataUrl, timestamp });
      }
    });
  }
});
