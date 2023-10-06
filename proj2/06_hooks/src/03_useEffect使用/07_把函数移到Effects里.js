import React, { useReducer, useState, useEffect } from 'react'
import axios from 'axios'

//一个典型的误解是认为函数不应该成为依赖。举个例子，下面的代码看上去可以运行正常
function SearchResults() {
    const [data, setData] = useState({ hits: [] });
   
    async function fetchData() {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=react',
      );
      setData(result.data);
    }
   
    useEffect(() => {
      fetchData();
    }, []); 

    return <ul>
      { data.hits.map(ele => <li>{ele.title}</li>) }
    </ul>
}

// 需要明确的是，上面的代码可以正常工作。
// 但这样做在组件日渐复杂的迭代过程中我们很难确保它在各种情况下还能正常运行。
// 如果我们在某些函数内使用了某些 state 或者 prop
function SearchResults1() {
    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('react');
   
    // Imagine this function is also long
    function getFetchUrl() {
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }
   
    // Imagine this function is also long
    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
    }
   
    useEffect(() => {
      fetchData();
    }, []);
   
    return <ul>
      { data.hits.map(ele => <li>{ele.title}</li>) }
    </ul>
  }

  // 如果我们忘记去更新使用这些函数（很可能通过其他函数调用）的effects的依赖，
  // 我们的effects就不会同步props和state带来的变更。这当然不是我们想要的。

  // 1. 如果某些函数仅在effect中调用，你可以把它们的定义移到effect中：
  function SearchResults2() {
    const [data, setData] = useState({ hits: [] });
   
    
   
    useEffect(() => {
        // Imagine this function is also long
        function getFetchUrl() {
            return 'https://hn.algolia.com/api/v1/search?query=react';
        }
        async function fetchData() {
            const result = await axios(getFetchUrl());
            setData(result.data);
        }
        fetchData();
    }, []); 

    return <ul>
      { data.hits.map(ele => <li>{ele.title}</li>) }
    </ul>
}
// 这么做有什么好处呢？
// i. 我们不再需要去考虑这些“间接依赖”。我们的依赖数组也不再撒谎：在我们的 effect 中确实没有再使用组件范围内的任何东西。
// 2. 如果我们后面修改 getFetchUrl去使用状态 query，我们更可能会意识到我们正在effect里面编辑它因此，我们需要把 query添加到effect的依赖里：
export default function SearchResults3() {
    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('react');
   
    useEffect(() => {
      function getFetchUrl() {
        return 'https://hn.algolia.com/api/v1/search?query=' + query;
      }
   
      async function fetchData() {
        const result = await axios(getFetchUrl());
        setData(result.data);
      }
   
      fetchData();
    }, [query]); 
}