const path = require('path')
exports.pathJoin = function pathJoin (url) {
  return path.join(__dirname, url)
}