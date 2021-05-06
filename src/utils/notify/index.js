import React from 'react'
import Snackbar from '_components/Snackbar'
import { toast } from 'react-toastify'

const notify = (props) => {
// Remove all toasts !
  toast.dismiss()

  toast[props.type](<Snackbar
    type={props.type}
    message={props.message} />, {
    className: `snackbar-item ${props.type}` // style in app.scss selector
  })
}

export default notify
