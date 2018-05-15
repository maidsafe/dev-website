import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

// Your top level component
import App from './containers/app'

// Export your top level component as JSX (for static rendering)
export default App

ReactGA.initialize(CONST.GA_ID);

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  // Render!
  render(App)
}
