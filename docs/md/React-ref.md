<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-10 17:48:18
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-10 21:31:22
 * @Description: React使用ref的方式
-->
# React使用ref的方式

[react refs](https://reactjs.org/docs/refs-and-the-dom.html)

## 介绍

## 使用

### string类型绑定

通过`this.refs.绑定的ref的名字`获取到节点`dom`。
**注意**，已经被废弃了。

```jsx
import React from 'react';

class RefTest extends React.Component {

    inputRef = React.createRef();

    clickConsole = () => {
        this.refs.stringRef
    }

    render() {
        return (
            <div>
                <input type="text" ref="stringRef"/>
                <button onClick={ this.clickConsole }>点击打印输入内容</button>
            </div>
        );
    };
}

export default RefTest;
```

### react.CreateRef()

在`class`中使用`React.createRef()`方法创建一些变量，可以将这些变量绑定到标签的`ref`中
那么该变量的`current`则指向绑定的标签`dom`。

```jsx
import React from 'react';

class RefTest extends React.Component {

    inputRef = React.createRef();

    clickConsole = () => {
        console.log(`input输入值为：${this.inputRef.current.value}`);
    }

    render() {
        return (
            <div>
                <input type="text" ref={ this.inputRef }/>
                <button onClick={ this.clickConsole }>点击打印输入内容</button>
            </div>
        );
    };
}

export default RefTest;
```
### 函数形式

在`class`中声明函数，在函数中绑定`ref`
**使用这种方法可以将子组件暴露给父组件以使得父组件能够调用子组件的方法**

```jsx
import React from 'react';

class RefTest extends React.Component {

    inputRef = React.createRef();

    clickConsole = () => {
        console.log(`number输入值为：${this.inputRef.current.value}`);
    }

    render() {
        return (
            <div>
                <input type="number" ref={(dom) => this.inputDomRef = dom }/>
                <button onClick={ this.clickConsole }>点击打印输入内容</button>
            </div>
        );
    };
}

export default RefTest;
```

### 函数组件中使用useRef实现

```jsx
import React, { useRef } from 'react';

const RefFuncTest = () => {

    const textInput = useRef(null);

    const clickConsole = () => {
        console.log(`input输入值为：${textInput.current.value}`);
    }

    return (
        <div>
            <input type="text" ref={ textInput }/>
            <button onClick={ clickConsole }>点击打印输入内容</button>
        </div>
    );
}

export default RefFuncTest;
```

## 总结

**注意**: `React`并不推荐过度使用`ref`，如果能通过`state`做到的事情，就不应该使用 `refs`。过度使用`ref`并不符合`数据驱动`的思想。