import React from 'react'
import CheckIcon from '_static/icons/noti-check.svg'
import TriangleWarningIcon from '_static/icons/triangle-warning.svg'
import CircleErrorIcon from '_static/icons/circle-error.svg'
// import '_styles/notify.scss'

export default function index (props) {
  const SNACKBAR_ICON = {
    success: CheckIcon,
    warning: TriangleWarningIcon,
    error: CircleErrorIcon
  }

  const SNACKBAR_TITLE = {
    error: 'error',
    success: 'success',
    info: 'info',
    warn: 'warn'
  }

  return (
    <>
      <div className='snackbar__title'>
        <img
          src={SNACKBAR_ICON[props.type]}
          alt={props.type} />
        <p
          className='snackbar__type'>
          {SNACKBAR_TITLE[props.type]}
        </p>
      </div>

      <div className='snackbar__content'>
        <p
          className='snackbar__message'>
          {props.message || 'There was some technical issues while processing your request'}
        </p>
      </div>
    </>
  )
}
