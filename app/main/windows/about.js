const openAboutWindow = require('about-window')
const path = require('path')

const create = () => openAboutWindow({
    // icon_parh: path.join(__dirname, 'icon.png')
    package_json_dir: path.resolve(__dirname, '/../../../'),
    cropyright: 'Cropyright (c) 2020 baomer',
    homePage: 'https://github.com/booboom/electron-control-app',
})

module.exports = {
    create,
}