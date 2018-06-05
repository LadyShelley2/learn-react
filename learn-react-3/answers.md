1. Symbol 是什么？有哪些使用场景？

    答：Symbol 是 ES6 引入的一种新的数据类型，表示独一无二的值。主要被用作属性名。如果想要在一个现有对象上添加新的方法，则防止属性名冲突是非常必要的，而 Symbol 函数产生的值都是独一无二的，因此可以用 Symbol 类型作为属性名。

2. Symbol("foo") == Symbol("foo")输出什么？为什么？

答： 输出`false`,因为Symbol函数传入的参数只是用于标识，并不会影响输出值，因此多次调用输出结果会不同。如果想要输出结果相同，可以用`Symbol.for("foo")`

3. Symbol.iterator 是什么？这里为什么要使用 Symbol 那？

答; Symbol.iterator 是ES6 中的一个内建属性，只要一个数据结构有 `Symbol.iterator`属性，该数据结构是可遍历的，执行该函数可以返回一个迭代器。`Symbol.iterator`统一了迭代器的访问机制，即迭代器都可以使用 `for...of...`进行迭代。

4. 数组解构的核心本质是什么？哪些对象（容器）可以作为数组解构的右值？（此题请自学完成）

答： 数组本身也是对象，与普通对象按照 `key`解构同理，数组是以`index`为`key`解构并重命名。如：
```js
let arr = [1,2,3]
let [a,b,c]=arr
//等价于
let [1:a,2:b,3:c]=arr
```
而解构赋值实际上都是 iterator， 因此只要一个数据结构有`Symbol.iterator`属性或其他返回`iterator`的函数，如 `generator`函数，便可以作为数组解构的右值。

5. Promsie 对象有几种状态？他们之间是怎么转换的？

答：有`pending`,`fulfilled`,`reject`三种状态，`promise`可以从`pending`转换成其他两种状态中的一种，但一旦转换状态不会再改变。

6. 下面代码的输出结果是什么？为什么？（饿了么面试题）
  ```js
  setTimeout(function() {
      console.log(1)
  }, 0);
  new Promise(function executor(resolve) {
      console.log(2);
      for( var i=0 ; i<10000 ; i++ ) {
          i == 9999 && resolve();
      }
      console.log(3);
  }).then(function() {
      console.log(4);
  });
  console.log(5);
  ```
  答：2,3,5,1,4。JS是单线程模型，在执行过程中会将异步函数添加到消息队列，

6. 什么是 Promise 对象？引入 Promise 对象是为了解决什么？

7. Promise.all 和 Promise.race 的区别是什么？（此题请自学完成）

8. Promise 中抛出未处理的异常会怎么样？会阻碍后面的代码执行吗？Chrome 和 Node.js 环境下有什么不同？

9. Promise.catch 方法中再抛出异常会怎么样，需要怎样捕捉？

10. then 的链式调用每次返回的是同一个 Promise 对象吗？请写一小段代码证明你的观点

11. 什么是 Generator 函数？和普通函数有什么区别？怎么声明 Generator 函数？

12. 怎样调用 Generator 函数并逐步执行 Generator 代码？

13. Generator 函数实现无限序列原理是什么？

14. Generator 函数怎么实现函数内的数据与函数外进行交互的？请从函数内数据传至函数外，和函数外数据传至函数内 两个方面说明

15. yield* 有什么用？它和 yield 有什么关系？（此题请自学完成）

16. 怎么迭代出 Generator 函数所有值？请使用 for of 循环实现

17. 为什么要使用 Generator 函数 或者 async/await 进行异步控制流，对比 callback 和 Promise 方案，主要解决了什么问题？

18. Generator 函数为什么能实现异步控制流？其原理是什么？

19. 什么是 Thunk 函数？为什么使用 Thunk 函数可以通过和 Generator 函数配合实现异步控制流？(此题请自学完成)

20. 使用 Promise 可以配合 Generator 函数实现异步控制流吗？具体原理是什么？

21. 真正发出异步操作指令是在 Generator 函数外还是在 Generator 函数内？（HINT: 基于 Thunk 函数和基于 Promise 两种 Generator 函数异步控制流，情况不一样）

22. async 函数是什么？它和 Generator 函数有什么关系？

23. 在全局域或者普通函数中能使用 await 或 yield 关键字吗？为什么？

24. 直接调用 async 函数的返回值类型是什么？为什么？

25. 下面代码能正常捕获异步异常吗？为什么？如果不能需要怎样修改才可以正常捕获异常？

 async function f() {
     throw new Error('出错了');
 }
 try{
     f()
 }catch(e){
     console.log(e)
 }