<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-17 21:52:29
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-17 22:08:07
 * @Description: 副作用
-->
# 副作用

## 纯函数

`纯函数（Pure function）`：**返回结果只依赖于它的参数，而且没有任何可观察的副作用。函数与外界交流数据只有一个唯一渠道——参数和返回值。**

* 给纯函数传入相同的参数，永远会返回相同的值。如果返回值依赖外部变量，则不是纯函数。

## 副作用

**一个函数在执行过程中产生了外部可观察的变化，则这个函数是有副作用(Side Effect)的。**通俗点就是函数内部做了和运算返回值无关的事，比如`修改外部作用域/全局变量`、`修改传入的参数`、`发送请求`、`console.log`、`手动修改 DOM` 都属于副作用。

纯函数很严格，你几乎除了计算数据什么都不能干，计算的时候还不能依赖自身参数以外的数据。

这个概念拿到 React 中，就是一个 Pure component("纯"组件) 得到相同的 props，永远会渲染出相同的视图，并且没有其他副作用。纯组件的好处是，容易监测数据变化、容易测试、提高渲染性能等。
这里的“纯组件”指的并不是继承自React.PureComponent的class组件——React.PureComponent 和 React.Component的区别是它通过对象浅层对比自动实现shouldComponentUpdate()，即赋予它相同的state和props不会重复渲染，可以提高性能。但只有在state和props中的数据均结构简单(非引用数据类型)时才适用。

在函数组件中，我们用`useEffect Hook`代替componentDidMount，componentDidUpdate 和 componentWillUnmount 来处理副作用操作。

## Effect Hook

[Effect Hook](https://zh-hans.reactjs.org/docs/hooks-effect.html)

`Effect Hook` 可以让你在函数组件中执行副作用操作

`useEffect 做了什么？` 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。

`为什么在组件内部调用 useEffect？` 将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。

`useEffect 会在每次渲染后都执行吗？` 是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行。（我们稍后会谈到如何控制它。）你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

经验丰富的 JavaScript 开发人员可能会注意到，传递给 useEffect 的函数在每次渲染中都会有所不同，这是刻意为之的。**事实上这正是我们可以在 effect 中获取最新的 count 的值，而不用担心其过期的原因。每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。**我们将在本章节后续部分更清楚地了解这样做的意义。

**提示**: 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同。

### 清除副作用

`为什么要在 effect 中返回一个函数？` 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

`React 何时清除 effect？` React 会在组件`卸载`的时候执行`清除`操作。正如之前学到的，`effect 在每次渲染的时候都会执行`。这就是为什么 React 会在`执行当前 effect 之前对上一个 effect 进行清除。` 我们稍后将讨论为什么这将助于避免 bug以及如何在遇到性能问题时跳过此行为。

### 作用

使用 `Hook` 其中一个`目的`就是要解决 `class` 中生命周期函数经常包含不相关的逻辑，但又**把相关逻辑分离到了几个不同方法中的问题**。