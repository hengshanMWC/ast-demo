const recast = require("recast");
const path = require('path')
const fs = require('fs')
const createMkdir = require('../../utils/createMkdir')
const TNT = recast.types.namedTypes
module.exports = function varFile (ast, file, dist) {
  const {
    variableDeclaration,
    objectExpression,
    objectPattern,
    functionDeclaration,
    arrayPattern,
    blockStatement,
    returnStatement,
    literal,
    identifier,
  } = recast.types.builders
  const body = ast.program.body
  const properties = body[0].declarations[0].init.properties
  const newProperties = properties.map(property => {
    return functionDeclaration(
      identifier(property.key.name),
      [],
      blockStatement([
        returnStatement(
          literal(property.value.value)
        )
      ])
    )
  })
  body.push(...newProperties)
  createMkdir(dist)
  fs.writeFileSync(path.join(dist, 'index.js'), recast.print(ast).code)
}