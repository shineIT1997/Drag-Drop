
import { createAction, createReducer } from '@reduxjs/toolkit'
const initialState = { value: 0 }

const isAppAction = (action) => {
  return action.type.startsWith('app/')
}

const appReducer = createReducer(initialState, (builder) => {
  builder.addMatcher(isAppAction, (state, action) => {
    console.log('action:', action)
  })
})

export default appReducer
