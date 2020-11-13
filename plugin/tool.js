const fs = require('fs')
const recast = require("recast");
const path = require('path')
exports.getAst = function getAst (file) {
  let code = fs.readFileSync(file, 'utf-8')
  return recast.parse(code);
}
exports.pathJoin = function pathJoin (url) {
  return path.join(__dirname, url)
}