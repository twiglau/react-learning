import { createStore } from './redux';
let initState = 0;
const INCREMENT = Symbol.for('INCREMENT')
const DECREMENT = Symbol.for('DECREMENT')
/**
 * 在 redux 中 动作是有规定, 规定必须有一个为 undefined type 属性, 用来表示动作类型
 * @param {*} state 
 * @param {*} action 
 */
function reducer(state, action){
  switch(action.type){
    case INCREMENT:
      return state + 1; // 返回一个加1的新状态
    case DECREMENT:
      return state - 1; // 
    default:
      return state;
  }
}
let store = createStore(reducer,initState);

let counterValue = document.getElementById('counter-value')
let incrementBtn = document.getElementById('increment-btn')
let decrementBtn = document.getElementById('decrement-btn')

function render(){
  counterValue.innerHTML = store.getState();
}
render();
let unsubscribe = store.subscribe(render);
setTimeout(()=>{
  unsubscribe();
},3000)
incrementBtn.addEventListener('click',function(){
  store.dispatch({type: INCREMENT});
})
decrementBtn.addEventListener('click',function(){
  store.dispatch({type: DECREMENT});
})