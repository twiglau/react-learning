
import { createContext, useState } from 'react';
// import Counter from './01_体验hooks/01_counter-class';
// import Counter1 from './01_体验hooks/02_counter-hook';
// import MultiHookState from './02_useState使用/01_多个状态';
// import ComplexHookState from './02_useState使用/02_复杂状态的修改';

// import ClassCounterChangeTitle from './03_useEffect使用/01_class实现标题title修改';
// import FuncModifyTitle from './03_useEffect使用/02_hook实现title的修改'
// import EffectCancelDemo from './03_useEffect使用/03_模拟订阅和取消订阅'
// import MultiEffectHookDemo from './03_useEffect使用/04_多useEffect一起使用'
// import TimeIntervalDemo from './03_useEffect/05_定时器使用'
// import Counter from './03_useEffect/07_把函数移到Effects里'
// import ContextHookDemo from './04_useContext使用/01_useContext的使用';

// import Home from './05_useReducer的使用/Home';
// import Profile from './05_useReducer的使用/Profile';
// import CallbackDemo1 from './06_useCallback使用/01_不能进行的性能优化';
// import CallbackDemo2 from './06_useCallback使用/02_useCallback可以进行的性能优化';

import MemoHookDemo1 from './06_useCallback使用/01_useMemo复杂计算的应用';
// import MemoHookDemo2 from './06_useCallback使用/02_useMemo传入子组件引用类型';


// import RefHookDemo1 from './08_useRef的使用/01_引用DOM';
// import RefHookDemo2 from './08_useRef的使用/02_引用其他数据'

// import ForwardRefDemo from './09_useImperativeHandle/01_forwardRef的用法';
// import ImperativeHandleDemo from './09_useImperativeHandle/02_useImperativeHandle用法';

// import EffectCounterDemo from './10_useLayoutEffect/01_useEffect的counter修改';
// import LayoutEffectCounterDemo from './10_useLayoutEffect/02_useLayoutEffect的counter修改';


// import CustomHookLifeDemo1 from './11_自定义Hook/01_认识自定义hook';
// import CustomContextShareHook from './11_自定义Hook/02_练习-context共享';
// import CustomContextScrollPos from './11_自定义Hook/03_练习-获取滚动位置';
// import CustomDateStore from './11_自定义Hook/04_练习-localStorage存储'


export const UserContext = createContext();
export const ThemeContext = createContext();
export const TokenContext = createContext();
function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      {/**1.Hook初体验 */}
      {/* <Counter /> */}
      {/* <Counter1 /> */}

      {/**2.useState */}
      {/* <MultiHookState /> */}
      {/* <ComplexHookState /> */}

      {/**3. useEffect */}
      {/* <ClassCounterChangeTitle /> */}
      {/* <FuncModifyTitle /> */}
      {/* {show && <EffectCancelDemo />} */}
      {/* {show && <MultiEffectHookDemo />} */}

      {/* <Counter /> */}

      {/**4. useContext */}
      {/* <UserContext.Provider value={{name:'why', age: 18}}>
        <ThemeContext.Provider value={{fontSize: '30px', color: 'red'}}>
          <ContextHookDemo />
        </ThemeContext.Provider>
      </UserContext.Provider>
      <button onClick={e => setShow(!show)}>切换</button> */}

      {/**5. useReducer */}
      {/* <Home />
      <Profile /> */}

      {/**6. useCallback */}
      {/* <CallbackDemo1 /> */}
      {/* <CallbackDemo2 /> */}

      {/**7. useMemo */}
      <MemoHookDemo1 />
      {/* <MemoHookDemo2 /> */}

      {/**8. useRef */}
      {/* <RefHookDemo1 /> */}
      {/* <RefHookDemo2 /> */}

      {/**9. useImperativeHandle */}
      {/* <ForwardRefDemo /> */}
      {/* <ImperativeHandleDemo /> */}

      {/**10. useLayoutEffect */}
      {/* <EffectCounterDemo /> */}
      {/* <LayoutEffectCounterDemo /> */}

      {/**11. 自定义Hook */}
     {/* { show && <CustomHookLifeDemo1 />} */}
     {/* <UserContext.Provider value={{name:'twig', age: 21}}>
       <TokenContext.Provider value={{token:'xxxxxxxx'}}>
         <CustomContextShareHook />
       </TokenContext.Provider>
     </UserContext.Provider> */}
     {/* <CustomContextScrollPos /> */}
     {/* <CustomDateStore /> */}

      <button onClick={e => setShow(!show)}>切换</button>
    </div>
  );
}

export default App;
