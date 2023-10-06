import React, { useReducer, useState, useEffect,useCallback } from 'react'
import axios from 'axios'

// 1. 有时候你可能不想把函数移入 effect 里。比如，组件内有几个 effect 使用了相同的函数，
// 你不想在每个 effect 里复制黏贴一遍这个逻辑。也或许这个函数是一个 prop。

// 2. 在这种情况下你应该忽略对函数的依赖吗？
// 这么做是不对的。再次强调，effects不应该对它的依赖撒谎。
// 通常我们还有更好的解决办法。
// 一个常见的误解是，“函数从来不会改变”。
// 但是这篇文章你读到现在，你知道这显然不是事实。实际上，在组件内定义的函数每一次渲染都在变。
function SearchResults() {
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }
 
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []);
 
  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []);
}

// 在这个例子中，你可能不想把 getFetchUrl移到 effects 中，因为你想复用逻辑。
// 另一方面，如果你对依赖很“诚实”，你可能会掉到陷阱里。
// 我们的两个 effects 都依赖 getFetchUrl，而它每次渲染都不同，所以我们的依赖数组会变得无用：
function SearchResults2() {

  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }
 
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); 
 
  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, [getFetchUrl]);
 
  // ...
}

// 我们有两个更简单的解决办法。
// 3. 第一个， 如果一个函数没有使用组件内的任何值，你应该把它提到组件外面去定义，然后就可以自由地在 effects 中使用：
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}
 
function SearchResults3() {
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []);
 
  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []); 
 
  // ...
}

// 你不再需要把它设为依赖，因为它们不在渲染范围内，因此不会被数据流影响。
// 4. 你也可以把它包装成  useCallback Hook:
function SearchResults4() {
  const getFetchUrl = useCallback((query) => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, []);
 
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, [getFetchUrl]);
 
  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, [getFetchUrl]);
 
  // ...
}

// 我们用 useCallback 对 getFetchUrl 做了一层缓存，
// 现在只有当依赖项变化的时候，才会重新执行 useCallback 来返回新的函数，
// 依赖项没有变化的时候就算组件 rerender 了，这个函数也不会重新执行，
// 这样我们把 getFetchUrl 作为 useEffect 的依赖就没问题了。


// 5. 不同于传递参数的方式，现在我们从状态中读取 query：
function SearchResults5() {
  const [query, setQuery] = useState('react');
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]);  
 
  useEffect(() => {
    const url = getFetchUrl();
    // ... Fetch data and do something ...
  }, [getFetchUrl]);
 
  // ...
}

// 如果 query保持不变，useCallback也会保持不变，我们的 effect 也不会重新运行。
// 但是如果修改了 query，useCallback 也会随之改变，因此会重新请求数据。
// 这就像你在Excel里修改了一个单元格的值，另一个使用它的单元格会自动重新计算一样。