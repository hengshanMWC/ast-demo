const path = require('path')
exports.pathJoin = function pathJoin (url) {
  return path.join(__dirname, url)
}
module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: path.join(__dirname, 'dist'),
  identifier: {
    data: 'data',
    http: 'http'
  }
}