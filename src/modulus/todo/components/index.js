import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import { unwrapResult } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { increment, toggleLoading } from '_src/store/actions/app'
import { fetchUserById } from '_modulus/todo/actions/fetchUserById'

const Todo = props => {
  const { toggleLoading, fetchUserById } = props

  const handleLoadUser = async () => {
    try {
      toggleLoading(true)
      await fetchUserById()
    } catch (error) {
      console.log('error.message : ', error.message)
    } finally {
      toggleLoading(false)
    }
  }

  useEffect(() => {
    handleLoadUser()
    return () => {
      props.fetchUserById.abort()
    }
  }, [ ])

  return (
    <div>
      {props.count.app.value} todo
      <button onClick={() => props.increment(2)}>Click me</button>
      <button onClick={handleLoadUser}>Get user</button>
    </div>
  )
}

Todo.propTypes = {
  fetchUserById: PropTypes.func
}

export default connect(
  state => ({
    count: state
  }),
  dispatch => ({
    increment: (value) => dispatch(increment(value)),
    fetchUserById: () => dispatch(fetchUserById()),
    toggleLoading: (status) => dispatch(toggleLoading(status))
  })
)(Todo)
