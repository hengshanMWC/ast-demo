const fs = require('fs')
const recast = require("recast");
exports.getAst = function getAst (file) {
  let code = fs.readFileSync(file, 'utf-8')
  return recast.parse(code);
}