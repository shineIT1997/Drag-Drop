
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  IDLE,
  PENDING,
  FULFILLED,
  REJECTED
} from '_src/constants/apis'

export const fetchTodos = createAsyncThunk(
  'api/todos/list/fetchById',
  async (_, { signal, getState, requestId }) => {
    try {
      const { currentRequestId, status, data } = getState()?.todo?.test

      if (status?.todos !== PENDING || requestId !== currentRequestId?.todos) {
        return
      }

      if (status?.todos === FULFILLED) {
        return data
      }

      const source = axios.CancelToken.source()
      signal.addEventListener('abort', () => {
        source.cancel()
      })

      const response = await axios.get('todos', {
        cancelToken: source.token
      })

      return { todos: response.data }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled')
      } else {
        // handle error
      }
    }
  }
)

export const fetchUser = createAsyncThunk(
  'api/users/list/fetchById',
  async (_, { signal, getState, requestId }) => {
    const { currentRequestId, status, data } = getState()?.todo?.test

    if (status?.users !== 'pending' || requestId !== currentRequestId?.users) {
      return
    }

    if (status?.users === 'fulfilled') {
      return data
    }

    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel({
        status: 700
      })
    })

    const response = await axios.get('users', {
      cancelToken: source.token
    })

    return { users: response.data }
  }
)
