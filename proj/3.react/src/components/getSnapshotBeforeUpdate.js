import React from 'react';

/**
 * 1. 在更新前记录内容的高度  300px
 * 2. 更新后 scrollTop = scrollTop + (现在内容高度 - 300px)
 */
export default class GetSnapshotBeforeUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {messages:[]};
    }
    componentDidMount(){
        setInterval(()=>{
            // this.setState({messages:[this.state.messages.length,...this.state.messages]})
            this.setState({messages:[...this.state.messages,this.state.messages.length]})
        },1000)
    }
    getSnapshotBeforeUpdate(){
        // 返回原来内容的高度 300px
        return this.wrapper.current.scrollHeight;
    }
    // 组件更新完毕
    componentDidUpdate(prevProps, prevState, prevScrollHeight){
       this.wrapper.current.scrollTop = this.wrapper.current.scrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
    }
    render() {
        let style = {
            height: '100px',
            width: '200px',
            border: '1px solid red',
            overflow: 'auto'
        }
        return (
            <ul style={style} ref={this.wrapper}>
                {
                    this.state.messages.map((msg,index)=><li key={index}>{msg}</li>)
                }
            </ul>
        )
    }
}