<!--
 * @Descripttion: 
 * @version: 
 * @Author: matias tang
 * @Date: 2020-09-17 16:11:29
 * @LastEditors: matias tang
 * @LastEditTime: 2020-09-17 16:13:37
-->
<!-- TOC -->

- [History](#history)
    - [介绍](#介绍)
    - [属性](#属性)
    - [方法](#方法)

<!-- /TOC -->
# History

[History](https://developer.mozilla.org/zh-CN/docs/Web/API/History)

## 介绍

`History` 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。

## 属性
`History` 接口不继承于任何属性。

`History.length` 只读
返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回1。
`History.current` 只读  已废弃 Gecko 26
返回一个代表`session`历史记录中活动的项目`URL`的`DOMString`，这个属性永远对`web`内容不可用并且已经不再被任何浏览器支持。可以使用`Location.href`来代替它。
`History.next` 只读  已废弃 Gecko 26
返回一个代表`session`历史记录中后一个项目`URL`的`DOMString`。这个属性永远对`web`内容不可用并且不被其他浏览器支持。
`History.previous` 只读  已废弃 Gecko 26
返回一个代表`session`历史记录中前一个项目`URL`的`DOMString`。这个属性永远对`web`内容不可用并且不被其他浏览器支持。
`History.scrollRestoration`
允许`Web`应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。
`History.state` 只读
返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待`popstate` 事件而查看状态的方式。

## 方法

`History`接口不继承任何方法。

`History.back()`
前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 `history.go(-1)`.
Note: 当浏览器会话历史记录处于第一页时调用此方法没有效果，而且也不会报错。
`History.forward()`
在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 `history.go(1)`.
Note: 当浏览器历史栈处于最顶端时( 当前页面处于最后一页时 )调用此方法没有效果也不报错。
`History.go()`
通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。比如：参数为-1的时候为上一页，参数为1的时候为下一页. 当整数参数超出界限时( 译者注:原文为When integerDelta is out of bounds )，例如: 如果当前页为第一页，前面已经没有页面了，我传参的值为-1，那么这个方法没有任何效果也不会报错。调用没有参数的 go() 方法或者不是整数的参数时也没有效果。( 这点与支持字符串作为url参数的IE有点不同)。
`History.pushState()`
按指定的名称和URL（如果提供该参数）将数据`push`进会话历史栈，数据被`DOM`进行`不透明处理`；你可以指定任何可以被序列化的javascript对象。注意到Firefox现在忽略了这个title参数，更多的信息，请看manipulating the browser history。
Note: 在 Gecko 2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1) 到 Gecko 5.0 (Firefox 5.0 / Thunderbird 5.0 / SeaMonkey 2.2)中， 被传递的对象使用JSON进行序列化. 从 Gecko 6.0 (Firefox 6.0 / Thunderbird 6.0 / SeaMonkey 2.3)开始，使用结构化克隆算法进行序列化。这样，就可以让更多类型的对象被安全地传输。
`History.replaceState()`
按指定的数据，名称和URL(如果提供该参数)，更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。你可以指定任何可以被序列化的javascript对象。注意到Firefox现在忽略了这个title参数，更多的信息，请看manipulating the browser history。
Note: 在 Gecko 2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1) 到 Gecko 5.0 (Firefox 5.0 / Thunderbird 5.0 / SeaMonkey 2.2) 中, the passed object is serialized using JSON. Starting in Gecko 6.0 (Firefox 6.0 / Thunderbird 6.0 / SeaMonkey 2.3), the object is serialized using the structured clone algorithm. This allows a wider variety of objects to be safely passed.