import React, { useContext, useReducer,createContext } from 'react';
import ReactDOM from 'react-dom';

const initialState = 0;
function reducer(state = initialState,action){
  switch(action.type){
    case 'ADD':
      return {number: state.number+1};
    default:
      break;
  }
}

const CounterContext = createContext()
function SubCounter(){
  const {state, dispatch} = useContext(CounterContext)
  return (
    <>
      <p>{state.number}</p>
      <button onClick={()=>dispatch({type:'ADD'})}>+</button>
    </>
  )
}

function Counter(){
  const [state, dispatch] = useReducer((reducer), initialState, ()=>({number:initialState}))
  return (
    <CounterContext.Provider value={{state,dispatch}}>
       <SubCounter />
    </CounterContext.Provider>
  )
}
ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);

