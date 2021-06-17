<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-17 22:26:03
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-17 22:29:20
 * @Description: React 受控组件和非受控组件
-->
# React 受控组件和非受控组件

[非受控组件](https://zh-hans.reactjs.org/docs/uncontrolled-components.html)


在大多数情况下，我们推荐使用 `受控组件` 来处理表单数据。在一个受控组件中，表单数据是由 `React` 组件来管理的。另一种替代方案是使用`非受控组件`，这时表单数据将交由 `DOM` 节点来处理。

因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。