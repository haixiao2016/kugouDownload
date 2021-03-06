var base_api = 'http://wwwapi.kugou.com/yy/index.php?r=play/getdata&'
var AudioData = {}
document.addEventListener('DOMContentLoaded', function() {
  getUrl()
})

function getBlob(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

function saveAs(blob, filename, type) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')

    link.href = type ? blob : window.URL.createObjectURL(blob)
    link.download = filename

    link.style.display = 'none'
    body.appendChild(link)

    link.click()
    body.removeChild(link)

    window.URL.revokeObjectURL(link.href)
  }
}
function download(url, filename) {
  getBlob(url)
    .then(blob => {
      saveAs(blob, filename)
    })
    .catch(res => {
      // 加载失败，查询页面DOM,获取下载地址
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { message: 'searchDom' }, function(
          response
        ) {
          saveAs(response.src, '未命名', 1)
        })
      })
    })
}

function getUrl() {
  var _urls = []
  chrome.tabs.getSelected(null, function(tab) {
    _urls = tab.url.split('#')
    if (_urls.length > 1) {
      getAudioMsg(_urls[1])
    }
  })
}

function getAudioMsg(data) {
  $.ajax({
    type: 'get',
    url: base_api + data,
    success: function(r) {
      var res = JSON.parse(r)
      if (!res.err_code) {
        AudioData = res.data
        $('.audoMsgName').html('歌名：' + AudioData.audio_name)
      }
    }
  })
}
$('.downlaodCROS').click(function() {
  download(AudioData.play_url, AudioData.audio_name)
})
