import React, { Props } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/core/styles/makeStyles'

import themeConfig from '../config/theme'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: themeConfig.primary
    },
    secondary: {
      main: themeConfig.secondary
    }
  }
})

const useStyles = makeStyles({
  root: {
    backgroundColor: themeConfig.light
  }
})

export default function (props: Props<any>) {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {props.children}
      </div>
    </ThemeProvider>
  )
}
