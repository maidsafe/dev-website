import React from 'react'
import { Router, Link } from 'react-static'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
//
import store from './connectors/redux'

import './scss/app.scss'

const i18n = store.getState().userPreference.acceptLanguage
const platform = store.getState().userPreference.apiDocument.platform
const platformVersion = store.getState().userPreference.apiDocument.version

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to={{
             pathname: `/${i18n}/node-js-api-tut`,
          }}>Node JS API Tutorial</Link>
          <Link to={{
             pathname: `/${i18n}/api/${platform}/${platformVersion}`,
          }}>SAFE WEB API 0.5.2</Link>
        </nav>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  </Provider>
)

export default hot(module)(App)
