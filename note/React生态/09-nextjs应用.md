# Next.js 创建 React 同构应用  

# 创建页面  
1. 页面就是 pages 目录下的一个组件  
2. static 目录映射静态文件  
3. page 具有特殊静态方法 getInitialProps  
```
| - .next
| - components
| - node_modules
| - pages
| -- user
| --- about.js
| --- index.js
| - static
| - package.json
| - yarn.lock
```   

# 在页面中使用其他 React 组件  
1. 页面也是标准的 node 模块, 可使用其他 React 组件  
2. 页面会针对性打包, 仅包含其引入的组件  
```
import { Link } from "next/link";
import Hello from '../components/Hello';

export default () => (
    <div>
      <img src="/static/nextjs.jpg">
      <nav>
         <Link href="/about"><a>About</a></Link>
      </nav>
      <Hello />
      <p> Welcome to next.js </p>
    </div>
);
```   

# 使用 Link 实现同构路由  
1. 使用 "next/link" 定义链接  
2. 点击链接时页面不会刷新  
3. 使用 prefetch 预加载目标资源, 并不会加载服务端数据  
4. 使用 replace 属性替换 URL  
```
import Link from 'next/link'

export default () =>
  <div>
    Click{' '}
    <Link href="/about" prefetch>
      <a>here</a>
    </Link>{' '}
    to read more  
  </div>
```   

# 动态加载页面  
```
import dynamic from 'next/dynamic'

const DynamicComponentWithCustomLoading = dynamic(
    import('../components/hello2'),
    {
        loading: () => <p>...</p>
    }
)

export default () => 
<div>
  <Header />
  <DynamicComponentWithCustomLoading />
  <p> HOME PAGE is here! </p>
</div>
```  