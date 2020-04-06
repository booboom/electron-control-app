const fs = require('fs-extra')
const dest = '../../page/main'
fs.removeSync(dest)
fs.moveSync('./build', dest)