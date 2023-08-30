import React, { PureComponent } from 'react'

import axios from "axios"
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        products: []
    }
  }
  componentDidMount() {
    // 1. axios发送基本的网络请求
    // axios({
    //     url: "https://httpbin.org/get",
    //     params: {
    //         name: "why",
    //         age: 18
    //     }
    // }).then (res => {
    //     console.log('get: ', res)
    // }).catch(err => {
    //     console.error(err)
    // });

    // axios({
    //     url: "https://httpbin.org/post",
    //     data: {
    //         name: "kobe",
    //         age: 40
    //     },
    //     method: "post"
    // }).then(res => {
    //     console.log("post: ", res)
    // });

    // axios.get("https://httpbin.org/get", {
    //     params: {
    //         name: "lilei",
    //         age: 30
    //     }
    // }).then(console.log);

    axios.interceptors.request.use(config => {
        // 1. 发送网络请求时，在界面的中间位置显示Loading的组件
        // 2. 某些请求要求用户必须携带token, 如果没有携带，那么直接跳转到登录页面
        // 3. params/data序列化的操作
        return config
    }, err => {})

    axios.interceptors.response.use(res => {
        return res.data;
    }, err => {
        if(err && err.response) {
            switch(err.response.status) {
                case 400:
                    console.log("请求错误");
                    break;
                case 401:
                    console.log("为授权访问");
                    break;
                default:
                    break;
            }
        }
    });

    axios.post("https://httpbin.org/post", {
        name: "kobe",
        age: 40
    }).then(console.log);
  }
  render() {
    return (
      <div>App</div>
    )
  }
}
