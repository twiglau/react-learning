export default function createSagaMiddleware(){
    function sagaMiddleware({dispatch, getState}){
        // 管道
        function createChannel(){
            let observer = {};
            function subscribe(actionType, callback){
                console.log('subcribe-observer:',observer);
                observer[actionType]=callback;
            }
            function publish(action){
                if(observer[action.type]){
                    // TODO: 难点
                    let next = observer[action.type]; // next 函数
                    delete observer[action.type];
                    next(action);
                    // 以下 因为 next 函数内部有 next,
                    // 一次循环后,自动进入 next.
                    // observer[action.type]();
                    // delete observer[action.type];
                }
            }
            return {subscribe, publish}
        }
        const channel = createChannel()

        function run(generator){
            // 开始自动执行这个 generator
            console.log('开始自动执行这个 generator');
            let it = generator();
            function next(action){
                // value ={type:'TAKE',actionType:ASYNC_INCREMENT}
                const {value:effect, done } = it.next(action);
                if(!done){
                    switch(effect.type){
                        case 'TAKE': // take的意思就是要监听某个动作, 当动作发生的时候,执行下一步
                          channel.subscribe(effect.actionType,next);
                           break;
                        case 'PUT': // {type: 'PUT', action:{type: INCREMENT}}
                           dispatch(effect.action);
                           next();
                           break;
                        default:
                            break;
                    }
                }
            }
            next();
        }
        sagaMiddleware.run = run;
        return function(next){
            return function(action){
                channel.publish(action);
                next(action);
            }
        }
    }
    return sagaMiddleware;
}