const path = require('path')
const fs = require('fs')
const lib = require('./lib')
const _config = require('./config')
const createMkdir = require('../../utils/createMkdir')
const removeMkdir = require('../../utils/removeMkdir')
const { getMergeConfig } = require('../tool')
module.exports = async function (config = _config) {
  let mergeConfig = null
  if (_config === config) {
    mergeConfig = JSON.parse(JSON.stringify(config))
  } else {
    mergeConfig = getMergeConfig(_config, JSON.parse(JSON.stringify(config)))
  }
  const code = lib(config)
  try {
    await removeMkdir(config.output)
  } finally {
    createMkdir(config.output)
    fs.writeFileSync(path.join(config.output, 'index.js'), code)
  }
}