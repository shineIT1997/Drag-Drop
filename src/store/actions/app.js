import { createAction } from '@reduxjs/toolkit'

import { LIGHT, DARK } from '_src/constants'

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

// default is dark theme
const toggleTheme = createAction('app/theme', (theme) => {
  return ({
    payload: theme || DARK
  })
})

export {
  increment,
  toggleLoading,
  toggleTheme
}
