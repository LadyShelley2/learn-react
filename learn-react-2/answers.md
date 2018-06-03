#### 1. babel 是什么，我们为什么要使用 babel？

Babel是一个javascript 编译器，可以将较新的JS语法特性编译成较低版本，例如将ES6编译成ES5。使用babel可以在编码中提前使用JS新特性，提高编码效率。

#### 2. 我们使用 babel 把 es6 的代码编译为 es5代码后，为什么还需要引入 polyfill？

babel只能编译基本语法，例如ES6中的箭头函数，但如果想使用一些新特性类，例如`Promise`，或者一些类中新增的方法，例如`Array.from`，则需要引入polyfill。

#### 3. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码
```js
 var v='Hello World'

 (function(){
     console.log(v)
     var v='I love you'
 })()
```
答：`undefined`,var会变量提升到函数内第一行，如果函数内没有`var v='I love you'`,会打印出来`Hello World`

```js
 var v='Hello World'

 (function(){
     var v
     console.log(v)
     v='I love you'
 })()
```

#### 4. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码

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
答：会打印

```js
ƒ foo(){ 
         console.log("我来自 foo")
     }
10
10
```
对foo的声明有一次变量提升和一次函数提升。Js解释器实际执行等效代码如下:
```js
function main(){ 
    var foo
    
    function foo(){ 
        console.log("我来自 foo")
    }
    console.log(foo)     
    foo = 10
    console.log(foo)      
    console.log(foo)      
 }
 main()
```

#### 5. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码

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
答：会打印如下：
```
undefined
20
undefined
30
20
```
a 会有两次变量提升。

```js
var a;
a = 10;
 function main(){
    var a
    console.log(a);        
    a = 20;
    console.log(a);        
    (function(){
        var a; 
        console.log(a);     
        a = 30;
        console.log(a);     
    })()
    console.log(a);        
 }
 main()
 ```



#### 6. 为什么点击所有的button打印出来的都是5而非0,1,2,3,4？要怎么修改？

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

答：实际运行中，i会变量提升，实际运行代码效果如下：

```js
 var buttons = $("button")
 var i;
 for(i=0;i<buttons.length;i++){
     buttons[i].onclick = function(){
         console.log(i)
     }
 }
```
`onclick`事件绑定的函数中的i为全局i,且函数在事件发生时执行，事件发生时`i`值已经变成`buttons.length`，为5。修改方法为改为`let`，或使用闭包，如下

```js
 var buttons = $("button")
 for(let i=0;i<buttons.length;i++){// var 改为 let
     buttons[i].onclick = function(){
         console.log(i)
     }
 }
```
```js
 var buttons = $("button")
 for(var i=0;i<buttons.length;i++){
     buttons[i].onclick = ((j)=>{
        return function(){
         console.log(j)
     }
    })(i)
}
```

#### 7. 什么是解构？数组解构是什么？

解构是ES6语法中规定可以按照一定模式从数组和对象中提取值，并对变量进行赋值的过程。本质上可以看作是模式匹配，只要等号左右两边的模式匹配，就会将右边的值赋给左边。数组解构是在等号左边给出与数组结构对应的模式，则可以获得数组中的值，如：

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3
```
注意，如果右边没有左边变量对应值，则会返回`undefined`

#### 8. 什么是解构默认值？怎样使用？

解构中左边的变量可以赋值默认值，如果当返回值是undefined的时候，则变量值为默认值。但如果返回值是null,则不会采用默认值。
案例如下：

```js
let [foo = true]=[]
```

#### 9. 下面代码执行会报错吗？为什么？

```js
 let foo;
 let {foo} = {foo: 1}
```

答：会报错，`let`与`var`不同，不可重复声明变量。

#### 10. 下面代码执行结果是什么？会报错吗？
```js
const {"0": a,"1": b} = ["foo", "bar"];
```

答：不会报错，执行结果为`a='foo',b='bar'`

#### 11. 下面代码声明了几个变量？值是多少？
```js
let { a: { b: { c }}} = { a: { b: { c: "1",d: "2"}}}
```
答：1个变量，`c='1'`,其他的`a`和`b`为模式，并不是变量。如需赋值，应写成如下形式：

```js
let { a,a: { b,b: { c }}} = { a: { b: { c: "1",d: "2"}}}
```
#### 12. 数组解构的核心是什么？请自学 Generator 函数 回答下面代码返回什么
```js
function* count() {
    let i = 1
    while (true) {
        yield i++;
    }
}
let [first, second, third, fourth, fifth, sixth] = count();
```

答：数组解构的核心是按照元素的对应位置进行赋值，本质上是迭代器不断`next`取到下一个值，并赋值给变量的过程。输出内容为：
```js
 [1, 2, 3, 4, 5, 6]//分别对应6个变量。
