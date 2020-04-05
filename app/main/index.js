const { app } = require('electron')
// 引入主进程监听事件
const handleIPC = require('./ipc')
// 引入主进程
const { create: createMainWindow, show: showMainWindow, close: closeMainWindow } = require('./windows/main')

// 禁止多开
const gotTheLock = app.requestSingleInstanceLock()
if(!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', () => {
        showMainWindow()
    })
    // 主进程
    app.on('ready', () => {
        createMainWindow()
        handleIPC()
        require('./trayAndMenu/darwin')
        require('./robot.js')()
    })
    app.on('before-quit', () => {
        closeMainWindow()
    })
    app.on('activate', () => {
        showMainWindow()
    })
}