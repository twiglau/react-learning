import React, { forwardRef, useRef } from 'react'

class TestCpn extends React.Component {
    render(){
        return <h2>TestCpn</h2>
    }
}
function TestCpn2(props, ref){
    return <h2 ref={ref}>TestCpn2</h2>
}

TestCpn2 = forwardRef(TestCpn2)
export default function RefHookDemo1() {
    const titleRef = useRef();
    const inputRef = useRef();
    const testRef = useRef();
    const test2Ref = useRef();
    function changeDOM(){
        titleRef.current.innerHTML = "Hello world"
        inputRef.current.focus();
        console.log(testRef.current);
        console.log(test2Ref.current);
    }
    return (
      <div>
        <h2 ref={titleRef}>Demo1</h2>
        <input ref={inputRef} />
        <TestCpn ref={testRef} />
        <TestCpn2 ref={test2Ref} />
        <button onClick={e => changeDOM()}>修改DOM</button>
      </div>
    )
}
