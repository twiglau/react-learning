# React 组件的本质  
* React的组件的模型很直观, 就是从 Model 到 View 的映射, 这里的 Model 对应到 React 中就是 state 和 props.
```
State + Props ------------> View 
```  
- 在过去,我们需要处理当 Model 变化时, DOM 节点应该如何变化的细节问题. 而现在, 我们只需要通过 JSX, 根据 Model 的数据用声明的方式去描述 UI 的最终展现就可以了, 因为 React 会帮助你处理所有 DOM 变化的细节. 而且, 当Model中的状态发生变化时, UI 会自动变化, 即`所谓的数据绑定`.
- 所以,我们可以把 UI 的展现看成一个函数的执行过程. 其中, Model 是输入参数, 函数的执行结果是 DOM 树, 也就是 View. 而React要保证的, 就是每当 Model 发生变化时, 函数会重新执行, 并且生成新的 DOM 树, 然后 React 再把新的 DOM 树以做优的方式更新的浏览器.
- 既然如此, 使用 Class 作为组件是否真的合适呢? Class 在作为 React 组件的载体时, 是否用了它所有的功能呢? 如果仔细思考, 会发现使用 Class 其实是有点牵强的, 主要有两方面的原因.
> 一, React组件之间是不会互相继承的. 比如, 你不会创建一个Button组件,然后再创建一个 DropdownButton 来继承 Button. 所以说, React 中其实是没有利用的 Class 的继承特性的.
```
什么说React组件不会相互继承?
组合的话,组件之间就仅仅需要通过 props 的方式来互相交互, 依赖关系更加清晰, 组件内聚性更好. 
继承会让两个组件紧密耦合到一起.
继承也不是完全不能用, 只是非常不推荐.在React中, 继承要达到的目的,用组合完全就可以覆盖;
```  
> 二, 因为所有 UI 都是由状态驱动的, 因此很少会在外部去调用一个类实例 (即组件) 的方法. 要知道, 组件的所有方法都是在内部调用, 或者作为声明周期方法被自动调用的.

- 以上, 两个 Class 最重要的特性其实都没有用到. 而在 React 出现只是, 主流的方式: 还是基于对象去考虑问题. 例如获得一个对话框的实例, 然后通过 `dialog.show()`, `dialog.hide()` 这样的方式 细粒度 地区控制 UI 的变化.
> 而这在 React 中其实是没有必要的, 因为所有的 UI 都是声明而来的, 不用处理细节的变化过程. 因此, `通过函数去描述一个组件才是最为自然的方式`. 这也是为什么 React 很早就提供了函数组件的机制. 
> 只是当时有一个局限是, 函数组件无法存在内部状态, 必须是纯函数, 而且也无法提供完整的声明周期机制. 这就极大限制了函数组件的大规模使用.

- 那么我们自然就知道了, Class 作为 React 组件的载体, 也许并不是最适合, 反而函数是更适合描述 `State => View` 这样的一个映射; 但是函数组件又没有 State, 也没有声明周期方法. 以此来看, 应该如何改进呢? 

# Hooks 是如何诞生的? 
* 顺着函数组件的思路继续思考, 就会发现, 如果我们想要让函数组件更有用, 目标就是给函数组件加上状态.
- 函数和对象不同, 并没有一个实例的对象能够在多次执行之间保存状态, 那势必需要一个函数之外的空间来保存这个状态, 而且要能够检测其变化,从而能够触发函数组件的重新渲染.
- 进一步, 是不是就是需要这样一个机制,能够把一个外部的数据绑定到函数的执行. 当数据变化时, 函数能够自动重新执行. 这样的话, 任何会影响 UI 展现的外部数据, 都可以通过这个机制绑定到 React 的函数组件.
- 在 React 中, 这个机制就是 Hooks.

* 在React中, Hooks 就是 `把某个目标结果钩到某个可能会变化的数据源或者事件源上, 那么当被钩到的数据或事件发生变化时, 产生这个目标结果的代码会重新执行, 产生更新后的结果.`
- 对于函数组件, 这个结果是最终的 DOM 树; 对于 useCallback, useMemo 这样与缓存相关的组件, 则是在依赖项发生变化时去更新缓存. 所以 Hooks 的结构可以如下: 
```
        State   -------->
URL -------------------->       Executon  --------> Result
        Window Size ---->
```  
> 从图中可以看到, 一个执行过程 (Execution) -- 函数组件本身, 可以绑定在(钩在)传统意义的 State, 或者 URL, 甚至可以是窗口的大小. 这样当 State, URL, 窗口大小发生变化时, 都会重新执行某个函数, 产生更新后的结果.
> 当然, 既然我们的初衷是为了实现 UI 组件的渲染, 那么在React中, 其实所有的 Hooks 的最终结果都是导致 UI 的变化. 但是正如 React 官方曾经提到过的, Hooks 的思想其实 `不仅可以用在 React, 在其它一些场景也可以被利用`.

