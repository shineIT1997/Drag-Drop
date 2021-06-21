import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * register account
 */
const register = createAsyncThunk(
  'auth/register',
  async (payload, { signal, getState, requestId, rejectWithValue }) => {
    const { currentRequestId, status } = getState()?.auth

    if (status !== 'pending' || requestId !== currentRequestId) {
      return
    }

    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    try {
      const { data } = await axios.post('/api/auth/register', {
        ...payload
      }, {
        cancelToken: source.token
      })

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const test = createAsyncThunk(
  'auth/test',
  async (payload, { signal, getState, requestId, rejectWithValue }) => {
    const { currentRequestId, status } = getState()?.auth

    if (status !== 'pending' || requestId !== currentRequestId) {
      return
    }

    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    try {
      const { data } = await axios.post('/api/auth/test', {
        ...payload
      }, {
        cancelToken: source.token
      })

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

/**
 * login account
 * @param {Object} payload
 */
const login = createAsyncThunk(
  'auth/login',
  async (payload, { signal, getState, requestId, rejectWithValue }) => {
    const { currentRequestId, status } = getState()?.auth

    if (status !== 'pending' || requestId !== currentRequestId) {
      return
    }

    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    try {
      const { data } = await axios.post('/api/auth/login', {
        ...payload
      }, {
        cancelToken: source.token
      })

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

/**
 * @param {String} accessToken
 */
const callRequestsFromQueue = createAction('auth/callQueueRequest', (accessToken) => {
  return ({
    payload: accessToken
  })
})

/**
 * @param {Boolean} status
 */
const toggleFetchingAccessToken = createAction('auth/fechingAccessToken', (status) => {
  return ({
    payload: status
  })
})

/**
 * @param {Function} subscriber
 */
const addSingleRequestsToQueue = createAction('auth/addSingleRequestToQueue', (subscriber) => {
  return ({
    payload: subscriber
  })
})

const createAcessToken = createAction('auth/accessToken')

export {
  callRequestsFromQueue,
  createAcessToken,
  toggleFetchingAccessToken,
  addSingleRequestsToQueue,
  login,
  register,
  test
}
