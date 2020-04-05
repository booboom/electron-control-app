const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8010 })

const code2ws = new Map()

wss.on('connection', function connection(ws, request) {
    // ws => 端
    let code = Math.floor(Math.random() * (999999 - 100000)) + 100000
    code2ws.set(code, ws)

    ws.sendData = (event, data) => {
        ws.send(JSON.stringify({event, data}))
    }
    ws.sendError = msg => {
        ws.send('Error', {msg})
    }

    ws.on('message', function incoming(message) {
        console.log('imcoming', message)
        // { event, data }
        let parseMessage = {}
        try {
            parseMessage = JSON.parse(message)
        } catch (error) {
            console.error('parse message error', error)
            ws.sendError('message invalid')
            return
        }
        let { event, data } = parseMessage
        if(event === 'login') {
            ws.sendData('logined', {code})
        } else if(event === 'control') {
            let remote = +data.remote
            if(code2ws.has(remote)) {
                ws.sendData('controlled', {remote})
                ws.sendRemote = code2ws.get(remote).sendData
                code2ws.get(remote).sendRemote = ws.sendData
                ws.sendRemote('be-controlled', {remote: code})
                console.log(JSON.stringify(code2ws))
            }
        } else if(event === 'forward') {
            // data = {event, data}
            ws.sendRemote(data.event, data.data)
        }
    })
    ws.on('close', () => {
        code2ws.delete(code)
        clearTimeout(wx._closeTimeout)
    })
    ws._closeTimeout = setTimeout(() => {
        ws.terminate()
    }, 10 * 60 * 1000);
})