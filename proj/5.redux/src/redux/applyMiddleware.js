
import compose from "./compose";
export default function applyMiddleware(...middlewares){
    return function(createStore){
        return function(reducer){
            let store = createStore(reducer); // 这就是最原始的仓库
            let dispatch = ()=>{throw new Error('现在还不能用!')};
            let middlewareAPI = {
                getState: store.getState,
                dispatch:(...args)=>dispatch(...args)
            }
            // chain 结果为先 剥掉一层
            const chain = middlewares.map(middleware=>middleware(middlewareAPI));
            
            console.log({middlewares,chain})
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        }
    }
}