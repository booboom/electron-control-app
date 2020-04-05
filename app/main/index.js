const { app } = require('electron')
// 引入主进程监听事件
const handleIPC = require('./ipc')
// 引入主进程
// const { create: createControlWindow } = require('./windows/control')
const { create: createMainWindow } = require('./windows/main')
// 主进程
app.on('ready', () => {
    createMainWindow()
    // createControlWindow()
    handleIPC()
    require('./robot.js')()
})