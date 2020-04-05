const EventEmitter = require('events')
const peer = new EventEmitter()
const { ipcRenderer } = require('electron')


// TODO: 在控制控制端模拟傀儡端被控制
// peer.on('robot', (type, data) => {
//     if(type === 'mouse') {
//         data.screen = {
//             width: window.screen.width,
//             height: window.screen.height,
//         }
//     }
//     ipcRenderer.send('robot', type, data)
// })

const pc = new window.RTCPeerConnection({})

// candidate
pc.onicecandidate = function(e) {
    console.log('candidate', JSON.stringify(e.candidate))
    if(e.candidate) {
        ipcRenderer.send('forward', 'control-candidate', e.candidate)
    }
}
ipcRenderer.on('candidate', (e, candidate) => {
    addIceCandidate(candidate)
})
let candidates = []
async function addIceCandidate(candidate) {
    if(candidate) {
        candidates.push(candidate)
    }
    if(pc.remoteDescription && pc.remoteDescription.type) {
        for(let i = 0; i < candidates.length; i++) {
            await pc.addIceCandidate(new RTCIceCandidate(candidates[i]))
        }
        candidates = []
    }
}

// 创建控制端offer
async function createOffer() {
    const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
    })
    await pc.setLocalDescription(offer)
    console.log('pc offer', JSON.stringify(offer))
    return pc.localDescription
}
createOffer().then((offer) => {
    ipcRenderer.send('forward', 'offer', {
        type: offer.type,
        sdp: offer.sdp,
    })
})

// 设置傀儡端SDP
async function setRemote(answer) {
    await pc.setRemoteDescription(answer)
}
ipcRenderer.on('answer', (e, answer) => {
    setRemote(answer)
})

// 监听视频流的增加
pc.onaddstream = function(e) {
    console.log('add stream', e)
    peer.emit('add-stream', e.stream)
}

module.exports = peer