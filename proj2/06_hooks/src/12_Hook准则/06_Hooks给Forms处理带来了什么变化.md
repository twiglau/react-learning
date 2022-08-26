表单作为用户交互最为常见的形式, 但在 React 中实现起来却并没有那么容易. 甚至可以说, 使用表单, 是 React 开发中最为困难的一部分.  

主要有两方面的原因.
 * 一方面, React 都是状态驱动, 而表单却是事件驱动, 比如点击按钮, 输入字符等, 都是一个个离散的事件. 因此, 一般来说我们都需要将这些独立的事件转换成一定的应用程序状态, 最终来完成表单的交互.   
 * 另一方面 表单元素一般都有自己的内在状态, 比如原生的 input 节点就允许用户输入, 这就需要我们在元素状态和表单状态之间做同步.   

要能够很好地处理这些问题, 我们首先需要对 `表单的机制` 有深入的理解, 然后再从 `React Hooks 的角度思考问题的解决方案 `   

所以, 会从三个方面理解.   
* 首先, 介绍 React 中使用表单的基本原理, 帮助你理解受控组件和非受控组件的概念, 以及各自的适用场景.   
* 然后看看 Hooks 出现后, 给表单处理带来了哪些思路上的新变化.  
* 最后, 我们会了解几个常见的开箱即用的 React 表单解决方案, 让你在理解实现原理的基础上, 可以选择最适合自己的开源方案.  

# 在表单中使用 React 组件: 受控组件和非受控组件   
在一般情况下, 表单中的元素都是受控组件. 也就是说, 一个表单组件的状态完全由 React 管控. 但是在有的时候, 为了避免太多的重复渲染, 我们也会选择非受控组件.   

* 先来看 受控组件应该如何使用. 下面的例子展示了受控组件的用法:  
```
function MyForm() {
    const [value, setValue] = useState('');
    const handleChange = useCallback(evt => {
        setValue(evt.target.value);
    }, []);
    return <input value={value} onChange={handleChange} />;
}
```   
 * 可以看到, 输入框的值是由传入的 value 属性决定的. 在 onChange 的事件处理函数中, 我们设置了 value 这个状态的值, 这样输入框就显示了用户的输入.   
  * 需要注意的是, React 统一了表单组件的 onChange 事件, 这样的话, 用户不管输入什么字符, 都会触发 onChange 事件. 而标准的 input 的 onchange 事件, 则只有当输入框失去焦点时才会触发. React 的这种 onChange 的机制, 其实让我们对表单组件有了更灵活的控制.   
  * 不过, 受控组件的这种方式虽然统一了表单元素的处理, 有时候却会产生性能问题. 因为用户每输入一个字符, React 的状态都会发生变化, 那么整个组件就会重新渲染. 所以如果表单比较负载, 那么每次都重新渲染, 就可能会引起输入的卡顿. 在这个时候, 我们就可以将一些表单元素使用非受控组件去实现, 从而避免性能问题.  

* 所谓 "非受控组件", 就是表单元素的值不是由父组件决定的, 而是 `完全内部的状态`. 以唯一数据源的原则, 一般我们就不会再用额外的 state 去保存某个组件的值. 而是在需要使用的时候, 直接从这个组件获取值.   
```
import { useRef } from "react";

export default function MyForm() {
    // 定义一个 ref 用于保存 input 节点的引用
    const inputRef = useRef();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // 使用的时候直接从 input 节点获取值
        alert("Name: " + inputRef.current.value);
    };
    return (
        <form onSubmit={handleSubmit}>
          <label>
             Name:
             <input type="text" ref={inputRef} />
          </label>
          <input type="submit" value="Submit" />
        </form>
    );
}
```    
 * 可以看到, 通过非受控组件的方式, input 的输入过程对整个组件状态没有任何影响, 自然也就不会导致组件的重新渲染.
 * 不过缺点也是明显的, 输入过程因为没有对应的状态变化, 因此要动态地根据用户输入做 UI 上的调整就无法做到了. 出现这种情况, 主要也是因为所有的用户输入都是 input 这个组件的内部状态, 没有任何对外的交互.  
 * 总结来说, 在实际的项目中, 我们一般都是用的受控组件, 这也是 React 官方推荐的使用方式. 不过对于一些个别的场景, 比如对性能有极致的要求, 那么非受控组件也是一种不错的选择.  

 # 使用 Hooks 简化表单处理  
  回顾对受控组件的处理, 会发现对于每一个表单元素, 其实都会遵循下面两个步骤:  
  1. 设置一个 State 用于绑定到表单元素的 value; 
  2. 监听表单元素的 onChange 事件, 将表单值同步到 value 这个 state.  
  ```
  function MyForm() {
      const [value1, setValue1] = useState();
      const [value2, setValue2] = useState();
      // 更多表单元素状态...
      return (
          <form>
            <Field1 value={value1} onChange={setValue1} />
            <Field1 value={value2} onChange={setValue2} />
            {/** 更多表单元素 */}
          </form>
      )
  }
  ```   
   * 可以看到, 一个表单的整体状态正是有一个个独立表单元素共同组成的. 那么如下图, 对于每一个表单元素都需要手动的进行 value 和 onChange 属性的绑定:  
   ```

   |           |  <--------->  | input |
   |           |  
   | Form State|  <--------->  | input |
   |           |
   |           |  <--------->   | input |
   ```   
   * 对于复杂的表单, 这样的逻辑显然是比较繁琐的. 但正如上所示, 维护表单组件的装填逻辑, 核心在于三个部分:  
   1. 字段的名字;
   2. 绑定 value 值;
   3. 处理 onChange 事件;
   * 既然对每个表单元素的处理逻辑都是一致的, 那我们是不是可以用Hooks 实现逻辑的重用?  
   > 答案是肯定的, 主要的思想就是在这个Hook去维护整个表单的状态, 并提供根据名字去取值和设值的方法, 从而方便表单在组件中的使用.   
   ```
   import { useState, useCallback } from "react";

   const useForm = (initialValues = {}) => {
       // 设置整个 form 的状态: values 
       const [ values, setValues ] = useState(initialValues);

       // 提供一个方法用于设置 form 上的某个字段的值
       const setFieldValue = useCallback((name, value) => {
           setValues((values) => ({
               ...values,
               [name]: value
           }));
       }, []);

       // 返回整个 form 的值以及设置值的方法
       return { values, setFieldValue };
   }
   ```  

