
import { createReducer } from '@reduxjs/toolkit'
import {
  callRequestsFromQueue,
  createAcessToken,
  toggleFetchingAccessToken,
  addSingleRequestsToQueue
} from '../actions/auth'
import {
  IDLE,
  PENDING,
  FULFILLED,
  REJECTED
} from '_src/constants/apis'

function makeid (length) {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
  charactersLength)))
  }
  return result.join('')
}

/**
 *
 * @param {Object} action
 */
const isPendingAction = (action) => {
  return action.type.startsWith('auth/') && action.type.endsWith('/pending')
}

/**
 *
 * @param {Object} action
 */
const isFulfilledAction = (action) => {
  return action.type.startsWith('auth/') && action.type.endsWith('/fulfilled')
}

/**
 *
 * @param {Object} action
 */
const isRejectAction = (action) => {
  return action.type.startsWith('auth/') && action.type.endsWith('/rejected')
}

const initialState = {
  status: IDLE,
  error: {},
  isAlreadyFetchingAccessToken: false,
  requestQueue: [],
  accessToken: '',
  refreshToken: '',
  currentRequestId: undefined
}

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(callRequestsFromQueue, (state, action) => {
      state.requestQueue.forEach(subscriber => subscriber(action.payload))
    })
    .addCase(createAcessToken, (state, action) => {
      state.accessToken = makeid(Math.random())
    })
    .addCase(toggleFetchingAccessToken, (state, action) => {
      state.isAlreadyFetchingAccessToken = action.payload
    })
    .addCase(addSingleRequestsToQueue, (state, action) => {
      state.requestQueue.push(action.payload)
    })

  /**
   * filter and add all pending action API
   */
  builder.addMatcher(isPendingAction, (state, action) => {
    if (state.status !== PENDING) {
      return { ...state, status: PENDING, currentRequestId: action.meta.requestId }
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
    console.log('action.error : ', action)
    const { requestId } = action.meta
    if (state.status === PENDING && state.currentRequestId === requestId) {
      state.error = action.error
      state.status = REJECTED
      state.currentRequestId = undefined
    }
  })
})

export default authReducer
