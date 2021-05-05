import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureAppStore from '_store'
import Main from '_layout/main'

const store = configureAppStore()

const App = props => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          id="app"
          className="app">
          <Main/>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
