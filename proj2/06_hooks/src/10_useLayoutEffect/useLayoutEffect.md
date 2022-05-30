# useLayoutEffect 看起来和 useEffect 非常的相似, 事实上它们也只有一点区别而已;  
- useEffect 会在渲染的内容更新到DOM上后执行, 不会阻塞DOM的更新;
- useLayoutEffect 会在渲染的内容更新到DOM上之前执行, 会阻塞DOM的更新;  
- 如果我们希望在某些操作发生之后再更新DOM, 那么应该将这个操作放到 useLayoutEffect.  