import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { increment, toggleLoading } from '_src/store/actions/app'
import { fetchUserById } from '_modulus/todo/actions/fetchUserById'
import notify from '_src/utils/notify'
import { cancelApis } from '_src/utils/axios'

const Todo = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    handleLoadUser()
    return () => {
      cancelApis(fetchUserById)
    }
  }, [])

  const handleIncrement = () => {
    dispatch(increment(2))
    notify({
      type: 'success',
      message: 'test'
    })
  }
  const handleLoadUser = useCallback(
    async () => {
      try {
        dispatch(toggleLoading(true))
        await dispatch(fetchUserById())
      } catch (error) {
        console.log('error.message : ', error.message)
      } finally {
        dispatch(toggleLoading(false))
      }
    },
    [ dispatch ]
  )

  return (
    <div>
      {props.value } todo
      <button onClick={handleIncrement}>Notify</button>
      <button onClick={handleLoadUser}>Get user</button>
      <pre>{JSON.stringify(props.todo.data)}</pre>
    </div>
  )
}

Todo.propTypes = {
  value: PropTypes.number,
  todo: PropTypes.object
}

export default connect(
  state => ({
    value: state.app.value,
    todo: state.todo.test
  }),
  null
)(Todo)
