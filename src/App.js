import React, { useMemo } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Main from '_layout/main'
import AppLoading from '_components/loading/appLoading'

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
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.app.loading
})

const mapDispatchToProps = null

const AppWithStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default () =>
  <Provider store={store}>
    <BrowserRouter>
      <AppWithStore/>
    </BrowserRouter>
  </Provider>
