1. JSX中以下代码编译到 ES5 的结果是什么？

	```
	<h1>Hello, world!</h1>
	```

	答： 
	```js
	React.createElement(
		"h1",
		null,
		"Hello,world!"
	)
	```

2. `render` 函数的返回值是 HTML 文档吗？如果不是 HTML 文档，那是什么？

	答：不是HTML，是JSX 

3. 如何让一个 component 绑定一个动态属性？请给出 demo 代码，并解释

	答：

	```js
	import React from 'react';
	import { render } from 'react-dom';

	const title = "myh1"

	const App = () => (
		<h1 title={title}>Hello world! </h1>
	);

	render(<App />, document.getElementById('root'));
	```
	自定义组件 App 中的`h1`标签动态绑定`title`属性值

4. 使用 function 声明的组件和使用 class 声明的组件有何异同？

	答：利用 function 声明的组件是无状态的，不需要管理状态 `state`，数据直接通过`props`传入。具有以下特征：

	* 组件不会被实例化，整体渲染性能提升
	* 组件不能访问`this`对象
	* 组件无法访问生命周期方法
	* 只能访问输入的 `props`，同样的`props`渲染结果相同，不会有副作用

	利用`class`声明的组件可以管理`state`，可以实现更复杂的组件，注意需要手动将事件绑定`this`。

	在实际开发过程中，只要可以使用无状态组件创建则优先使用无状态组件创建，否则就使用 React.Component 创建。

5. 在 JSX 中如何表示循环和分支逻辑？请给出 demo 代码，并解释

	答：

	循环逻辑可以使用`js`中的`map`函数实现：

	```jsx
	[1,2,3].map(i=><li>i</li>)
	```

	分支逻辑可以使用三元运算符或者`js`中的`&&`实现，如：

	```js
	{this.state.number > 10 && <h1>number>10</h1>} 
	```
	```js
	this.state.number>10?<h1>number>10</h1>:null
	```

6. 什么是模型（数据）决定视图？请用一共公式表示，并给出相应的解释

	答：视图是数据的函数，相同的数据对应相同的视图。 f(数据)=视图，只有数据确定，则视图一定是确定的。

7. 当视图更新时，React 会重新渲染全部的 dom 吗？如果不会，React 怎么更新 dom？使用的算法是什么？复杂度是多少？

	答：不会，react 实现了 diff 算法，差量更新DOM。复杂度为 O(n)。基本思想是假设DOM操作不会跨层级，因此只要同层级比较，每层比较过程中都有 增加、删除、移动三种操作。而传统的 diff 算法负责度为 O(n^3)，不仅要比较同层元素还要比较父级和子级元素。

8. 如何指定组件的初始状态（state）？如何更新组件状态？请给出 demo 代码，并解释

	答：在组件类声明`state`变量并初始化。更新组件状态时使用`this.setState()`函数。Demo 如下：

	```jsx

	class Clock extends React.Component {

		//指定组件的初始状态
		state = { date: new Date() };

		//更新组件状态
		update(){
			this.setState({date:new Date()})
		}

		render() {
			return <h1>{this.state.date.toString()}</h1>;
		}
	}

	```


9. 直接使用 this.state.xxx 修改组件状态视图会更新吗？为什么？

	答：不会，react 通过 setState 函数通知框架发出 render 函数重新渲染，而 setState 实际上是异步修改状态，将要修改的状态放入一个队列，出于性能考虑可能会将多次修改合并为一次修改。另外不允许直接使用 `this.state.xxx`直接修改视图可能跟 react 主张的 immutable 有关系。

10. state(状态) 更新可能是异步的，会带来哪些问题？如何解决这些问题？

	答：`state`的更新是将要修改的属性放在一个队列中，然后异步更新，出于性能优化等原因，可能会出现批量更新的情况。因此会出现如下问题：

	* 不能直接使用 state 原来的值计算 state 的新值。如：

		```js
		this.setState({
			counter:this.state.counter+this.props.increment
		})
		```

		示例代码：

		```js
		update(){
			this.setState({number:this.state.number+1})
			this.setState({ number: this.state.number + 1 })
		}
		```

		由于`state`是异步更新，因此多次更新的时候回出现读入脏数据的现象。

		`setState`的另外一种用法是可以传入一个接收之前的 `state`和`props` 为参数的函数, 如下形式替代：

		```js
		this.setState((prevState,props)=>{
			counter:prevState.counter + props.increment
		})
		```
		如示例代码更改为：

		```js
		update(){
			this.setState((prevState) => ({
				number: prevState.number + 1
			}))
			this.setState((prevState) => ({
				number: prevState.number + 1
			}))
		}
		```
11. 如何让数据在组件树里从上向下流动？从下向上流动又该如何实现哪？请给出 demo 代码，并解释

	答：组件由上向下直接通过 `props`传递数据，由下向上通过子组件的属性绑定一个父组件的函数，该函数操作父组件内的数据，当子组件想要把数据传给父组件时则调用该函数。

	```js
	import React from "react";
	import { render } from "react-dom";

	class MyCounter extends React.Component{
		render(){
			return (
				<h1>{this.props.counter}</h1> 
			)
		}
	}
	class MyButton extends React.Component{
		render(){
			return (
				<button onClick={this.props.onClick}>Click me</button>
			)
		}
	}
	class Clock extends React.Component {
		state = { number : 1 };

		update(){
			this.setState((prevState) => ({
				number: prevState.number + 1
			}))
		}

		render() {
			return (
				<div>
					<MyCounter counter ={this.state.number}/> 
					<MyButton onClick={this.update.bind(this)} >Click me!</MyButton> 
				</div>
				);
		}
	}

	render(<Clock />, document.getElementById("root"));

	```

## 代码题

1. https://codesandbox.io/s/wpmrqml2w

2. https://codesandbox.io/s/y09lzpx90z

3. https://codesandbox.io/s/0y4lvvk6xp