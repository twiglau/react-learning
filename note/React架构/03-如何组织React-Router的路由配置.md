# 在每个 feature 中单独定义自己的路由  
```
routeConfig.js
    |

route1.js   route2.js   route3.js   route4.js
```  


# 使用 JSON 定义顶层路由  
```
import { WelcomePage, CounterPage, RedditListPage, Layout } from './';

export default {
    path: 'examples',
    name: 'Examples',
    component: Layout,
    childRoutes: [
        { path: '', name: 'Welcome page', component: WelcomePage },
        { path: 'counter', name: 'Counter page', component: CounterPage },
        { path: 'reddit', name: 'Reddit list page', protected: true, component: RedditListPage }
    ],
};
```  

# 解析 JSON 路由到 React Router 语法  
```
import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import examplesRoute from '../features/examples/route';
import _ from 'lodash';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  homeRoute,
  commonRoute,
  examplesRoute,
];

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, (child => child.isIndex));
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;

```   

