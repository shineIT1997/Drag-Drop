
import { createReducer } from '@reduxjs/toolkit'
import { toggleLoading, increment } from '_store/actions/app'

const initialState = {
  value: 0,
  loading: false
}

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleLoading, (state, action) => {
      state.loading = action.payload
    })

    .addCase(increment, (state, action) => {
      state.value += action.payload
    })
})

export default appReducer
