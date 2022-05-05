# diff 策略
> Web UI 中 DOM 节点跨层级的移动操纵特别少, 可以忽略不计.  
> 拥有相同类的两个组件将会生成相似的树形结构, 拥有不同类的两个组件将会生成不同的树形结构.  

## tree diff  
> React 对树的算法进行简介明了的优化, 即对树进行分层比较, 两棵树只会对同一层次的节点进行比较   
> 当出现节点跨层级移动时, 并不会出现想象中的移动操作, 而是以 A 为根节点的树被整个重新创建  

## component diff  
> 如果是同一类型的组件, 按照原策略继续比较 virtual DOM tree  
> 如果不是, 则将该组件判断为 dirty component, 从而替换整个组件下的所有子节点  

## element diff  
> 当节点处于同一层级时, React diff 提供了三种节点操作, 分别为: INSERT(插入), MOVE(移动) 和 REMOVE(删除)  
> INSERT 新的 component 类型不再老集合里, 即是全新的节点, 需要对新节点执行插入操作   
> MOVE 在老集合有新 component 类型, 就需要做移动操作, 可以复用以前的 DOM 节点.  
> REMOVE 老 component 不再新集合里的, 也需要执行删除操作  

## key  
> lastIndex  