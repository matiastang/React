<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-10 16:52:24
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-11 10:45:59
 * @Description: React事件机制
-->
# React事件机制

[React事件机制](https://www.jianshu.com/p/c01756e520c7)
[redux 与 eventEmitter?](https://www.zhihu.com/question/53045802)
[【重要】谈谈React事件机制和未来(react-events)](https://zhuanlan.zhihu.com/p/78669634)

![事件机制](./imgs/事件机制.webp)
## 在React开发中如果有跨组件之间的事件传递，应该如何操作？
A、在Vue中我们可以通过Vue的实例，快速实现一个事件总线（EventBus），来完成操作；
B、在React中可以依赖一个使用较多的库 events 来完成对应的操作

## 介绍

当我们在组件上设置事件处理器时，React并不会在该DOM元素上直接绑定事件处理器. React内部`自定义了一套事件系统`，在这个系统上统一进行事件`订阅`和`分发`.

具体来讲，`React`利用`事件委托机制`在`Document`上统一监听`DOM`事件，再根据`触发的target`将事件分发到具体的组件实例。另外触发的`e`是一个`合成事件对象(SyntheticEvent)`, 而不是原始的`DOM事件对象`。

## 事件处理

**为了避免频繁创建和释放事件对象导致性能损耗(对象创建和垃圾回收)，React使用一个事件池来负责管理事件对象，使用完的事件对象会放回池中，以备后续的复用。**
**注意**: 在`React 17`中已经废除了**事件池**。

这也意味着，**在事件处理器同步执行完后，SyntheticEvent对象就会马上被回收，所有属性都会无效。**所以一般不会在异步操作中访问`SyntheticEvent`事件对象。你也可以通过以下方法来保持事件对象的引用：

* 调用`SyntheticEvent.persist()`方法，告诉`React`不要回收到对象池
* 直接引用`SyntheticEvent.nativeEvent`, `nativeEvent`是可以持久引用的，不过为了不打破抽象，建议不要直接引用`nativeEvent`

构建完SyntheticEvent对象后，就需要**遍历组件树来获取订阅该事件的用户事件处理器**
