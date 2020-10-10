import React, {
  useReducer,
  createContext,
  Reducer,
  Props
} from 'react'
import { User } from 'firebase'

import FirebaseAuthSubscriber from '../middlewares/FirebaseAuthSubscriber'
import appConfig from '../config/app'

const STORAGE_KEY = appConfig.appName + '-store-auth'

export const ON_FIREBASE_AUTH_STATE_CHANGED = 'ON_FIREBASE_AUTH_STATE_CHANGED'

type State = User | undefined | null
type Action = {
  type: typeof ON_FIREBASE_AUTH_STATE_CHANGED
  payload: State
}

const reducer: Reducer<State, Action> = (state, action) => {
  let newState: State
  switch (action.type) {
    case ON_FIREBASE_AUTH_STATE_CHANGED:
      newState = action.payload
      break
    default:
      newState = state
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  return newState
}

export const AuthContext = createContext<{
  state: State, dispatch: (action: Action) => any
}>({ state: undefined, dispatch: () => undefined })

export function AuthContextProvider (props: Props<{}>) {
  let currentAuthData
  try {
    currentAuthData = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '')
  } catch {}

  const [state, dispatch] = useReducer(reducer, currentAuthData)

  return (
    <AuthContext.Provider value={{state,dispatch}}>
      <FirebaseAuthSubscriber>
        {props.children}
      </FirebaseAuthSubscriber>
    </AuthContext.Provider>
  )
}
