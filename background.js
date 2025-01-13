// Initialize context menu when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Remove existing menu items to avoid duplicates
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "screenshot",
      title: "Take Screenshot",
      contexts: ["all"]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error creating context menu:', chrome.runtime.lastError);
      }
    });
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) {
    console.error('Invalid tab');
    return;
  }

  if (info.menuItemId === "screenshot") {
    chrome.tabs.sendMessage(tab.id, { action: "takeScreenshot" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      }
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadScreenshot") {
    try {
      const { dataUrl, timestamp } = request;
      chrome.downloads.download({
        url: dataUrl,
        filename: `screenshot_${timestamp}.png`,
        saveAs: false
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error('Download failed:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ success: true, downloadId });
        }
      });
    } catch (error) {
      console.error('Error handling screenshot download:', error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep the message channel open for async response
});
