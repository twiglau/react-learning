import React, { Component } from 'react'

// Header
function Header() {
  return <h2>我是header组件</h2>
}

// Footer
function Footer() {
  return <h2>我是Footer组件</h2>
}

// Banner
function Banner() {
  return <h2>我是Banner组件</h2>
}

// ProductList
function ProductList() {
  return (
    <ul>
      <li>茶品1</li>
      <li>茶品1</li>
      <li>茶品1</li>
      <li>茶品1</li>
    </ul>
  )
}
// Main
function Main() {
  return (
    <div>
    <Banner />
    <ProductList />
    </div>
  )
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}
