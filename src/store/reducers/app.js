
import { createReducer } from '@reduxjs/toolkit'
import { LIGHT, DARK } from '_src/constants'
import { toggleLoading, increment, toggleTheme } from '_store/actions/app'

const initialState = {
  value: 0,
  loading: false,
  theme: LIGHT
}

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleLoading, (state, action) => {
      state.loading = action.payload
    })

    .addCase(increment, (state, action) => {
      state.value += action.payload
    })

    .addCase(toggleTheme, (state, action) => {
      state.theme = action.payload
    })
})

export default appReducer
