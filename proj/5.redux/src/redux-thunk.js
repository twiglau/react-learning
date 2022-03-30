function createThunkMiddleware(extraArgument){
    return ({dispatch, getState})=>next=>action=>{
        // 判断动作类型
        if(typeof action === 'function'){
            action(dispatch, getState, extraArgument);
        }
        next(action);
    }
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;