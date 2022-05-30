import React from 'react'
import useUserContext from '../hooks/user-hook';
export default function CustomContextShareHook() {

const [user, token] = useUserContext();
  return (
    <div>
      <h2>CustomContextShareHook</h2>
      <h2>{user.name} {user.age}</h2>
      <h2>{token.token}</h2>
    </div>
  )
}
