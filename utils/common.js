exports.setObject = function setObject (objs, obj, ASTNode) {
  const i = objs.findIndex(o => o === obj)
  if (i !== -1) objs[i] = ASTNode
}
