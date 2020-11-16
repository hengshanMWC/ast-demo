const recast = require("recast");

const { getAst } = require('../tool')
module.exports = function (config) {
  const ast = getAst(config.entry)
  const {
    exportDeclaration,
    variableDeclaration,
    variableDeclarator,
    memberExpression,
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
            memberExpression(
              identifier(config.identifier.http),
              literal(item.key.name),
            )
          )
        ]
      )
    )
  })
  body.push(...newDataAst)
  return recast.print(ast).code
}