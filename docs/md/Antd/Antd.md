<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-03 17:09:42
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-07 16:14:08
 * @Description: Antd
-->
# Antd

## 使用问题记录

### Upload

#### 受控模式 onChange 只调用一次的问题

[受控模式 onChange 只调用一次的问题](https://github.com/ant-design/ant-design/issues/2423)
**对于受控模式，你应该在 onChange 中始终 setState fileList，保证所有状态同步到 Upload 内。**类似这里的写法：http://ant.design/components/upload/#components-upload-demo-fileList
```jsx
// good

onFileChange(fileList) {
  if ( ... ) {
    ...
  } else {
    ...
  }
  // always setState
  this.setState({ fileList: [...fileList] });
}

...

<Upload fileList={this.state.fileList} onChange={this.onFileChange} />
// bad

onFileChange(fileList) {
  if ( ... ) {
    this.setState({ fileList: [...fileList] });
  } else {
    ...
  }
}

...

<Upload fileList={this.state.fileList} onChange={this.onFileChange} />
```
建议研习受控组件概念：https://facebook.github.io/react/docs/forms.html#controlled-components

#### 受控模式初始化已上传列表

受控模式初始化已上传列表，需要列表中有`uid`、`name`、`status`等字段。
```jsx
getFileList = async () => {
    let res = await getFiles();
    /*
    lastModified: 1622798352419
    lastModifiedDate: Fri Jun 04 2021 17:19:12 GMT+0800 (中国标准时间) {}
    name: "txtTest.txt"
    originFileObj: File {uid: "rc-upload-1622800784366-2", name: "txtTest.txt", lastModified: 1622798352419, lastModifiedDate: Fri Jun 04 2021 17:19:12 GMT+0800 (中国标准时间), webkitRelativePath: "", …}
    percent: 100
    response: {success: true, statusCode: 1000, message: "成功", data: "ed0b84dbdcd68924da314bed0ad302e3.txt"}
    size: 21
    status: "done"
    type: "text/plain"
    uid: "rc-upload-1622800784366-2"
    xhr: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
    */
    this.setState({
        uploadFileList: isArray(res) ? res.map((item) => {
            return {
                ...item,
                uid: `rc-upload-${item.id}`,
                name: `${item.fileName}`,
                status: 'done',
                url: ''
            };
        }) : []
    });
}
/**
  * 文件状态改变
  * @param {*} param0 
  */
uploadOnChange = ({ file, fileList }) => {
    if (file.status !== 'uploading') {
        let uploadFiles = fileList.filter(() => {
            return file.status === 'uploading';
        });
        // 没有处于上传中的
        if (uploadFiles.length <= 0) {
            this.setState({
                fileUpdateDisabled: false
            });
        }
    }
    // 对于受控模式，你应该在 onChange 中始终 setState fileList，保证所有状态同步到 Upload 内。
    this.setState({
        uploadFileList: uniqBy(fileList.reverse(), 'name').reverse()
    });
};
```
**说明**`uploadFileList: uniqBy(fileList.reverse(), 'name').reverse()`,是例子中需要通过`name`去重，保留最后的文件，所以使用`reverse()`反转，也可以自己实现去重，比较简单。

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