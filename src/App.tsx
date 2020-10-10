import React  from 'react'
import {
  BrowserRouter as Router,
  RouteProps,
  Switch,
  Route
} from 'react-router-dom'

import IndexPage from './pages'
import SigInPage from './pages/signin'
import NotFoundPage from './pages/not-found'

import Authorized from './middlewares/Authorized'
import Unauthorized from './middlewares/Unauthorized'

import { AuthContextProvider } from './store/auth'

import './config/firebase'
import './assets/styles/index.sass'

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    children: <Authorized><IndexPage/></Authorized>
  },
  {
    path: '/signin',
    exact: true,
    children: <Unauthorized><SigInPage/></Unauthorized>
  }
]

export default function () {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          { routes.map((props, i) => <Route key={i} {...props}/>) }
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}
