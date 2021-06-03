<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-03 17:09:42
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-03 17:16:55
 * @Description: Antd
-->
# Antd

## 使用问题记录

### Input

#### 获取input输入框内容

`React`中获取`Input`组件的内容有两种方式：

##### 1. 类似于原生获取
* 通过event对象信息的方式
```jsx
<input onChange={(e)=>this.inputChange(e)}/>
<button onClick={()=>this.getInputValue} >获取input的值</button>

inputChange(e){
	alert(e.target.value)
	this.setState({
		username:e.target.value
	})
}

getInputValue(){
	alert(this.state.username)
}
```

##### 2. 使用ref获取
* 使用ref获取，使用ref自定义一个属性，可以通过this.refs.属性名称.value获取内容。
```jsx
<input ref='username' onChange={()=>this.inputChange()}/>
<button onClick={()=>this.getInputValue()} >获取input的值</button>

inputChange(){
	//获取dom节点元素
	//1.添加ref属性
	//2.使用this.refs.username获取dom节点
	let val=this.refs.username.value;
	this.setState({
		username:val
	})
}

getInputValue(){
	console.log(this.state.username)
}
```

### Select

#### select 等组件可搜索问题

当使用`Select`组件时，可以添加`showSearch`属性可以实现搜索功能，但是这个搜索是搜的`Select`的`value`值的,但是`value`值在页面上是看不到的。一般用户搜索的是下拉框显示看到的内容，所以需要加上 `optionFilterProp="children"` 这个属性就可以搜索看到的内容了。
```jsx
<Select
	showSearch
	optionFilterProp="children"
>
	{
        options.map((item,index)=> {
            return <Option key={index} value={item.id}{item.name}/>;
        })
    }
</Select>
```