# React 16.3 新特性: Context API  
* 解决的问题: 组件间通信的问题  
> 跟节点提供数据 provide 到 Context  
> 根节点下的所有子节点都可以从 Context 中获取到数据  consume  
```
const ThemeContext = React.createContext('light');

class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
              <ThemeButton />
            </ThemeContext.Provider>
        );
    }
}

function ThemedButton(props) {
    return (
        <ThemeContext.Consumer>
        {theme => <Button {...props} theme={theme} />}
        </ThemeContext.Consumer>
    );
}

```  