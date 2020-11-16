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
exports.getMergeConfig = function getMergeConfig (config1, config2 = {}) {
  Object.keys(config1).forEach(key => {
    if (typeof config1[key] === 'object') {
      config2[key] = getMergeConfig(config1[key])
    } else {
      config2[key] = config1[key]
    }
  })
  return config2
}