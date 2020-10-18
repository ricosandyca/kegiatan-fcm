import React, { Props, ReactNode } from 'react'

import Button from '@material-ui/core/Button'
import { Theme } from '@material-ui/core/styles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { SiGoogle, SiFacebook, SiGithub } from 'react-icons/si'

type AuthButtonStyleClassKey = 'root' | 'label' | 'startIcon'
type AuthButtonStyleProps = {
  backgroundColor: string
  textColor: string
}

type AuthButtonProps = Props<any> & {
  type: 'Google' | 'Facebook' | 'Github'
  onClick: Function
}

const useStyles = makeStyles<Theme, AuthButtonStyleProps, AuthButtonStyleClassKey>({
  root: {
    backgroundColor: props => props.backgroundColor,
    position: 'relative',
    borderRadius: '5px',
    transition: '.3s',
    '&:hover, &:active, &:focus': {
      backgroundColor: props => props.backgroundColor,
      opacity: .8
    }
  },
  label: {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: '38px',
    color: props => props.textColor,
  },
  startIcon: {
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: '25px',
    position: 'absolute'
  }
})

export default function (props: AuthButtonProps) {
  let icon: ReactNode
  let text = `Continue with ${props.type}`
  let backgroundColor: string
  let textColor: string

  switch (props.type) {
    case 'Google':
      icon = <SiGoogle size='18'/>
      backgroundColor = '#ea4335'
      textColor = 'white'
      break
    case 'Facebook':
      icon = <SiFacebook size='18'/>
      backgroundColor = '#1877F2'
      textColor = 'white'
      break
    case 'Github':
      icon = <SiGithub size='18'/>
      backgroundColor = '#24292e'
      textColor = 'white'
      break
    default:
      throw new Error('Invalid auth button type')
  }

  const classes = useStyles({
    backgroundColor,
    textColor
  })

  return (
    <Button
      fullWidth
      variant='contained'
      color='primary'
      classes={{
        root: classes.root,
        label: classes.label,
        startIcon: classes.startIcon
      }}
      startIcon={icon}
      onClick={() => props.onClick()}
      >
      {text}
    </Button>
  )
}
