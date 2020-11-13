const recast = require("recast");
const path = require('path')
const fs = require('fs')
const createMkdir = require('../../utils/createMkdir')
const { getAst } = require('../tool')
module.exports = function (confing) {
  const ast = getAst(confing.entry)
  const {
    exportDeclaration,
    variableDeclaration,
    variableDeclarator,
    functionExpression,
    blockStatement,
    returnStatement,
    literal,
    identifier,
  } = recast.types.builders
  const body = ast.program.body
  const dataAst = body[2].declarations[0].init.properties
  const newDataAst = dataAst.map(item => {
    return exportDeclaration(
      false,
      variableDeclaration(
        'const',
        [
          variableDeclarator(
            identifier(item.key.name),
            functionExpression(
              null,
              [],
              blockStatement([
                returnStatement(
                  literal(item.value.value)
                )
              ])
            )
          )
        ]
      )
    )
  })
  body.push(...newDataAst)
  createMkdir(confing.output)
  fs.writeFileSync(path.join(confing.output, 'index.js'), recast.print(ast).code)
}