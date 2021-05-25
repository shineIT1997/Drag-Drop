import React, { useCallback, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { login } from '_src/store/actions/auth'

const Home = (props) => {
  const dispatch = useDispatch()

  const [ form, setForm ] = useState({
    email: '',
    password: ''
  })

  console.log('state:',
    props.accessToken,
    props.refreshToken
  )

  const handleLogin = useCallback(
    async () => {
      await dispatch(login(form))
    },
    [ dispatch ]
  )

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <p>Hello World of React and Webpack!</p>
      Email:
      <input
        type="text"
        name="email"
        onChange={handleOnChange}
        value={form.email} />
      Password:
      <input
        type="text"
        name="password"
        onChange={handleOnChange}
        value={form.password} />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default connect(
  state => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken
  }), null
)(Home)
