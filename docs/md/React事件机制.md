<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-10 16:52:24
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-11 15:24:06
 * @Description: React事件机制
-->
# React事件机制

[React事件机制](https://www.jianshu.com/p/c01756e520c7)
[redux 与 eventEmitter?](https://www.zhihu.com/question/53045802)
[谈谈React事件机制和未来(react-events)](https://zhuanlan.zhihu.com/p/78669634)

## 在React开发中如果有跨组件之间的事件传递，应该如何操作？
A、在Vue中我们可以通过Vue的实例，快速实现一个事件总线（EventBus），来完成操作；
B、在React中可以依赖一个使用较多的库 events 来完成对应的操作