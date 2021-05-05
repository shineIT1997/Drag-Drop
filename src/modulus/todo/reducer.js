
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  status: 'idle',
  currentRequestId: undefined,
  error: null
}

const isPendingAction = (action) => {
  return action.type.startsWith('api/todos/') && action.type.endsWith('/pending')
}

const isFulfilledAction = (action) => {
  return action.type.startsWith('api/todos/') && action.type.endsWith('/fulfilled')
}

const isRejectAction = (action) => {
  return action.type.startsWith('api/todos/') && action.type.endsWith('/rejected')
}

const todoReducer = createReducer(initialState, (builder) => {
  builder.addMatcher(isPendingAction, (state, action) => {
    if (state.status === 'idle') {
      state.status = 'pending'
      state.currentRequestId = action.meta.requestId
    }
  })

  builder.addMatcher(isFulfilledAction, (state, action) => {
    const { requestId } = action.meta
    if (state.status === 'pending' && state.currentRequestId === requestId) {
      state.status = 'fulfilled'
      state.data = [ ...action.payload ]
      state.currentRequestId = undefined
    }
  })

  builder.addMatcher(isRejectAction, (state, action) => {
    const { requestId } = action.meta
    if (state.status === 'pending' && state.currentRequestId === requestId) {
      state.status = 'idle'
      state.error = action.error
      state.currentRequestId = undefined
    }
  })
})

export default {
  name: 'todo',
  reducer: todoReducer
}
