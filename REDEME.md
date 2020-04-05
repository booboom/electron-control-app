// TODO: robot是c++插件需要用electron-rebuild编译
// 在https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json找到node版本对应的abi
// 我目前的node版本是12.13.1
// 用npx electron-rebuild自动编译找不到对应的node版本的abi，所以运行会报错
![robot.js 编译](./release/md/robot.jpeg)

或者通过`npm rebuild --runtime=electron --target=8.1.0 --disturl=https://atom.io/download/atom-shell --abi=72`编译