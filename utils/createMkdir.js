const path = require('path')
const fs = require('fs')
function createMkdir (file) {
  try {
    const stat = fs.statSync(file)
    if (!stat.isDirectory()) {
      fs.mkdirSync(file)
    }
  } catch (error) {
    // console.error(error)
    retreat(file)
  }
}
function retreat (file) {
  try {
    fs.mkdirSync(file)
  } catch (error) {
    createMkdir(path.parse(file).dir)
    createMkdir(file)
  }
}
module.exports = createMkdir