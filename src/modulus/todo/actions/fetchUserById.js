
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserById = createAsyncThunk(
  'api/todos/list/fetchById',
  async (_, { signal, getState, requestId }) => {
    const { currentRequestId, status, data } = getState()?.todo?.test

    if (status !== 'pending' || requestId !== currentRequestId) {
      return
    }

    if (status === 'fulfilled') {
      return data
    }

    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      console.log('abort:')
      source.cancel()
    })

    console.log('source:', source)

    const response = await axios.get('todos', {
      cancelToken: source.token
    })

    return { data: response.data }
  }
)
