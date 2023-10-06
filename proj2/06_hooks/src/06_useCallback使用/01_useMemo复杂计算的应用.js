import React, { useMemo, useState } from 'react'

function calcNumber(count){
    console.log('calcNumber 重新计算')
    let total = 0;
    for(let i=1; i<=count; i++){
        total += i;
    }
    return total;
}
function calcNumberTest(count){
    console.log('calcNumberTest 重新计算')
    let total = 3;
    for(let i=1; i<=count; i++){
        total += i;
    }
    return total;
}
export default function MemoHookDemo1() {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);
    const totalTest = calcNumberTest(count);
    const total = useMemo(()=>{
        return calcNumber(count);
    }, [count]);
    return (
        <div>
            <h2>计算数字的和:{ count } - { total } - { totalTest }</h2>
            <button onClick={e => setCount(count + 1)}> +1</button>
            <button onClick={e => setShow(!show)}>Show</button>
        </div>
    )
}
