# Ant Design 库使用

## vue 中添加 class

- vue 中添加 class 是一件非常简单的事情:
- 可以通过传入一个对象:
  ```vue
  <div
    class="static"
    v-bind:class="{ active: isActive, 'text-danger': hasError }"
  >
    
  </div>
  ```
- 也可以传入一个数组:
  ```vue
  <div v-bind:class="[activeClass, errorClass]"></div>
  ```
- 甚至是对象和数组混合使用:
  ```vue
  <div v-bind:class="[{ active: isActive }, errorClass]"></div>
  ```

## React 中添加 class

- React 在 JSX 给了我们足够多的灵活性,你可以像编写 JavaScript 代码一样,通过一些逻辑来决定是否添加某些 class:
  ```jsx
  <div>
    <h2 className={"title " + (isActive ? "active" : "")}>我是标题1</h2>
    <h2 className={["title", isActive ? "active" : ""].join(" ")}>我是标题2</h2>
  </div>
  ```
- 这个时候我们可以借助域一个第三方库: `classnames`
  > 很明显, 这是一个用于动态添加 classnames 的一个库
  ```js
  classNames("foo", "bar"); // => 'foo bar'
  classNames("foo", { bar: true }); // => 'foo bar'
  classNames({ "foo-bar": true }); // => 'foo-bar'
  classNames({ "foo-bar": false }); // => ''
  classNames({ foo: true }, { bar: true }); // => 'foo bar'
  classNames("foo", { bar: true, duck: false }, "baz", { quux: true }); // => 'foo bar baz quux'
  classNames(null, false, "bar", undefined, 0, 1, { baz: null }, ""); // => 'bar 1'
  ```

## AntDesign 的介绍

- AntDesign, 简称 antd 是基于 Ant Design 设计体系的 React UI 组件库, 主要用于研发企业级中后台产品.
- AntDesign 的特点:
- 全链路设计开发

## AntDesign 兼容性

- 兼容性:
  > 现代浏览器和 IE11(需要 polyfills)
  > 支持服务端渲染
  > Electron

## Antd 是否会将一些没有用的代码(组件或者逻辑代码)引入,造成包很大呢?

- antd 官网有提到: antd 的 JS 代码默认支持基于 ES modules 的 tree shaking, 对于 js 部分, 直接引入 import { Button } from 'antd' 就会有按需加载的效果.

## 认识 craco

- 上面的使用过程是无法对主题进行配置的, 好像对主题等相关的高级特性进行配置, 需要修改 create-react-app 的默认配置.
- 如何修改 create-react-app 的默认配置呢?

  > 前面我们讲过, 可以通过 yarn run eject 来暴露出来对应的配置信息进行修改;
  > 但是对于 webpack 并不熟悉的人来说, 直接修改 CRA 的配置是否会给你的项目带来负但,甚至会增加项目的隐患和不稳定性呢?
  > 所以, 在项目开发中是不建议大家直接去修改 CRA 的配置信息的;

- 那么如何来进行修改默认配置呢? 社区目前有两个比较常见的方案:
  > react-app-rewired + customize-cra; (这个是 antd 早期推荐的方案);
  > craco; (目前 antd 推荐的方案);

## Craco 的使用步骤

- 第一步: 安装 craco:

```sh
  yarn add @craco/craco
```

- 第二步: 修改 package.json 文件

  > 原本启动时, 我们是通过 react-scripts 来管理的;
  > 现在启动时, 我们通过 craco 来管理;

  ```js
  "scripts": {
    -  "start": "react-scripts start",
    -  "build": "react-scripts build",
    -  "test": "react-scripts test",
    +  "start": "craco start",
    +  "build": "craco build",
    +  "test": "craco test",
  }
  ```

- 第三步: 在跟目录下创建 craco.config.js 文件用于修改默认配置
  ```js
  module.exports = {
    // 配置文件
  };
  ```
- 第四步: https://4x.ant.design/docs/react/use-with-create-react-app-cn

## 配置别名

- 在项目开发中, 某些组件或者文件的层级会交深;

  > 如果我们通过上层目录去引入就会出现这样的情况: ../../../../components/button;
  > 如果我们可以配置别名,就可以直接从根目录下面开始查找文件: @/components/button, 甚至是: components/button;

- 配置别名也需要修改 webpack 的配置, 当然我们也可以借助于 craco 来完成:

  ```js
  const path = require("path");
  const resolve = dir => path.resolve(__dirname, dir);

  module.exports = {
    ...,
    webpack: {
        alias: {
            '@': resolve("src"),
            'components': resolve("src/components")
        }
    }
  }
  ```

  > 在导入时就可以按照下面的方式来使用了:

  ```js
  import HYCommentInput from "@/components/comment-input";
  import HYCommentItem from "components/comment-item";
  ```
