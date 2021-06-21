import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'
import useStyles from './style'
import { isReactComponent } from '_src/utils/helper'

const ButtonUI = props => {
  const { outSideClasses, type, width, height, label, disabled, Icon, iconPosition } = props

  const classes = useStyles({ width, height, iconPosition })

  return (
    <Box
      component="button"
      disabled={disabled}
      className={[ classes.buttonRoot, classes[type], outSideClasses ].join(' ')}>
      <Typography variant="subtitle2">{label}</Typography>

      {Boolean(Icon?.type?.$$typeof) && <Box className={classes.icon}>{Icon}</Box> }
    </Box>
  )
}

ButtonUI.defaultProps = {
  label: 'Button',
  type: 'primary',
  width: 'fit-content',
  height: 40,
  iconPosition: 'start'
}

ButtonUI.propTypes = {
  disabled: PropTypes.bool,
  outSideClasses: PropTypes.string,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.element,
  iconPosition: PropTypes.oneOf([ 'start', 'end' ]),
  type: PropTypes.oneOf([ 'primary', 'secondary' ]).isRequired
}

export default ButtonUI
