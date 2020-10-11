import React from 'react'

import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

import AuthButton from '../components/AuthButton'

import appConfig from '../config/app'
import themeConfig from '../config/theme'

import { google as googleAuth } from '../services/auth/signin'

const useStyles = makeStyles({
  title: {
    fontWeight: 700,
    color: themeConfig.dark
  }
})

export default function () {
  const classes = useStyles()

  return (
    <div className='page-signin'>
      <Typography
        variant='h4'
        className='title'
        classes={{ root: classes.title }}
        >
        Sign in to {appConfig.appName}
      </Typography>
      <form className='auth-form'>
        <div className='auth-button'>
          <AuthButton type='Google' onClick={() => googleAuth()}/>
        </div>
      </form>
    </div>
  )
}
