import React, { PureComponent } from 'react'

export default class App extends PureComponent {
    
  state = {
      friends: [
          {name: 'jack', age: 20},
          {name: 'lacy', age: 30},
          {name: 'rowland', age: 10},
      ]
  }
  render() {
    return (
      <div>
        <h2>好友列表</h2>
        <ul>
            {
                this.state.friends.map((item, index)=>{
                    return (
                      <li key={item.name}> 
                      {item.name} 
                      年龄: {item.age}
                      <button onClick={e=>this.incrementAge(index)}>age+1</button>
                      </li>

                    )
                })
            }
        </ul>
        <button onClick={e=>this.insertData()}>添加数据</button>
      </div>
    )
  }
  incrementAge(index){
    const newFriends = [...this.state.friends]
    newFriends[index].age += 1
    this.setState({
      friends: newFriends
    })
  }
  //SCU优化
//   shouldComponentUpdate(newProps, newState){
//     // 引用类型
//     // 在内存中开辟一片内存空间,存放 friends 数组
//     // friends 是一个引用, 
//     // friends: 0x100, 通过内存地址 0x100, 找到对应的内存
//       if(newState.friends !== this.state.friends){
//           return true;
//       }
//       return false;
//   }
  insertData(){
      // 1. 在开发中不要这样来做
    //   const newData = {name: 'rlande', age: 15}
    //   this.state.friends.push(newData)
    //   this.setState({
    //       friends: this.state.friends
    //   })

    // 2. 推荐做法
    // newFriends 创建一个新的引用
    // newFriends = this.state.friends => 不能这样做
    const newFriends = [...this.state.friends];
    newFriends.push({name:'tom',age:30});
    this.setState({
        friends: newFriends
    })
  }
}
