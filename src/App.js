import React, { useEffect } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'

const App = props => {
  const responseFacebook = (resp) => console.log('resp : ', resp)

  // useEffect(() => {
  //   axios.get('location/search/?query=san')
  //     .then(res => console.log('res:', res))
  //     .catch(err => console.log('err:', err))
  // }, [ ])
  return (
    <FacebookLogin
      appId="350529136341118"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      render={renderProps => {
        <button onClick={renderProps.onClick}>This is my custom fffFB button</button>
      }}
    />
  )
}

export default App
