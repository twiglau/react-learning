import React from 'react';
import PropTypes from 'prop-types';
class Header extends React.Component {

    // 1. 定义子上下文对象的属性和类型
    static childContextTypes = {
        name: PropTypes.string,
        age:PropTypes.number,
    }
    //2. 返回或者定义真正的子上下文
    getChildContext(){
        return {
            age: 10,
            name: 'Header'
        }
    }
    render(){
        return (
            <div style={{border: '5px solid green',padding:'5px'}}>
                Header
                <Title></Title>
            </div>
        )
    }
}
class Title extends React.Component {
    // 3. 表示或者 指定我要获取哪些上下文对象
    static contextTypes = {
        color:PropTypes.string,
    }
    render() {
        console.log(this.context)
        return (
            <div style={{border: '5px solid orange',padding:'5px', color:this.context.color}}>
                Title
                name={this.context.name}
                color={this.context.color}
                age={this.context.age}
            </div>
        )
    }
}
class Main extends React.Component {
    render(){
        return (
            <div style={{border: '5px solid blue',padding:'5px'}}>
                Main
                <Content></Content>
            </div>
        )
    }
}

class Content extends React.Component {
    // 3. 表示或者 指定我要获取哪些上下文对象
    static contextTypes = {
        color:PropTypes.string,
        setColor: PropTypes.func
    }
    render() {
        return (
            <div style={{border: '5px solid pink',padding:'5px',color:this.context.color}}>
                Content
                <button onClick={()=> this.context.setColor('red')}>变红</button>
                <button onClick={()=> this.context.setColor('green')}>变绿</button>
            </div>
        )
    }
}
export default class Page extends React.Component {
    
    constructor(){
        super()
        this.state = {color: 'purple'}
    }
    // 1. 定义子上下文对象的属性和类型
    static childContextTypes = {
        name: PropTypes.string,
        color:PropTypes.string,
        setColor:PropTypes.func
    }
    //2. 返回或者定义真正的子上下文
    getChildContext(){
        return {
            color: this.state.color,
            setColor: this.setColor,
            name: 'Page Grandpapa'
        }
    }
    setColor = (color) => {
        this.setState({color})
    }
    render() {
        return (
           <div style={{border: '5px solid red',padding:'5px'}}>
               Page
               <Header>
                   <Title>

                   </Title>
               </Header>
               <Main>
                   <Content>

                   </Content>
               </Main>
           </div> 
        )
    }
}