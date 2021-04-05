
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

import '_utils/axios'

ReactDOM.render(
  <App />
  , document.getElementById('root'))

registerServiceWorker()
