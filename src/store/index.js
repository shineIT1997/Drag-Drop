/**
*@file : index.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 18:44:04 | Wednesday, May 05, 2021
*@Editor : Visual Studio Code
*@summary : redux create store function
*/

import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

// create batch dispatch
import { reduxBatch } from '@manaflair/redux-batch'

import rootReducer from '_store/reducers'

/**
 * We'll config middleware. which using on production and development
 * @param {Function} getDefaultMiddleware
 * @returns {Array}
 */
const getMiddleware = (getDefaultMiddleware) => {
  const mid = []
  if (process.env.NODE_ENV === 'development') {
    // mid.push(logger)
  }
  return getDefaultMiddleware().concat(mid)
}

const configureAppStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getMiddleware,
    preloadedState,
    enhancers: [ reduxBatch ]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureAppStore()

// The store wil be created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were composed together

