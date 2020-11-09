const recast = require("recast");
const path = require('path')
const fs = require('fs')
const { getAst } = require('./tool')
const createMkdir = require('../utils/createMkdir')
const { setObject } = require('../utils/common')
const TNT = recast.types.namedTypes
// 生成新文件，和合并文件

module.exports = function varFile (ast, file, dist) {
  const { 
    variableDeclaration,
    variableDeclarator,
    functionDeclaration,
    objectExpression,
    identifier
  } = recast.types.builders
  const body = ast.program.body
  let isCreateMkdir = true
  recast.visit(ast, {
    // import
    visitImportDeclaration(p) {
      const node = p.node // node
      const pathName = node.original.source.value // 路径名
      const varName = node.original.specifiers[0].local.name // 变量名
      // 好的import的路径文件的ast
      const ast2 = getAst(path.join(file, node.source.value))
      let ASTNode
      recast.visit(ast2, {
        // export default
        visitExportDefaultDeclaration(p2) {
          const declaration = p2.node.declaration
          if (TNT.ObjectExpression.check(declaration)) {
            ASTNode = variableDeclaration('const', [
              variableDeclarator(identifier(varName), objectExpression(declaration.properties))
            ])
          } else if (TNT.FunctionDeclaration.check(declaration)) {
            ASTNode = functionDeclaration(identifier(varName), declaration.params, declaration.body)
          }
          if (isCreateMkdir) {
            isCreateMkdir = false
            createMkdir(dist)
          }
          // 生成新文件
          fs.writeFileSync(path.join(dist, pathName), recast.print(ASTNode).code)
          return false
        }
      })
      setObject(body, node, ASTNode)
      return false
    }
  })
  if (isCreateMkdir) {
    isCreateMkdir = false
    createMkdir(dist)
  }
  // 生成合并文件
  fs.writeFileSync(path.join(dist, './varFile.js'), recast.print(ast).code)
}