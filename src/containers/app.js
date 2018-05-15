import React from 'react';
import { Router, Link } from 'react-static';
import { hot } from 'react-hot-loader';
import ReactGA from 'react-ga';

//
import Routes from 'react-static-routes';
import Header from './partials/header';
import Footer from './partials/footer';
import CONST from '../constants';

import '../sass/main.sass';
class App extends React.Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      yPos: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  handleScroll(e) {
    this.setState({
      yPos: window.pageYOffset,
    });
  }
  render() {
    const isScrolling = !(this.state.yPos <= 10);
    return (
      <Router>
        <div className="root-b">
          <Header isScrolling={isScrolling} />
          <main className="content">
            <Routes />
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
