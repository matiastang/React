import React from 'react';

class RefTest extends React.Component {

    inputRef = React.createRef();

    clickConsole = () => {
        console.log(`input输入值为：${this.inputRef.current.value}`);
        console.log(`number输入值为：${this.inputRef.current.value}`);
        // this.refs.stringRef
    }

    render() {
        return (
            <div>
                {/* <input type="text" ref="stringRef"/> */}
                <input type="text" ref={ this.inputRef }/>
                <input type="number" ref={(dom) => this.inputDomRef = dom }/>
                <button onClick={ this.clickConsole }>点击打印输入内容</button>
            </div>
        );
    };
}

export default RefTest;