```
#### 13. 字符串可以解构吗？结合下面代码说说为什么？
```js
const [a, b, c, d, e] = 'hello';
```
答:可以，字符串本质是字符`char`的数组。数组可解构，所以字符串也可解构。

#### 14. 什么是箭头函数？它和 function 声明的函数有什么区别？

答：ES6 中允许使用`()=>{}`形式定义函数。由于`=>`形似箭头，所以称之为箭头函数。

箭头函数与`function`声明的函数相比，主要有以下几个区别：

1. JS中`function`指向为动态，运行时才能确定具体指向谁，往往会带来莫名其妙的错误。而箭头函数`this`固定指向该函数，不会动态变化。
2. 箭头函数不可当作构造函数，即不可使用`new`命令。
3. 不可使用`auguments`对象，该对象在函数体内不存在，如果要用可以用`rest`参数替代。
4. 不可以使用`yield`命令，因此不能用做`generator`函数

#### 15. 下面代码输出的是什么？为什么？

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
答：如下：
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
obj.fun()          // 1 obj调用fun,因此 this 指向 obj 的作用域，存在a:1
var fun = obj.fun;
fun()              // 2 fun 在全局作用域中调用，因此指向全局 a, a:1
obj2.fun = obj.fun
obj2.fun()         // 3 obj2 调用 fun, 因此 this 指向 obj2 的作用域，存在 a:3
```
#### 16. 下面代码输出的是什么？为什么？

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
答：

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
obj.fun()          // 2
var fun = obj.fun;
fun()              // 2
obj2.fun = obj.fun
obj2.fun()         // 2
```
对象没有作用域，因此`this`指向全局作用域，`a`输出为2。

#### 17. 箭头函数的this静态绑定是什么含义？和this的动态绑定有什么区别？请写出示例代码说明区别

答：箭头函数 this 静态绑定是指 this 绑定在函数声明时的作用域，而 this 的动态绑定是指 this 指向运行时的作用域。示例代码如下：

```js

var a = 1;
var obj={
    a:2,
    fun:function(){
        console.log(this.a)
    }
}
var obj2={a:3}
var obj3={a:'hello world'}

obj.fun() // 2 this 指向 obj 作用域
fun = obj.fun
obj2.fun=fun
obj2.fun() // 3 this 指向 obj2 作用域

```

```js

var a = 1;
var obj={
    a:2,
    fun:()=>{
        console.log(this.a)
    }
}
var obj2={a:3}
var obj3={a:'hello world'}

obj.fun() // 1  this 的作用域始终指在全局作用域
fun = obj.fun
obj2.fun=fun
obj2.fun() // 1

```


#### 18. 下面代码输出是什么？结合前几题，试理解this静态绑定的绑定规则。

```js
var id = 2;
function foo() {
    return () => {
        console.log('id:', this.id);
    };
}
foo.call({id: 1})()
```
答：输出为1, 静态绑定时 this 指向声明时作用域，此示例中指向函数 foo 的作用域， foo 调用 call 函数

#### 19. 对于function声明的函数，如果想实现箭头函数的this静态绑定，需要怎么做？

答： 使用闭包和立即执行函数，声明函数时就将指向当前作用域的`this`当作参数传入立即执行函数，并返回一个静态指向声明时当前作用域的函数。

```js
var a =1;
obj={
    a:2,
    fun:(function(that){
        return function(){            
            console.log(that.a)
        }
    })(this)
}
obj.fun()
```

#### 20. 什么是柯里化(currying)，它有什么作用？

柯里化（currying）指的是将一个多参数的函数拆分成一系列函数，每个拆分后的函数都只接受一个参数（unary）。
柯里化可以带来如下好处：
* 小的代码段可以被轻松配置和复用，并且不会带来杂乱；
* 函数的使用会贯穿始终。

#### 21. 下面代码输出的是什么？为什么？

```js
let fun1 = i => i*2
let fun2 = i => {i*2}
console.log(fun1(1))   // ?
console.log(fun2(1))   // ?
```

答：输出为
```js
2
undefined
```
因为箭头函数的函数体如果只有一句且不用{}包着，则该语句默认为箭头函数的返回值，否则的话需要用return语句指定返回值。`fun2`并未指定返回值，因此为undefined。

#### 22. 以下递归函数在调用 factorial(50000) 时会报错吗？如果会，应该如何修改此函数（改造后的函数还需为递归函数），使其满足尾递归性质而不会栈溢出。

```js
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
```

答：会
```js
function factorial(n,acc){
    if(n===1) return acc;
    return factorial(n-1,acc*n)
}
factorial(n,1)
```