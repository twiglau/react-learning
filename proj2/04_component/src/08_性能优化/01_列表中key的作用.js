
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        movies: ['盗梦空间','星际穿越','大话西游']
    }
  render() {
    return (
      <div>
        <h2>电影列表</h2>
        <ul>
            {
                this.state.movies.map((item, index)=>{
                    return <li key={item}>{item}</li>
                })
            }
        </ul>
        <button onClick={e=>this.insertMovie()}>添加吊影</button>
      </div>
    )
  }
  insertMovie(){
    //   this.setState({
    //       movies:[...this.state.movies, '三体']
    //   })
    this.setState({
        movies:['明日',...this.state.movies]
    })
  }
}

/**
 * keys 的优化
 * Warning: 我们在前面遍历列表时, 总是会提示一个警告, 让我们加入一个key属性:
 * 方式一: 在最后位置插入数据
 * > 这种情况, 有无key意义并不大;
 * 方式二: 在前面插入数据
 * > 这种做法, 在没有key的情况下, 所有的 li 都需要进行修改;
 * 当子元素(这里的li)拥有key时, React 使用 key 来匹配原有树上的子元素以及最新树上的子元素;
 * > 咋下面这种场景下, key为 111 和 222 的元素仅仅进行位移, 不需要进行任何的修改;
 * > 将key为 333的元素插入到最前面的位置即可;
 * 
 * key的注意事项:
 * > key应该是唯一的;
 * > key不要使用随机数(随机数在下一次render时, 会重新生成一个数字);
 * > 使用index作为key, 对性能是没有优化的;
 */

/**
 *  props/state改变 =>  render函数重新执行 => 产生新的DOM树
 *  => 新旧DOM树进行diff => 计算出差异进行更新  => 更新到真实的DOM
 */

/**
 * Diff 优化成了 O(n)?
 * 1. 同层节点之间相互比较, 不会跨节点比较;
 * 2. 不同类型的节点, 产生不同的树结构;
 * 3. 开发中, 可以通过key来指定那些节点在不同的渲染下保持稳定;
 */

/**
 * 情况一: 对比不同类型的元素
 * 1. 当一个元素从 <a> 变成  <img>, 从 <Article> 变成 <Comment>, 或从
 * <Button> 编程 <div> 都会触发一个完整的重建流程;
 * 2. 当卸载一颗树时, 对应的 DOM 节点也会被销毁, 组件实例将执行 componentWillUnmount()方法;
 * 3. 当建立一颗新的树时, 对应的 DOM 节点会被创建以及插入到DOM中, 组件实例将执行 componentWillMount()方法,
 * 紧接着 componentDidMount()方法;
 */

/**
 * 情况二: 对比同一类型的元素
 * 1. 当对比两个相同类型的 React 元素时, React 会保留 DOM 节点,仅比对及更新改变的属性.
 */

/**
 * 情况三: 对子节点进行递归
 * 1. 在默认条件下, 当递归DOM节点的子元素时, React会同时遍历两个子元素的类表; 当产生差异时, 生成一个 mutation.
 * > 我们来看下在最后插入一条数据的情况:
 * <li>first</li><li>second</li>
 * <li>first</li><li>second</li><li>third</li>
 * 
 * > 前面两个比较是完全相同时, 所以不会产生mutation;
 * > 最后一个比较,不同,产生一个mutation, 将其插入到新的DOM树中即可;
 * 
 * 2. 但是如果我们是在中间插入一条数据:
 *    <ul> <li>星际穿越</li><li>盗梦空间</li></ul>
 *    <ul> <li>大话西游</li><li>星际穿越</li><li>盗梦空间</li></ul>
 * 
 * > React会对每一个子元素产生一个mutation, 而不是保持 <li> 星际穿越 </li> 和 <li>盗梦空间</li>的不变;
 * > 这种抵消的比较方式会带来一定的性能问题;
 * 
 * 针对问题 2, key 优化
 */