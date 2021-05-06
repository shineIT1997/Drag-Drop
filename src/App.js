import React, { useMemo } from 'react'
import { connect, Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

import Main from '_layout/main'
import AppLoading from '_src/components/Loading/App'

import 'react-toastify/dist/ReactToastify.css'
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import '_styles/notify.scss'

import configureAppStore from '_store'

const store = configureAppStore()

const App = (props) => {
  const renderLoading = useMemo(() => props.loading && <AppLoading/>, [ props.loading ])
  return (
    <div
      id="app"
      className="app">
      <Main />

      {renderLoading}
      <ToastContainer
        autoClose={false}
        className='snackbar-container'
        toastClassName='snackbar-item'
        bodyClassName='snackbar-body'
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    loading: state.app.loading
  })
}

const AppWithStore = connect(
  mapStateToProps,
  null
)(App)

export default () =>
  <Provider store={store}>
    <BrowserRouter>
      <AppWithStore/>
    </BrowserRouter>
  </Provider>