- 结论: 比起Class组件, 函数组件是更适合去表达 React 组件的执行的, 因为它更符合 `State => View`这样的一个逻辑关系. 但是因为缺少状态, 声明周期等机制, 让它一直功能受限. 而现在有了 Hooks, 函数组件可以发挥其作用了.

* Hooks 带来的最大好处: `逻辑复用` - 简化了逻辑复用
- Hooks 中被钩的对象, 不仅可以是某个独立的数据源, 也可以是另一个Hook执行的结果.
- 例子: 以刚才提到的绑定窗口大小的场景为例. 如果有多个组件需要在用户调整浏览器窗口大小时, 重新调整布局, 那么我们需要把这样的逻辑提取成一个公共的模块供多个组件使用. 以 React 思想, 在 JSX 中我们会根据 Size 大小来渲染不同的组件. 如: 
```
function render() {
    if(size === "small") return <SmallComponent />;
    else return <LargeComponent />;
}
```  
> 这段代码看上去简单, 但如果在过去的 Class 组件中, 我们甚至需要一个比较复杂的设计模式来解决, 这就是 `高阶组件`. 所以接下来不妨通过实际的代码进行一些比较.
>> 在 Class 组件的场景下, 我们首先需要定义一个高阶组件, 负责经停窗口大小变化, 并将变化后的值作为 props 传给下一个组件.
```
const withWindowSize = Component => {
    // 产生一个高阶组件 WrappedComponent, 只包含监听窗口大小的逻辑
    class WrappedComponent extends React.PureComponent {
        constructor(props){
            super(props);
            this.state = {
                size: this.getSize()
            };
        }
        componentDidMount() {
            window.addEventListener("resize", this.handleResize);
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.handleResize);
        }
        getSize() {
            return window.innerWidth > 1000 ? "large" : "small";
        }
        handleResize = () => {
            const currentSize = this.getSize();
            this.setState({
                size: this.getSize()
            });
        }
        render(){
            // 将窗口大小传递给真正的业务逻辑组件
            return <Component size={this.state.size} />;
        }
    }
    return WrappedComponent;
};
```
>> 这样, 在你的自定义组件中可以调用 withWindowSize 这样的函数来产生一个新组件, 并自带 size 属性, 如: 
```
class MyComponent extends React.Component {
    render() {
        const { size } = this.props;
        if(size === "small") return <SmallComponent />;
        else return <LargeComponent />;
    }
}
// 使用 withWindowSize 产生高阶组件, 用于产生 size 属性传递给整整的业务组件
export default withWindowSize(MyComponent);
```   
>> 在这里, 可以看到, 为了传递一个外部的状态, 不得不定义一个没有 UI 的外层组件, 而这个组件只是为了封装一段可重用的逻辑. 更为糟糕的是, 高阶组件几乎是 Class 组件中实现代码逻辑复用的唯一方式,其缺点其实很显然:
1. 代码难理解, 不直观, 很多人甚至宁愿重复代码, 也不愿用高阶组件;
2. 会增加很多额外的组件节点. 每个高阶组件都会多一层节点, 这就会给调试带来很大的负担. 
>> 可以说, 正因为这些缺点被抱怨已久, React 团队才终于提出了 Hooks 这样一个全新的方案. 同样的逻辑如果用 Hooks 和函数组件该如何实现. 
```
问题: 窗口大小发生变化, 组件就会更新, class 封装的还可以理解为: state 发生改变了, 导致重新 render , 但是 hook 感觉这么理解不通顺, hook 这里写的就类似一个纯函数调用, 是怎么驱动组件重新更新的呢? 
答:  自定义Hooks 触发组件更新的机制是: 调用 useState 这一类内置的, 能触发组件更新的 Hooks. 所以在窗口大小变化的例子中, 在事件监听中通过 setSize 这个 useState 得到的方法去设置 size, 从而组件就更新了.

const getSize = () => {
    return window.innerWidth > 1000 ? "large" : "small";
}
const useWindowSize = () => {
    const [size, setSize] = useState(getSize());
    useEffect(() => {
        const handler = () => {
            setSize(getSize())
        };
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        }

    }, []);

    return size;
}

const Demo = () => {
    const size = useWindowSize();
    if(size === 'small') return <SmallComponent />;
    else return <LargeComponent />;
}
```  
>> 可以看到, 窗口大小是一个外部的一个数据状态, 我们通过 Hooks 的方式对其进行了封装, 从而将其变成一个可绑定的数据源. 这样当窗口大小发生变化时, 使用这个 Hook 的组件就都会重新渲染. 而且代码也更加简洁和直观, 不会产生额外的组件节点.

* Hooks 另一大好处: `有助于关注分离`
- 以上面监听浏览器窗口大小的变化为例, 我们来看 Hooks 是如何做到关注分离的. 在过去的 Class 组件中, 我们需要在 componentDidMount 中监听事件, 在 componentWillUnmount 中去解绑事件. 而在函数组件中, 我们可以把所有逻辑写在一起.

# 总结
* 更好地提现了 React 的开发思想, 即从 State => View 的函数式映射;
* Hooks 也解决了 Class 组件存在的一些代码冗余, 难以逻辑复用的问题.