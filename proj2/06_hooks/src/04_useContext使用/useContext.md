# useContext 的使用

- 在之前的开发中，我们要在组件中使用共享的 Context 有两种方式：
  > 类组件可以通过 类名.contextType = MyContext 方式， 在类中获取 context;
  > 多个 Context 或者在函数式组件中通过 MyContext.Consumer 方式共享 context;

# useContext: 定义全局状态

- React 组件之间的状态传递只有一种方式, 那就是通过 props. 这就意味着这种传递关系只能在父子组件之间进行.
- 那么, 如果要跨层次, 或者同层的组件之间要进行数据的共享, 那应该如何去实现呢?
  > 这其实就涉及到了一个新的命题: `全局状态管理`.
- 为此, React 提供了 Context 这样一个机制, 能够让所有 在某个组件开始的组件树上 创建一个 Context. 这样这个组件树上的所有组件, 就都能访问和修改这个 Context 了.那么在函数组件里, 我们就可以使用 useContext 这样一个 Hook 来管理 Context.

# useContext API: `const value = useContext(MyContext)`;

- 正如刚才提到, 一个 Context 是从某个组件为根组件的组件树上可用的, 所以我们需要有 API 能够创建一个 Context, 这就是 React.createContext API. 如下:

```

const MyContext = React.createContext(initialValue);

```

- 这里的 MyContext 具有一个 Provider 的属性, 一般是作为组件树的根组件. 这里仍然以 React 官方例子为例.

```
const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

// 创建一个 Theme 的 Context
const ThemeContext = React.createContext(themes.light);
function App() {
    // 整个应用使用 ThemeContext.Provider 作为根组件
    return (
        <ThemeContext.Provider value={themes.dark}>
          <Toolbar />
        </ThemeContext.Provider>
    );
}

// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar(props) {
    return (
        <div>
          <ThemeButton />
        </div>
    );
}

// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemeButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{
            background: theme.background,
            color: theme.foreground
        }}
        >
         I am styled by theme context!
        </button>
    );
}
```

- Context 看上去就是一个全局的数据, 为什么要设计这样一个复杂的机制, 而不是直接用一个全局的变量去保存数据呢?
  > 就是`为了能够进行数据的绑定`. 当这个 Context 的数据发生变化时, 使用这个数据的组件就能够自动刷新. 但如果没有 Context, 而是使用一个简单的全局变量, 就很难实现.

# 刚才看到的其实是一个静态的使用 Context 的例子, 直接用了 themes.dark 作为 Context 的值, 那么如何让他变得动态?

- 比如说常见的切换黑暗 或者 明亮 模式的按钮, 用来切换整个页面的主题. 事实上, 动态 Context 并不需要我们学习任何新的 API, 而是利用 React 本身的机制, 通过这么一行代码就可以实现:

```
<ThemeContext.Provider value={themes.dark}>
```

- 可以看到, themes.dark 是作为一个属性值传给 Provider 这个组件的, 如果要让它变得动态, 其实只要用一个 state 来保存, 通过修改 state, 就能实现动态的切换 Context 的值. 而且这么做, 所有用到这个 Context 的地方都会自动刷新. 如下:

```
// ...

function App() {
    const [theme, setTheme] = useState("light");

    const toggleTheme = useCallback(()=>{
        setTheme((theme)=> (theme === 'light'? 'dark': 'light'));
    }, []);

    return (
        <ThemeContext.Provider value = {themes[theme]}>
          <button onClick={toggleTheme}> Toggle Theme</button>
          <Toolbar />
        </ThemeContext.Provider>
    );
}
```

# 总结: 可以看到, Context 提供了一个方便在多个组件之间共享数据的机制. 不过需要注意的是, 它的灵活性也是一柄双刃剑. Context 相当于提供了一个定义 React 世界中全局变量的机制, 而全局变量则意味着两点:

- 1. 会让调试变得困难, 因为你很难跟踪某个 Context 的变化究竟是如何产生的.
- 2. 让组件的复用变得困难, 因为一个组件如果使用了某个 Context, 它就必须确保被用到的地方一定有这个 Context 的 Provider 在其父组件的路径上.
- 3. 所以在 React 的开发中, 除了向 Theme, Language 等一目了然的需要全局设置的变量外, 我们很少会使用 Context 来做太多数据的共享. 需要再三强调的是, Context 更多的是 `提供了一个强大的机制, 让React应用具备定义全局的响应式数据的能力`.
- 此外, 很多状态管理框架, 如 Redux, 正式利用了 Context 的机制来提供一种更加可控的组件之间的状态管理机制.
