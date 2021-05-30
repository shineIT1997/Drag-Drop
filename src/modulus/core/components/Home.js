import { unwrapResult } from '@reduxjs/toolkit'
import React, { useCallback, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { login, register, test } from '_src/store/actions/auth'

import { callApi } from '_src/utils/axios'
import notify from '_src/utils/notify'

const Home = (props) => {
  const [ loginForm, setLoginForm ] = useState({
    email: '',
    password: ''
  })
  const [ registerForm, setRegisterForm ] = useState({
    email: '',
    password: ''
  })

  console.log('state:',
    props.accessToken,
    props.refreshToken
  )

  const handleRegister = async () => {
    try {
      const data = await callApi(() => register(registerForm))

      console.log(data)
    } catch (error) {
      // notify({
      //   type: 'error',
      //   message: error.msg
      // })
      console.log(error)
    }
  }

  const handleLogin = async () => {
    try {
      const data = await callApi(() => login(loginForm))

      console.log(data)
    } catch (error) {
      // notify({
      //   type: 'error',
      //   message: error.msg
      // })
      console.log(error)
    }
  }

  const handleOnChangeLogin = (e) => {
    const { name, value } = e.target

    setLoginForm(prev => ({ ...prev, [name]: value }))
  }

  const handleOnChangeRegister = (e) => {
    const { name, value } = e.target

    setRegisterForm(prev => ({ ...prev, [name]: value }))
  }

  const handleTest = async () => {
    const data = await callApi(() => test())
  }

  return (
    <div>
      <p>Hello World of React and Webpack! Register</p>
      Email:
      <input
        type="text"
        name="email"
        onChange={handleOnChangeRegister}
        value={registerForm.email} />
      Password:
      <input
        type="text"
        name="password"
        onChange={handleOnChangeRegister}
        value={registerForm.password} />

      <button onClick={handleRegister}>Register</button>
      <br />
      <p>------------------------</p>

      login:
      <input
        type="text"
        name="email"
        onChange={handleOnChangeLogin}
        value={loginForm.email} />
      Password:
      <input
        type="text"
        name="password"
        onChange={handleOnChangeLogin}
        value={loginForm.password} />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleTest}>test</button>
    </div>
  )
}

export default connect(
  state => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken
  }), null
)(Home)
