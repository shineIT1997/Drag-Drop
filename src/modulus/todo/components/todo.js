import React from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { increment, toggleLoading } from '_src/store/actions/app'
import { fetchUser, fetchTodos } from '_modulus/todo/actions/fetchUserById'
import notify from '_src/utils/notify'
import useSingleAxios from '_src/utils/hook/useSingleAxios'
import useMultipleAxios from '_src/utils/hook/useMultipleAxios'

let count = 0
const Todo = props => {
  const dispatch = useDispatch()

  // useSingleAxios({ asyncFunction: fetchUser, delay: 2000 })

  const todo = useMultipleAxios({
    arrayActionsFunc: [
      {
        asyncAction: fetchTodos
      },
      {
        asyncAction: fetchUser
      }
    ],
    isResp: true
  })
  console.log('todo:', todo)

  console.log('++count:', ++count)

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

      await props.loadTodo()
      dispatch(toggleLoading(false))
    } catch (error) {
      console.log('error.message : ', error.message)
    }
  }
  console.log('props.data:', props.data)

  return (
    <div>
      {props.value } todo
      <button onClick={handleIncrement}>Notify</button>
      <button onClick={handleLoadUser}>Get user</button>
      <pre>{JSON.stringify(props.data.todos)}</pre>
      <pre>{JSON.stringify(props.data.users)}</pre>
    </div>
  )
}

Todo.propTypes = {
  value: PropTypes.number,
  data: PropTypes.object
}

export default connect(
  state => ({
    value: state.app.value,
    data: state.todo.test.data
  }),
  dispatch => ({
    loadTodo: () => dispatch(fetchTodos())
  })
)(Todo)
