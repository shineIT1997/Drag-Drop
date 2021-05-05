import { createAction } from '@reduxjs/toolkit'

const increment = createAction('app/increment', (value) => {
  return ({
    payload: value
  })
})

const toggleLoading = createAction('app/loading', (status) => {
  return ({
    payload: status
  })
})

export {
  increment,
  toggleLoading
}
