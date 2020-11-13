const path = require('path')
const { getAst } = require('../plugin/tool')
function varFileFn () {
  const varFile = require('../plugin/varFile')
  const ast = getAst(path.join(__dirname, "../test/varFile/index.js"))
  varFile(ast, path.join(__dirname, "../test/varFile"), path.join(__dirname, "../test/varFile/dist"))
}
varFileFn()