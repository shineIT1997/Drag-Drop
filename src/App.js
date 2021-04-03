import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

const App = props => {
  const responseFacebook = (resp) => console.log('resp : ', resp)
  return (
    <FacebookLogin
      appId="350529136341118"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      render={renderProps => {
        <button onClick={renderProps.onClick}>This is my custom FB button</button>
      }}
    />
  )
}

export default App
