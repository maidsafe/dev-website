import React from 'react'
import ReactGA from 'react-ga';
//
export default function withTracker(WrappedComponent, data = {}, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  class HOC extends React.Component {
    componentDidMount() {
      const page = window.location.pathname + window.location.search;
      trackPage(page);
    }

    // componentWillReceiveProps(nextProps) {
    //   const currentPage = window.location.pathname;
    //   const nextPage = nextProps.location.pathname;
    //   console.log('currentPage', currentPage, nextPage);
    //   if (currentPage !== nextPage) {
    //     trackPage(nextPage);
    //   }
    //   // ReactGA.pageview(window.location.pathname + window.location.search);
    // }
    render() {
      return <WrappedComponent data={data} {...this.props} />;
    }
  };

  return <HOC />;
}
