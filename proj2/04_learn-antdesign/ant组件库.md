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
