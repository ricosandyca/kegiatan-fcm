import React, { useState, useEffect, useContext, Props } from 'react'
import firebase from 'firebase/app'

import { AuthContext, ON_FIREBASE_AUTH_STATE_CHANGED } from '../store/auth'

export default function (props: Props<{}>) {
  const [isReady, setIsReady] = useState(false)

  const auth = useContext(AuthContext)
  useEffect(() => {

    // subscribe for the firebase auth status changing
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        setIsReady(true)
        auth.dispatch({
          type: ON_FIREBASE_AUTH_STATE_CHANGED,
          payload: user
        })
    })

    return () => unsubscribe()
  }, [auth, isReady])

  return (<>{isReady ? props.children : undefined}</>)
}
