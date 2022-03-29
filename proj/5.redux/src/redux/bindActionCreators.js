function bindActionCreator(actionCreator,dispatch){
    return function(){
        return dispatch(actionCreator.apply(this,arguments));// apply 传递参数给 actionCreator
    }
}
export default function bindActionCreators(actionCreators, dispatch){
    if(typeof actionCreators == 'function'){
       return bindActionCreator(actionCreators,dispatch);
    }
    const boundActionsCreators = {};
    for(const key in actionCreators){
        //老方法重写
        boundActionsCreators[key] = bindActionCreator(actionCreators[key],dispatch);
    }
    return boundActionsCreators;
}