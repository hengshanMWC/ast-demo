const recast = require("recast");

const { getAst } = require('../tool')
module.exports = function (config) {
  const ast = getAst(config.entry)
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
  return recast.print(ast).code
}