import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction('app/increment')
const invalid = createAction('increment')

export {
  increment,
  invalid
}
