import React from 'react'

import signout from '../services/auth/signout'

export default function () {
  return (
    <>
      <div>Index page</div>
      <button onClick={() => signout()}>Logout</button>
    </>
  )
}
