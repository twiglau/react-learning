import routerMiddleware from './routerMiddleware';
import connectRouter from './connectRouter';
import push from './push';
import ConnectedRouter from './ConnectedRouter';
export {
    routerMiddleware, //创建路由中间件的函数, 接收一个 history 参数
    connectRouter, //创建reducer的函数, 都接收一个 history 参数
    push, // 用来返回 一个用来跳转路径的 action
    ConnectedRouter // 是一个路由容器
}