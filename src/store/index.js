/**
*@file : index.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 18:44:04 | Wednesday, May 05, 2021
*@Editor : Visual Studio Code
*@summary : redux create store function
*/

import { configureStore } from '@reduxjs/toolkit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

// And use redux-batch as an example of adding enhancers
import { reduxBatch } from '@manaflair/redux-batch'
import rootReducer from '_store/reducers'

export default function configureAppStore (preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(loggerMiddleware),
    preloadedState
    // enhancers: [ monitorReducersEnhancer ]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

