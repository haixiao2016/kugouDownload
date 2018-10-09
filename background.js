var AudioData = {}

function checkForValidUrl(tabId, changeInfo, tab) {
  
  if (tab.url.indexOf('www.kugou.com/song') != -1 ) {
    chrome.pageAction.show(tabId)
  }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl)
