
import { combineReducers, createReducer } from '@reduxjs/toolkit'
import {
  IDLE,
  PENDING,
  FULFILLED,
  REJECTED
} from '_src/constants/apis'

const initialState = {
  data: {},
  status: {
    users: IDLE,
    todos: IDLE
  },
  currentRequestId: {
    users: undefined,
    todos: undefined
  },
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

const getStatusKeyFromActionType = (path) => {
  return path.split('/')[1]
}

const todoReducer = createReducer(initialState, (builder) => {
  /**
   * filter and add all pending action API
   */
  builder.addMatcher(isPendingAction, (state, action) => {
    const keyStatus = getStatusKeyFromActionType(action.type)
    const currentStatus = state.status[keyStatus]

    // if status is fulfilled, dont change status to call Api again
    if (currentStatus === IDLE || currentStatus === REJECTED) {
      return {
        ...state,
        status: { ...state.status, [keyStatus]: PENDING },
        currentRequestId: { ...state.currentRequestId, [keyStatus]: action.meta.requestId }
      }
    }
  })

  /**
   * filter and add all fulfilled action API
   */
  builder.addMatcher(isFulfilledAction, (state, action) => {
    const keyStatus = getStatusKeyFromActionType(action.type)
    const { requestId } = action.meta
    if (state.status[keyStatus] === PENDING && state.currentRequestId[keyStatus] === requestId) {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        status: { ...state.status, [keyStatus]: FULFILLED },
        currentRequestId: { ...state.currentRequestId, [keyStatus]: undefined }
      }
    }
  })

  /**
   * filter and add all reject action API
   */
  builder.addMatcher(isRejectAction, (state, action) => {
    const keyStatus = getStatusKeyFromActionType(action.type)
    const { requestId } = action.meta
    if (state.status[keyStatus] === PENDING && state.currentRequestId[keyStatus] === requestId) {
      return {
        ...state,
        error: action.error,
        status: { ...state.status, [keyStatus]: REJECTED },
        currentRequestId: { ...state.currentRequestId, [keyStatus]: undefined }
      }
    }
  })
})

export default {
  todo: combineReducers({
    test: todoReducer
  })
}
