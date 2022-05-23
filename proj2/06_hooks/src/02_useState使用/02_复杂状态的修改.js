import React, { useState } from 'react'

export default function ComplexHookState() {
    const [friends, setFriends] = useState(["kobe", "ifsen"]);
    const [students, setStudents ] = useState([
        {id: 110, name: 'lau', age: 18},
        {id: 111, name: 'twig', age: 20},
        {id: 112, name: 'pig', age: 30},
    ])
    function addFriend(){
        friends.push("lilei");
        setFriends(friends);
    }
    function incrementAgeWithIndex(index){
        const newStudents = [...students];
        newStudents[index].age += 1;
        setStudents(newStudents);
    }
    return (
        <div>
            <h2>好友列表:</h2>
            <ul>
                {
                    friends.map((ele, index) => {
                        return <li key={index}>{ele}</li>
                    })
                }
            </ul>
            <button onClick={e => setFriends([...friends, "tom"])}>添加好友</button>
            {/**错误做法 */}
            <button onClick={e => addFriend()}>添加好友</button>

            <h2>学生列表</h2>
            <ul>
                {
                    students.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <span>名字: {item.name}</span>
                                <span>年龄: {item.age}</span>
                                <button onClick={e => incrementAgeWithIndex(index)}>年龄操作</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
