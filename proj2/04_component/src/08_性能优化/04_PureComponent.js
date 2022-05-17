import React, { Component, PureComponent } from 'react'

function Header(){
    console.log('header被调用')
    return <h2>~头部~</h2>
}

class Banner extends PureComponent{
    render(){
        console.log('Banner render函数被调用');
        return <h3>Banner组件</h3>
    }
}
function ProductList(){
    console.log('ProductList 被调用')
    return (
        <ul>
            <li>商品列表1</li>
            <li>商品列表2</li>
            <li>商品列表3</li>
            <li>商品列表4</li>
            <li>商品列表5</li>
        </ul>
    )
}
class Main extends PureComponent {
    render(){
        console.log('Main render函数被调用');
        return (
            <div>
                <Banner />
                <ProductList />
            </div>
        )
    }
}
function Footer(){
    console.log('footer 被调用')
    return (
        <h2>~尾部~</h2>
    )
}
export default class App extends PureComponent {
    state = {
        counter: 0
    }
  render() {
    console.log('App render函数被调用');
    return (
      <div>
        <h2>当前计数: { this.state.counter}</h2>
        <button onClick={e=>this.increment()}>加一</button>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
  increment(){
      this.setState({
          counter: this.state.counter + 1
      })
  }
}
