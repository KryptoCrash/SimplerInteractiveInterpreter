var vars = {}
var operate = {
  '+':(x,y)=>x+y,
  '-':(x,y)=>x-y,
  '*':(x,y)=>x*y,
  '/':(x,y)=>x/y,
  '%':(x,y)=>x%y
}
function evaluate(tree) {
  let type = tree.type
  if(type == 'digit') {
    return Number(tree.value)
  }
  if(type == 'var') {
    if(vars[tree.value]){
      return vars[tree.value]
    } else {
      throw Error('Undefined Variable: ' + tree.value)
    }
  }
  if(type == 'assign') {
    vars[tree.left.value]=evaluate(tree.right)
    return evaluate(tree.right)
  }
  if(type == 'operator') {
    return operate[tree.operator.value](evaluate(tree.left),evaluate(tree.right))
  }
}
