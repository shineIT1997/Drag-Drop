import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '_router'

const Main = props => {
  return (
    <main
      id="main">
      <Switch>
        {routes.map(route => (

          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.main || route.component}
          />
        ))}
      </Switch>
    </main>

  )
}

Main.propTypes = {

}

export default Main
