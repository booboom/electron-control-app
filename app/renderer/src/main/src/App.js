import React, { useState, useEffect, useReducer } from 'react';
import { ipcRenderer } from 'electron'
// const { ipcRenderer } = window.require('electron')
// import logo from './logo.svg';
import './peer-puppet.js'
import './App.css';

// 主进程页面
function App() {
  // 这一段类似于在constructor内定义this.state
  const [remoteCode, setRemoteCode] = useState('')
  const [lcoalCode, setLocalCode] = useState('')
  const [controlText, setControlText] = useState('')

  // 这部分相当于生命周期钩子集合
  useEffect(() => {
    // 这一段相当于组件挂载之后componentDidMount
    login()
    ipcRenderer.on('control-state-change', handleControlState)
    // 这一段相当于销毁组件生命周期componentWillUnMount
    return () => {
      // 清理掉监听主进程发送的监听事件
      ipcRenderer.removeListener('control-state-change', handleControlState)
    }
  }, [])

  // 这部分是自定义函数
  const login = async () => {
    let code = await ipcRenderer.invoke('login')
    setLocalCode(code)
  }
  const startControl = (remoteCode) => {
    ipcRenderer.send('control', remoteCode)
  }

  const handleControlState = (e, name, type) => {
    let text =  ''
    if (type === 1) {
      // 控制别人
      text = `正在远程控制${name}`
    } else if (type === 2) {
      // 被控制
      text = `被${name}控制`
    }
    setControlText(text)
  }

  return (
    <div className="App">
      {
        controlText === '' ?
          <div>
            <div>你的控制码{lcoalCode}</div>
            <input type="text" value={remoteCode} onChange={e => setRemoteCode(e.target.value)} />
            <button onClick={() => startControl(remoteCode)}>确认</button>
          </div>
          :
          <div>{controlText}</div>
      }
    </div>
  );
}

export default App;
