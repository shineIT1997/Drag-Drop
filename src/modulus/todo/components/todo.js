import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { increment, toggleLoading } from '_src/store/actions/app'
import { fetchUserById } from '_modulus/todo/actions/fetchUserById'
import notify from '_src/utils/notify'

const Todo = props => {
  const dispatch = useDispatch()
  const callback = []

  useEffect(() => {
    console.log('didUpdate:')

    handleLoadUser()

    return () => {
      console.log('mounted:')
      callback.forEach(element => {
        element.abort()
      })
    }
  }, [ ])

  const handleIncrement = () => {
    dispatch(increment(2))
    notify({
      type: 'success',
      message: 'test'
    })
  }

  const handleLoadUser = async () => {
    try {
      dispatch(toggleLoading(true))
      callback.push(props.loadTodo())

      await Promise.all([ ...callback ])
      dispatch(toggleLoading(false))
    } catch (error) {
      console.log('error.message : ', error.message)
    }
  }

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
  dispatch => ({
    loadTodo: () => dispatch(fetchUserById())
  })
)(Todo)
