function cala(add, mul, origin) {
  return (origin + add) * mul
}

function cala1(add){
  return function(mul){
    return function(origin){
      return (origin + add) * mul
    }
  }
}

var cala2 = (add)=>(mul)=>(origin)=> (origin + add) * mul

console.log(cala(1,2,3))
console.log(cala1(1)(2)(3))
console.log(cala2(1)(2)(3))