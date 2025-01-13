function addScreenshotButton() {
    console.log('Attempting to add screenshot button...');
    const player = document.querySelector('.html5-video-player');
    if (!player) {
        console.log('Video player not found');
        return;
    }
    console.log('Video player found:', player);

    // Check if button already exists
    if (document.getElementById('screenshot-button')) {
        console.log('Screenshot button already exists');
        return;
    }

    console.log('Creating new screenshot button');
    const button = document.createElement('button');
    button.id = 'screenshot-button';
    button.innerText = 'Screenshot';
    button.style.cssText = `
        position: absolute;
        bottom: 70px;  // 调整位置，避免与控制栏重叠
        right: 20px;
        z-index: 9999;
        background-color: #ff0000;
        color: #ffffff;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 4px;
    `;

    try {
        player.appendChild(button);
        console.log('Button successfully added to player');
    } catch (error) {
        console.error('Error adding button:', error);
    }

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

// Debug info for observer
const observer = new MutationObserver((mutations) => {
    console.log('DOM mutation detected');
    addScreenshotButton();
});

// Start observing with debug info
try {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    console.log('MutationObserver started successfully');
} catch (error) {
    console.error('Error starting MutationObserver:', error);
}

// Initial check with delay
console.log('Setting up initial check...');
setTimeout(() => {
    console.log('Performing initial check');
    addScreenshotButton();
}, 1000);

// Periodic check
setInterval(() => {
    console.log('Performing periodic check');
    addScreenshotButton();
}, 2000);

// YouTube SPA navigation event
window.addEventListener('yt-navigate-finish', () => {
    console.log('YouTube navigation detected');
    addScreenshotButton();
});

// Additional debug info
console.log('Content script loaded successfully');
