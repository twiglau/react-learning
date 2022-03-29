export default function logger(store){
    return function(dispatch){
        return function(action){
            console.log('老状态2',store.getState());
            dispatch(action);
            console.log('新状态2',store.getState());
        }
    }
}
//3.  中间件
// let logger = store =>dispatch=>action=>{
//     console.log('老状态',store.getState());
//     dispatch(action);
//     console.log('新状态',store.getState());
// }