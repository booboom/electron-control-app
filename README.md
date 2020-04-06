## 目录
app - 主进程

renderer - 渲染进程

websocketServer - 服务端

## 启动
1. 根目录`npm i` => websocketServer目录`npm i` => app/renderer/src/main目录`npm i`
2. websocketServer目录下`node index.js`
3. 根目录下启动`npm start`

## 测试websocket
http://websocket.org/echo.html

## 监听端口
websocketServer/index.js

`const wss = new WebSocket.Server({ port: 8010 })`

## 本地服务地址
app/main/signal.js

`const ws = new WebSocket('ws://192.168.1.105:8010')`

## robotJs编译问题
robot是c++插件需要用electron-rebuild编译

在https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json找到node版本对应的abi
我目前的node版本是12.13.1

用npx electron-rebuild自动编译找不到对应的node版本的abi，所以运行会报错

或者通过`npm rebuild --runtime=electron --target=8.1.0 --disturl=https://atom.io/download/atom-shell --abi=72`编译

windows不识别` "start": "BROWSER=none react-app-rewired start",` BROWSER=none命令

windows安装robotJs失败，无法解析。待处理。

## 创建各个尺寸icon
1. sips -z 32 32 icon.png --out icons.iconset/icon_16x16@2x.png

2. iconutil -c icns icons.iconset -o icon.icns

## electron-builder安装 && 使用
1. windows必须安装`windows-build-tools`
    用管理员权限启动cmd，执行：

    npm install --global --production windows-build-tools

2. 安装electro-builder
    npm i electron-builder --save-dev

3. 尽可能抹平各平台环境变量配置的差异

    npm i cross-env --save-dev
    > cross-env npm_config_electron_mirror="https://npm.taobao.org/mirrors/electron/" electron-builder build --mac
    > cross-env npm_config_electron_mirror="https://npm.taobao.org/mirrors/electron/" electron-builder build --win --ia32

4. 去掉electron-rebuild

    npm remove electron-rebuild

5. 使用electron-builder对原生模块进行重新编译

    package.json加入"postinstall":"electron-builder install-app-deps"

6. 用于electron windows更新

    npm install electron-builder-squirrel-windows --save-dev

7. 设置electron-builder镜像

    npm config set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/

## 遗留问题
electron-builder打包问题