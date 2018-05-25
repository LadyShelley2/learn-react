function unique(arr){
  const s = new Set()
  arr.forEach(element => {
    s.add(element)
  })
  return Array.from(s)
}

unique([1,2,2,3])