import React, { useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { login } from '_src/store/actions/auth'

const Home = (props) => {
  const dispatch = useDispatch()

  console.log('state:',
    props.accessToken,
    props.refreshToken
  )

  const handleGetToken = useCallback(
    async () => {
      await dispatch(login())
    },
    [ dispatch ]
  )
  return (
    <div>
      <p>Hello World of React and Webpack!</p>

      <button onClick={handleGetToken}>Get Token</button>
    </div>
  )
}

export default connect(
  state => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken
  }), null
)(Home)
