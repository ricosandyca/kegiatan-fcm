import React from 'react'

import TodoCard from '../components/TodoCard'

import signout from '../services/auth/signout'

export default function () {
  return (
    <div className='page-main'>
      <div>Index page</div>
      <button onClick={() => signout()}>Logout</button>
      <div className='todo'>
        <TodoCard />
      </div>
    </div>
  )
}
