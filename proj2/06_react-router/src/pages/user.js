import React, { useState } from 'react'

import { 
    Redirect
  } from 'react-router-dom'
export default function User() {
  const [isLogin, setIsLogin] = useState(false)
  return isLogin? (
    <div>
        <h2>用户名：twig</h2>
        <h4>手机号：13340087100</h4>
    </div>
  ) : <Redirect to="/login" />
}
