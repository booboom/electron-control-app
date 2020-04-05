if(process.platform === 'darwin') {
    require('./darwin.js')
} else if(process === 'win2332') {
    require('./win32.js')
} else {
    // 其他系统
}