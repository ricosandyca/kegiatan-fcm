import React, {
  useReducer,
  createContext,
  Reducer,
  Props
} from 'react'
import { User } from 'firebase'

import FirebaseAuthSubscriber from '../middlewares/FirebaseAuthSubscriber'

export const ON_FIREBASE_AUTH_STATE_CHANGED = 'ON_FIREBASE_AUTH_STATE_CHANGED'

type State = User | undefined | null
type Action = {
  type: typeof ON_FIREBASE_AUTH_STATE_CHANGED
  payload: State
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ON_FIREBASE_AUTH_STATE_CHANGED:
      return action.payload
    default:
      return state
  }
}

export const AuthContext = createContext<{
  state: State, dispatch: (action: Action) => any
}>({ state: undefined, dispatch: () => undefined })

export function AuthContextProvider (props: Props<{}>) {
  const [state, dispatch] = useReducer(reducer, undefined)

  return (
    <AuthContext.Provider value={{state,dispatch}}>
      <FirebaseAuthSubscriber>
        {props.children}
      </FirebaseAuthSubscriber>
    </AuthContext.Provider>
  )
}
