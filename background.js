chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "screenshot",
    title: "Take Screenshot",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "screenshot") {
    chrome.tabs.sendMessage(tab.id, { action: "takeScreenshot" });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadScreenshot") {
    const { dataUrl, timestamp } = request;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `screenshot_${timestamp}.png`;
    link.click();
    sendResponse({ success: true });
  }
});
