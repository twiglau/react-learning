# fiber: 就是一个数据结构, 有很多属性
> 虚拟 dom 是对真实 dom 的一种简化  
> 一些真实 dom 都做不到的事情, 那虚拟dom 更做不到  
> 就有了 fiber 有很多的属性, 希望借由 fiber 上的这堆属性  
> 来做到一些比较厉害的事情  

# fiber 架构  
> 为了弥补一些不足 就设计了 一些新的算法  
> 而为了能让这些算法跑起来, 所以出现了 fiber 这种数据结构  
> fiber 这种数据结构 + 新的算法  =  fiber架构  

# react应用 从始至终 管理着最进本的散养东西
> 1. Root(整个应用的根, 一个对象, 不是 fiber, 有个属性指向 current树)  
> 2. current树(树上的每一个节点都是 fiber 并且每个 fiber节点 都对应着一个 jsx 节点)  
> 3. workInProgress树(树上的每一个节点都是 fiber , 并且每个fiber节点都对应一个 jsx 节点)