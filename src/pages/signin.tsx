import React from 'react'

import { google } from '../services/auth/signin'

export default function () {
  return (
    <>
      <div>Signin page</div>
      <button onClick={() => google()}>Login</button>
    </>
  )
}
