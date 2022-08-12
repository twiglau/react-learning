
# 为什么要避免重复定义回调函数? 
* 问题: 如事件处理函数被重复定义, 数据计算过程没有缓存等, 还都需要一些机制来处理. 所以, 现在了解其他四个最为常用的内置 Hooks (包括 useCallback, useMemo, useRef 和 useContext ) 的作用和用法, 以及如何利用这些 Hooks 进行功能开发.

# useCallback: 缓存回调函数
* 在React函数组件中, 每一次 UI 的变化, 都是通过重新执行整个函数来完成的, 这和传统的 Class 组件有很大区别: ~函数组件中并没有一个直接的方式在多次渲染之间维持一个状态.~

* 比如下面的代码中, 在加号按钮上定义了一个事件处理函数, 用来让计数器加1. 但是因为定义是在函数组件内部, 因此在多次渲染之间, 是无法重用 handleIncrement 这个函数的, 而是每次都需要创建一个新的:  
```
function Counter() {
    const [ count, setCount ] = useState(0);
    const handleIncrement = ()=> setCount(count + 1);
    // ...
    return <button onClick={handlerIncrement}> + </button>
}
```  

* 思考: 
> 1. 每次组件状态发生变化的时候, 函数组件实际上都会重新执行一遍. 在每次执行的时候, 实际上都会创建一个新的事件处理函数 handleIncrement. 这个事件处理函数中呢? 包含了 count 这个变量的闭包, 以确保每次能够得到正确的结果.  
> 2. 这也意味着, 即使 count 没有发生变化, 但是函数组件因为其他状态发生变化而重新渲染时, 这种写法也会每次创建一个新的函数. 创建一个新的事件处理函数,虽然不能影响结果的正确性, 但其实是没必要的. 因为这样做不仅增加了系统的开销, 更重要的是: 每次创建新函数的方式会让接收事件处理函数的组件, 需要重新渲染.  
> 3. 比如这个例子中的 button 组件, 接收了 handleIncrement, 并作为一个属性. 如果每次都是一个新的, 那么这个 React 就会认为这个组件的 props 发生了变化, 从而必须重新渲染. 因此, 我们需要做到的是: `只有当count发生变化时, 我们才需要重新定一个回调函数`. 而这正是 useCallback 这个 hook 的作用.  

* API: `useCallback(fn, deps)`;
> 这里 fn 是定义的回调函数, deps 是依赖的变量数组. 只有当某个依赖变量发生变化时, 才会重新声明 fn 这个回调函数.  
> 那么对于上面的例子, 我们可以把 handleIncrement 这个事件处理函数通过 useCallback 来进行性能的优化:  
> callback 要拿到正确的值, 就必须在 count 发生变化时重新声明以获得正确的闭包.  
```
import React, { useState, useCallback } from 'react';

function Counter() {
    const [ count, setCount ] = useState(0);
    const handleIncrement = useCallback(
        ()=> setCount(count + 1),
        [count], // 只有当 count 发生变化时, 才会重新创建回调函数; 
    );
}
```  
>> 1. 在这里, 我们把 count 这个 state, 作为一个依赖传递给 useCallback. 这样, 只有 count 发生变化的时候, 才需要重新创建一个回调函数, 这样就保证了组件不会创建重复的回调函数. 而接收这个回调函数作为属性的组件, 也不会频繁地需要重新渲染.
>> 2. 除了 useCallback, useMemo也是为了缓存而设计的. 只不过, useCallback 缓存的是一个函数, 而 useMemo 缓存的是计算的结果.  


# useMemo: 缓存计算的结果  
* API: `useMemo(fn, deps)` 
> 1. 这里的 fn 是产生所需数据的一个计算函数. 通常来说, fn 会使用 deps 中声明的一些变量来生成一个结果, 用来渲染出最终的UI.
> 2. 场景: `如果某个数据是通过其他数据计算得到的, 那么只有当用到的数据, 也就是依赖的数据发生变化的时候, 才应该需要重新计算`.  

* 例子: 对于一个显示用户信息的列表, 现在需要对用户名进行搜索, 且UI上需要根据搜索关键字显示过滤后的用户, 那么这样一个功能需要有两个状态:  
1. 用户列表数据本身: 来自某个请求;
2. 搜索关键字: 用户在搜索框输入的数据; 
  * 无论是两个数据中的哪一个发生变化, 都需要过滤用户列表以获得需要展示的数据. 那么如果不使用 useMemo 的话, 就需要用这样的代码实现:  
  ```
  export default function SearchUserList() {
      const [users, setUsers] = useState(null);
      const [searchKey, setSearchKey] = useState("");

      useEffect(() => {
          const doFetch = async () => {
              // 组件首次加载时发请求获取用户数据
              const res = await fetch("https://reqres.in/api/users/");
              setUsers(await res.json());
          };
          doFetch();
      }, []);
      let usersToShow = null;

      if(users){
          // 无论组件为何刷新, 这里一定会对数组做一次过滤的操作
          usersToShow = users.data.filter(user => user.first_name.includes(searchKey));
      }

      return (
          <div>
            <input
              type = "text"
              value={searchKey}
              onChange={evt => setSearchKey(evt.target.value)}
            />
            <ul>
              {
                  usersToShow &&
                  usersToShow.length > 0 &&
                  usersToShow.map(user => <li key={user.id}>{user.first_name}</li>)
              }
            </ul>
          </div>
      )
  }
  ```  
  * 在这个例子中, 无论组件为何要进行一次重新渲染, 实际上都需要进行一次过滤的操作. 但其实你只需要在 users 或者 searchKey 这两个状态中的某一个发生变化时, 重新计算获得需要展示的数据就行了. 那么, 这个时候, 我们就可以用 useMemo 这个 Hook 来实现这个逻辑, 缓存计算的结果: 
  ```

  ...
  // 使用 useMemo 缓存计算的结果 
  const usersToShow = useMemo(()=>{
      if(!users) return null;
      return users.data.filter(user => user.first_name.includes(searchKey));
  })
  ...

  ```  
  * 可以看到, 通过 userMemo 这个 Hook, 可以避免在用到的数据没有发生变化时进行的重复计算. 虽然例子展示的是一个很简单的场景, 但如果是一个复杂的计算, 那么对于提升性能会有很大的帮助. 这也是 useMemo 的一大好处: ~避免重复计算~.

* 好处: 
1. 以上, 避免重复计算. 
2. 避免子组件的重复渲染. 
> 比如,在例子中的 usersToShow 这个变量, 如果每次都需要重新计算来得到, 那么对于 UserList 这个组件而言, 就会每次都需要刷新, 因为它将 usersToShow 作为了一个属性. 而一旦能够缓存上次的结果, 就和 useCallback 的场景一样, 可以避免很多不必要的组件刷新.   

# 这个时候, 如果结合 useMemo 和 useCallback 这两个 Hooks 一起看.
1. 会发现一个有趣的特性, 那就是 useCallback 的功能其实是可以用 useMemo 来实现的. 
> 比如下面就是利用 useMemo 实现了 useCallback 的功能:  
```
const myEventHandler = useMemo(()=> {
    // 返回一个函数作为缓存结果
    return () => {
        // 在这里进行事件处理
    }
}, [dep1, dep2]);
```   
2. 理解以上, 它们本质上来说, 它们只是做了同一件事情:
> 建立了一个绑定某个结果到依赖数据的关系. 只有当依赖变了, 这个结果才需要被重新得到.  



