import React from 'react'

import TodoCard from '../components/TodoCard'
import UploadFile from '../components/UploadFile'

import signout from '../services/auth/signout'

export default function () {
  return (
    <div className='page-main'>
      <div>Index page</div>
      <button onClick={() => signout()}>Logout</button>
      <div className='todo'>
        <TodoCard />
        <UploadFile />
      </div>
    </div>
  )
}
