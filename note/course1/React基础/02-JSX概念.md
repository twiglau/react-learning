# JSX: 在 JavaScript 代码中直接写 HTML 标记  
```
const name = 'Nate Wang';
const element = <h1>Hello, {name}</h1>;
```  
-------------
```
class CommentBox extends React.Component {
    render () {
        return (
            <div className="comments">
              <h1>Comments ({this.state.items.length})</h1>
              <CommentList data={this.state.items} />
              <CommentForm />
            </div>
        );
    }
}

ReactDOM.render(<CommentBox topicId="1" />, mountNode);
```
# JSX的本质: 动态创建组件的语法糖  
```
// 以上转换为以下代码:  
const name = 'Josh Perez';
const element = React.createElement(
    'h1',
    null,
    'Hello, ',
    name
);
```
--------------
```
class CommentBox extends React.Component {
    render () {
        return React.createElement(
            "div",
            { className: "comments"},
            React.createElement(
                "h1",
                null,
                "Comments (",
                this.state.items.length,
                ")"
            ),
            React.createElement(CommentList, { data: this.state.items }),
            React.createElement(CommentForm, null)
        );
    }
}

ReactDOM.render(
    React.createElement(CommentBox, { topicId: "1"}),
    mountNode
);
```  

# 在 JSX 中使用表达式  
1. JSX 本身也是表达式  `const element = <h1> Hello, world!</h1>;`   
2. 在属性中使用表达式  `<MyComponent foo={1 + 2 + 3 + 4} />`   
3. 延展属性  `const props = {firstName: 'Ben', lastName: 'Hector'};  const greeting = <Greeting {...props} />;`   
4. 表达式作为子元素  `const element = <li>{props.message}</li>;`  

# JSX 的优点  
1. 声明时创建界面的直观  
2. 代码动态创建界面的灵活  
3. 无须学习新的模板语言  

# 约定: 自定义组件以大写字母开头  
1. React 认为小写的 tag 是原生 DOM 节点, 如 div   
2. 大写字母开头为自定义组件   
3. JSX 标记可以直接使用属性语法, 例如 <menu.Item />