import React, { useEffect } from 'react'
import { Root, Routes } from 'react-static';
import { useHistory } from 'react-router-dom'
import { hot } from 'react-hot-loader';
//
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
    // window.addEventListener('scroll', this.handleScroll); // Disable fixed header because it's buggy
  }

  handleScroll(e) {
    this.setState({
      yPos: window.pageYOffset,
    });
  }
  render() {
    const isScrolling = !(this.state.yPos <= 10);

    const ScrollRestoration = () => {
      const history = useHistory()
      useEffect(() => {
        if (history.action !== 'POP') {
          window.scrollTo(0, 0)
        }
      }, [history.location.pathname])
      return null
    }

    return (
      <Root>
        <React.Suspense fallback={<span>Loading...</span>}>
          <ScrollRestoration />
          <Header isScrolling={isScrolling} />
          <main className="content">
            <Routes />
          </main>
          <Footer />
        </React.Suspense>
      </Root>
    )
  }
}

export default hot(module)(App)
