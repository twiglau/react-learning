import React from 'react';
import PropTypes from 'prop-types';
// 1. 系统提供
// const ThemeContext = React.createContext();
//// ThemeContext =  {Provider, Consumer} 两个组件

// 2. 手写
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
const ThemeContext = createContext();
function createContext(){
    class Provider extends React.Component {
        static value;
        $$typeof = REACT_PROVIDER_TYPE
        constructor(props){
            super(props);
            Provider.value = props.value;
            this.state = {value:props.value};
        }
        static getDerivedStateFromProps(props,state){
            Provider.value = props.value;
            return {value: props.value};
        }
        render(){
            return this.props.children;
        }
    }
    class Consumer extends React.Component {
        render() {
            return this.props.children(Provider.value);
        }
    }
    return {$$typeof:REACT_CONTEXT_TYPE,Provider,Consumer}
}

class Header extends React.Component {

    render(){
        return (
            <div style={{border: '5px solid green',padding:'5px'}}>
                Header
                <Title></Title>
            </div>
        )
    }
}
class Title1 extends React.Component {
    static contextType = ThemeContext
    render() {
        this.context = Title.contextType.Provider.value;
        console.log(this.context);
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
// 如果是函数组件
function Title(props){
    return (
        <ThemeContext.Consumer>
            {
                value=>(
                    <div style={{border: '5px solid orange',padding:'5px', color:value.color}}>
                        Title
                        name={value.name}
                        color={value.color}
                        age={value.age}
                    </div>
                )
            }
        </ThemeContext.Consumer>
    )
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
    static contextType = ThemeContext
    render() {
        this.context = Content.contextType.Provider.value;
        console.log(this.context);
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
    
    setColor = (color) => {
        this.setState({color})
    }
    render() {
        let ctx = {color:this.state.color,setColor:this.setColor};
        return (
            <ThemeContext.Provider value={ctx}>
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
            </ThemeContext.Provider>
        )
    }
}