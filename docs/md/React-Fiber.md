<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-28 09:46:36
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-28 11:41:01
 * @Description: React Fiber
-->
# React Fiber

[React Fiber 参考](https://zhuanlan.zhihu.com/p/98295862)
[React Fiber 参考](https://segmentfault.com/a/1190000018250127)

## React15问题

在页面元素很多，且需要频繁刷新的场景下，`React 15` 会出现掉帧的现象。[stack Example和Fiber Example对比](https://claudiopro.github.io/react-fiber-vs-stack-demo/)

![stack Example](./imgs/stackExample.gif)

其根本原因，是大量的同步计算任务阻塞了浏览器的 UI 渲染。默认情况下，JS 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。

针对这一问题，React 团队从框架层面对 web 页面的运行机制做了优化，得到很好的效果。

![Fiber Example](./imgs/FiberExample.gif)

## React 16 

`React 16`使用了`Fiber`

旧版 `React` 通过递归的方式进行渲染，使用的是 `JS` 引擎自身的函数调用栈，它会一直执行到栈空为止。而`Fiber`实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的`暂停`、`继续`和`丢弃`执行的任务。实现方式是使用了浏览器的[`requestIdleCallback`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)这一 `API`。官方的解释是这样的：
`window.requestIdleCallback()`会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行`后台`或`低优先级`的任务，而且不会对像`动画`和`用户交互`这些延迟触发但关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。

## 

`React` 框架内部的运作可以分为 3 层：

* `Virtual DOM` 层，描述页面长什么样。
* `Reconciler` 层，负责调用组件生命周期方法，进行 `Diff` 运算等。
* `Renderer` 层，根据不同的平台，渲染出相应的页面，比较常见的是 `ReactDOM` 和 `ReactNative`。

`React 16`这次改动最大的当属 `Reconciler` 层了，`React` 团队也给它起了个新的名字，叫`Fiber Reconciler`。这就引入另一个关键词：`Fiber`。

Fiber 其实指的是一种数据结构，它可以用一个纯 JS 对象来表示：
```js
const fiber = {
    stateNode,    // 节点实例
    child,        // 子节点
    sibling,      // 兄弟节点
    return,       // 父节点
}
```
为了加以区分，以前的 Reconciler 被命名为Stack Reconciler。Stack Reconciler 运作的过程是不能被打断的，必须一条道走到黑：

![StackReconciler执行](./imgs/StackReconciler执行.png)

而 Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器，可以分段执行：

![FiberReconciler执行](./imgs/FiberReconciler执行.png)

为了达到这种效果，就需要有一个调度器 (Scheduler) 来进行任务分配。任务的优先级有六种：

* synchronous，与之前的Stack Reconciler操作一样，同步执行
* task，在next tick之前执行
* animation，下一帧之前执行
* high，在不久的将来立即执行
* low，稍微延迟执行也没关系
* offscreen，下一次render时或scroll时才执行

优先级高的任务（如键盘输入）可以打断优先级低的任务（如Diff）的执行，从而更快的生效。

Fiber Reconciler 在执行过程中，会分为 2 个阶段。

![FiberReconciler在执行过程](./imgs/FiberReconciler在执行过程.png)

* 阶段一，生成 `Fiber` 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
* 阶段二，将需要更新的节点一次过批量更新，这个过程不能被打断。
阶段一可被打断的特性，让优先级更高的任务先执行，从框架层面大大降低了页面掉帧的概率。

## Fiber 树
Fiber Reconciler 在阶段一进行 Diff 计算的时候，会生成一棵 Fiber 树。这棵树是在 Virtual DOM 树的基础上增加额外的信息来生成的，它本质来说是一个链表。

![Fiber 树](./imgs/Fiber树.png)

`Fiber` 树在首次渲染的时候会一次过生成。在后续需要 `Diff` 的时候，会根据已有树和最新 `Virtual DOM` 的信息，生成一棵新的树。`这颗新树每生成一个新的节点，都会将控制权交回给主线程`，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程：

![Fiber 更新](./imgs/Fiber更新.png)

如果过程中有优先级更高的任务需要进行，则 `Fiber Reconciler` 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

在构造 `Fiber` 树的过程中，`Fiber Reconciler` 会将需要更新的节点信息保存在`Effect List`当中，在阶段二执行的时候，会批量更新相应的节点。

## 疑问

1. 解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制是在gui渲染线程执行的。js引擎线程负责解析js脚本，运行代码。
2. 浏览器没有所谓的gui渲染线程，只有渲染进程，渲染进程下有主线程、工作、排版、光栅线程等。其中dom树构建、布局、绘制，包括js的执行都是在主线程下。
3. 目前webkit在实现的时候，渲染与js的确是两个线程。只是这两个线程是互斥的。