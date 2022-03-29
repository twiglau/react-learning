export default function logger({getState, dispatch}){
    return function(dispatch){
        return function(action){
            console.log('老状态1',getState());
            dispatch(action);
            console.log('新状态1',getState());
        }
    }
}
//3.  中间件
// let logger = store =>dispatch=>action=>{
//     console.log('老状态',store.getState());
//     dispatch(action);
//     console.log('新状态',store.getState());
// }