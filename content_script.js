chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === 'searchDom'){
    // 查询dom操作
    sendResponse({
      src:$("#myAudio").attr("src")
    })
  }
})