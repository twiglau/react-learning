import * as types from '../action-types'
export default {
    increment(){
        // store.dispatch({type:INCREMENT})
        return {type:types.INCREMENT}
    },
    decrement(){
        // store.dispatch({type:DECREMENT})
        return {type:types.DECREMENT}
    },
    // 延迟一秒加1
    asyncIncrement(){
        return function(dispatch, getState){
            setTimeout(()=>{
                dispatch({type:types.INCREMENT});
            },1000);
        }
    },
    promiseIncrement(){
        return {
            type: types.INCREMENT,
            payload: new Promise((resolve,reject)=>{
                setTimeout(function(){
                    let result = Math.random();
                    if(result > .5){
                        resolve({number:result})
                    }else{
                        reject({number:result});
                    }
                },1000);
            })
        }
    }
}