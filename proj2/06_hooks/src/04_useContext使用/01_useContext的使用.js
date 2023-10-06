import React, { useContext } from 'react'
import { UserContext, ThemeContext} from '../App'

function ContextHookDemoOld() {
  return (
    <UserContext.Consumer>
      {
        user => {
          return (
            <ul>
              <li>姓名： {user.name}</li>
              <li>年龄： {user.age}</li>
            </ul>
          )
        }
      }
    </UserContext.Consumer>
  )
}
export default function ContextHookDemo() {
    const user = useContext(UserContext);
    const theme = useContext(ThemeContext);
    console.log({user, theme})
  return (
    <div>
      <li style={{color: theme.color}}> 姓名： {user.name}</li>
      <li style={{fontSize:theme.fontSize}}>年龄： { user.age} </li>
    </div>
  )
}
