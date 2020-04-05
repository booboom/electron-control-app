const { ipcMain } = require('electron')
const { send: sendMainWindow } = require('./windows/main')
// 引入 -   创建渲染进程窗口
const { create: createControlWindow, send: sendControlWindow } = require('./windows/control')
const signal  = require('./signal')

// 主进程监听事件
module.exports = function() {
    ipcMain.handle('login', async () => {
        // mock
        // let code = Math.floor(Math.random() * (999999 - 100000)) + 100000
        let { code } = await signal.invoke('login', null, 'logined')
        return code
    })
    ipcMain.on('control', async (e, remote) => {
        // mock TODO: 这里需要跟服务器交互，发送需要被控制的傀儡账号
        signal.send('control', { remote })
        
    })

    signal.on('controlled', (data) => {
        sendMainWindow('control-state-change', data.remote, 1)
        createControlWindow()
    })
    signal.on('be-controlled', (data) => {
        sendMainWindow('control-state-change', data.remote, 2)
    })
    // 监听事件转发
    ipcMain.on('forward', (e, event, data) => {
        signal.send('forward', { event, data })
    })
    signal.on('offer', data => {
        sendMainWindow('offer', data)
    })
    signal.on('answer', data => {
        sendControlWindow('answer', data)
    })
    signal.on('puppet-candidate', data => {
        sendControlWindow('candidate', data)
    })
    signal.on('control-candidate', data => {
        sendMainWindow('candidate', data)
    })
}