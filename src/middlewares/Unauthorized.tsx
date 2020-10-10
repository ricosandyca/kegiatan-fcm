import React, { useContext, Props } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../store/auth'

export default function (props: Props<any>) {
  const auth = useContext(AuthContext)

  if (auth.state) return <Redirect to='/' />
  return <>{props.children}</>
}
