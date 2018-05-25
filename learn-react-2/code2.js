function* fib(){
  let a = 0;
  let b = 1;
  while(true){
    [a,b]= [b,a+b]
    yield a
  }
}
[first,second,third,fourth,fifth,sixth,seventh,eighth,ninth,tenth]=fib()
