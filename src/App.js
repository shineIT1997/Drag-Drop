import React, { useMemo } from 'react'
import { connect, Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import Main from '_src/layout/Main'
import Header from '_layout/Header'
import AppLoading from '_src/components/Loading/App'

import store from '_store'
import 'react-toastify/dist/ReactToastify.css'

import '_styles/app.scss'
import { theme as DARK } from './styles/theme/dark'
import { theme as LIGHT } from './styles/theme/light'
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

console.log('LIGHT : ', LIGHT)

const THEME_TYPE = {
  dark: DARK,
  light: LIGHT
}

const App = (props) => {
  const renderLoading = useMemo(() => props.loading && <AppLoading />, [ props.loading ])

  console.log('THEME_TYPE[props.theme] : ', THEME_TYPE[props.theme])

  return (
    <ThemeProvider theme={THEME_TYPE[props.theme]}>
      <div
        id="app"
        className="app">
        <Header />

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
    </ThemeProvider >

  )
}

const mapStateToProps = state => {
  return ({
    loading: state.app.loading,
    theme: state.app.theme
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
