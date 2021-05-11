
import { combineReducers, createReducer } from '@reduxjs/toolkit'
import {
  IDLE,
  PENDING,
  FULFILLED,
  REJECTED
} from '_src/constants/apis'

const initialState = {
  data: [],
  status: IDLE,
  currentRequestId: undefined,
  error: null
}

/**
 *
 * @param {Object} action
 */
const isPendingAction = (action) => {
  return action.type.startsWith('api/') && action.type.endsWith('/pending')
}

/**
 *
 * @param {Object} action
 */
const isFulfilledAction = (action) => {
  return action.type.startsWith('api/') && action.type.endsWith('/fulfilled')
}

/**
 *
 * @param {Object} action
 */
const isRejectAction = (action) => {
  return action.type.startsWith('api/') && action.type.endsWith('/rejected')
}

const todoReducer = createReducer(initialState, (builder) => {
  /**
   * filter and add all pending action API
   */
  builder.addMatcher(isPendingAction, (state, action) => {
    if (state.status === IDLE || state.status === REJECTED) {
      return { ...state, ...action.payload, status: PENDING, currentRequestId: action.meta.requestId }
    }
  })

  /**
   * filter and add all fulfilled action API
   */
  builder.addMatcher(isFulfilledAction, (state, action) => {
    const { requestId } = action.meta
    if (state.status === PENDING && state.currentRequestId === requestId) {
      return { ...state, ...action.payload, status: FULFILLED, currentRequestId: undefined }
    }
  })

  /**
   * filter and add all reject action API
   */
  builder.addMatcher(isRejectAction, (state, action) => {
    const { requestId } = action.meta
    if (state.status === PENDING && state.currentRequestId === requestId) {
      console.log('...action.payload:', action)
      return { ...state, error: action.error, status: REJECTED, currentRequestId: undefined }
    }
  })
})

export default {
  todo: combineReducers({
    test: todoReducer
  })
}
