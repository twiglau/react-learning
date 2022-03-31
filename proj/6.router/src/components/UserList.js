import React, { Component } from 'react';
import { Link } from '../react-router-dom';
import Local from '../store';
export default class UserList extends Component {
    state = {users:[]}
    componentDidMount(){
        let users = Local.getList()
        console.log(users)
        this.setState({users})
    }
    render(){
        return (
            <ul className='list-group'>
                {
                    this.state.users.map(item=>(
                        <li className='list-group-item' key={item.id}> 
                           <Link to={{pathname:`/user/detail/${item.id}`,state:item}}>{item.username}</Link>
                        </li>
                    ))
                }
            </ul>
        )
    }
}