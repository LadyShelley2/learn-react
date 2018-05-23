1. babel 是什么，我们为什么要使用 babel？

2. 我们使用 babel 把 es6 的代码编译为 es5代码后，为什么还需要引入 polyfill？

3. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码
```js
 var v='Hello World'
 (function(){
     console.log(v)
     var v='I love you'
 })()
```
4. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码

```js
 function main(){ 
     console.log(foo)      // ?
     var foo = 10
     console.log(foo)      // ?
     function foo(){ 
         console.log("我来自 foo")
     }
     console.log(foo)      // ?
 }
 main()
```

5. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码

```js
 var a = 10;
 function main(){
     console.log(a);        // ?
     var a = 20;
     console.log(a);        // ?
     (function(){
         console.log(a);     // ?
         var a = 30;
         console.log(a);     // ?
     })()
     console.log(a);        // ?
 }
 main()
 ```

6. 为什么点击所有的button打印出来的都是5而非0,1,2,3,4？要怎么修改？

```js
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width">
 <title>JS Bin</title>
 <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
 </head>
 <body>
 <ul>
     <li><button>0</button></li>
     <li><button>1</button></li>
     <li><button>2</button></li>
     <li><button>3</button></li>
     <li><button>4</button></li>
 </ul>
 <script>
 var buttons = $("button")
 for(var i=0;i<buttons.length;i++){
     buttons[i].onclick = function(){
         console.log(i)
     }
 }
 </script>
 </body>
 </html>
```
7. 什么是解构？数组解构是什么？

8. 什么是解构默认值？怎样使用？

9. 下面代码执行会报错吗？为什么？
```js
 let foo;
 let {foo} = {foo: 1}
```
10. 下面代码执行结果是什么？会报错吗？
```js
const {"0": a,"1": b} = ["foo", "bar"];
```
11. 下面代码声明了几个变量？值是多少？
```js
let { a: { b: { c }}} = { a: { b: { c: "1",d: "2"}}}
```
12. 数组解构的核心是什么？请自学 Generator 函数 回答下面代码返回什么
```js
function* count() {
    let i = 1
    while (true) {
        yield i++;
    }
}
let [first, second, third, fourth, fifth, sixth] = count();
```
13. 字符串可以解构吗？结合下面代码说说为什么？
```js
const [a, b, c, d, e] = 'hello';
```
14. 什么是箭头函数？它和 function 声明的函数有什么区别？

15. 下面代码输出的是什么？为什么？

```js
var a = 2
var obj = {
    a : 1,
    fun : function () {
        console.log(this.a)
    }
}
var obj2 ={
    a : 3
}
obj.fun()          // ?
var fun = obj.fun;
fun()              // ?
obj2.fun = obj.fun
obj2.fun()         // ?
```
16. 下面代码输出的是什么？为什么？

```js
var a = 2
var obj = {
    a : 1,
    fun : () => {
        console.log(this.a)
    }
}
var obj2 ={
    a : 3
}
obj.fun()          // ?
var fun = obj.fun;
fun()              // ?
obj2.fun = obj.fun
obj2.fun()         // ?
```

17. 箭头函数的this静态绑定是什么含义？和this的动态绑定有什么区别？请写出示例代码说明区别

18. 下面代码输出是什么？结合前几题，试理解this静态绑定的绑定规则。

```js
var id = 2;
function foo() {
    return () => {
        console.log('id:', this.id);
    };
}
foo.call({id: 1})()
```
19. 对于function声明的函数，如果想实现箭头函数的this静态绑定，需要怎么做？

20. 什么是柯里化(currying)，它有什么作用？

21. 下面代码输出的是什么？为什么？

```js
let fun1 = i => i*2
let fun2 = i => {i*2}
console.log(fun1(1))   // ?
console.log(fun2(1))   // ?
```

22. 以下递归函数在调用 factorial(50000) 时会报错吗？如果会，应该如何修改此函数（改造后的函数还需为递归函数），使其满足尾递归性质而不会栈溢出。

```js
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
```