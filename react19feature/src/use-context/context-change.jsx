/**
 * 在React中, props能够帮助我们将数据层层往下传递. 但是, 当数据传递太多层后, 不仅代码上比较繁琐,理解上
 * 也容易混乱不清, 因此, 我们需要一种能够跨越组件层级,直达子组件的 数据传递方式. - context.
 * 
 * context 表示组件实例在运行期间能够直接读取的 状态和内容. 
 * 它记录了内存中的活跃数据, 我们可以将这些数据使用 useState 来定义. 那么, context 中数据更改, 就会
 * 驱动所有使用到该数据的 UI 发生变化. 
 * 
 * 
 * react19 简化了 Provider 使用
 * 1. const Context = createContext({})
 * 在以前使用中,我们需要使用 Context.Provider 来包裹子组件
 * <Context.Provider value={value}>
 *   {props.children}
 * </Context.Provider>
 * 
 * 2. 在React19中, 我们可以直接使用 Context 来代替 Provider, 从而让代表变得
 * 更加简洁.
 * <Context value={value}>
 *   {props.children}
 * </Context>
 * 
 * 3. 可以使用 use 获取 context
 * 以前版本中, 在组件内部我们使用 useContext 来获取 context 中的状态. 
 * import { use } from 'react'
 * 
 * function MyComponent() {
 *    const theme = use(ThemeContext);
 * }
 */



