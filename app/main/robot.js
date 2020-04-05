const { ipcMain } = require('electron')
const robot = require('robotjs')
const vkey = require('vkey')

// 键盘事件
function handleKey(data) {
    // data { keyCode, meta, alt, shift, ctrl }
    // robot 需要传入的特殊键数组
    const modifiers = []

    if (data.meta) modifiers.push('meta')
    if (data.alt) modifiers.push('alt')
    if (data.shift) modifiers.push('shift')
    if (data.ctrl) modifiers.push('ctrl')
    let key = vkey[data.keyCode].toLowerCase()
    if(key[0] !== '<') {// <shift>
        robot.keyTap(key, modifiers)
    }
}

// 鼠标事件
function handleMouse(data) {
    // data { clientX, clientY, screen: { width, height }, video: { width, height } }
    // clientX,clientY： 鼠标在video（视频流）上的点击坐标
    // screen：傀儡端的尺寸
    // video：真实的视频流的尺寸
    // 反应到真实屏幕的x,y坐标
    let x = data.clientX * data.screen.width / data.video.width
    let y = data.clientY * data.screen.height / data.video.height
    robot.moveMouse(x, y)
    robot.mouseClick()
}

module.exports = function () {
    ipcMain.on('robot', (e, type, data) => {
        if (type === 'mouse') {
            handleMouse(data)
        } else if (type === 'key') {
            handleKey(data)
        }
    })
}