const peer = require('./peer-control')

// 获取视频流   拿到stream传给播放
peer.on('add-stream', stream => {
    play(stream)
})

let video = document.getElementById('screen-video')
// 播放视频流
function play(stream) {
    video.srcObject = stream
    video.onloadedmetadata = function() {
        video.play()
    }
}

// 监听键盘按下事件
window.onkeydown = function(e) {
    // data { keyCode, meta, alt, shift, ctrl }
    let data = {
        keyCode: e.keyCode,
        shift: e.shiftKey,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey
    }
    peer.emit('robot', 'key', data)
}

// 监听鼠标点击事件
window.onmouseup = function(e) {
    // data { clientX, clientY, screen: { width, height }, video: { width, height } }
    let data = {}
    data.clientX = e.clientX
    data.clientY = e.clientY
    data.video = {
        // 傀儡端真实的视频宽高
        width: video.getBoundingClientRect().width,
        height: video.getBoundingClientRect().geight
    }
    peer.emit('robot', 'mouse', data)
}