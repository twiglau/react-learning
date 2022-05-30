import React, { useReducer, useState } from 'react'

import reducer from './Reducer';


export default function Profile() {
    // const [count, setCount] = useState(0);
    const [state, dispatch] = useReducer(reducer, {count: 0});
    return (
        <div>
            <h2>Home当前计数: {state.count }</h2>
            <button onClick={e => dispatch({type: 'increment'})}>+1</button>
            <button onClick={e => dispatch({type: 'decrement'})}>-1</button>
        </div>
    )
}
