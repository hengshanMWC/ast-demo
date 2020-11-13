const { pathJoin } = require('./utils')
const BoxCatWebpackplugin = require('../plugin/box-cat/index')
const confing = {
  entry: pathJoin("../test/box-cat/index.js"),
  output: pathJoin("../test/box-cat/dist"),
  identifier: {
    data: 'data',
    http: 'http'
  }
}
BoxCatWebpackplugin(confing)