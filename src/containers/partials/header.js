import React from 'react'
import { withSiteData, Link } from 'react-static'
//
import classNames from 'classnames';
import CONST from '../../constants';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
    this.routes = {
      APP_DEV: '/app_developer',
      CORE_DEV: '/core_developer',
      DISCOVER: '/discover',
      PLATFORM_NODEJS: '/platform/nodejs',
      PLATFORM_RUST: '/platform/rust',
      PLATFORM_WEB: '/platform/web',
    };
  }

  hideMenu() {
    if (!this.state.showMenu) {
      return;
    }
    this.setState({ showMenu: false });
  }

  render() {
    const navMenuClasses = classNames({
      active: this.state.showMenu
    });
    const headerClasses = classNames({
      'header-fixed': this.props.isScrolling
    });
    let route = '';
    if (typeof window !== 'undefined') {
      route = window.location.pathname;
    }
    return (
      <header className={headerClasses}>
        <div className="brand-logo">
          <Link to="/" onClick={() => { this.hideMenu() }}>
            <span className="images"></span>
            <span className="split"></span>
            <span className="desc">DevHub</span>
          </Link>
        </div>
        <div className="mob-menu" onClick={(e) => {
          this.setState({ showMenu: !this.state.showMenu });
        }}></div>
        <nav className={navMenuClasses}>
          <Link className={classNames({
            active: (route === this.routes.APP_DEV) || (route === this.routes.PLATFORM_NODEJS) || (route === this.routes.PLATFORM_RUST) || (route === this.routes.PLATFORM_WEB)
          })} to="/app_developer" onClick={() => { this.hideMenu() }}>App Dev</Link>
          <Link className={classNames({
            active: route === this.routes.CORE_DEV
          })} to="/core_developer" onClick={() => { this.hideMenu() }}>Core Dev</Link>
          <Link className={classNames({
            active: route === this.routes.DISCOVER
          })} to="/discover" onClick={() => { this.hideMenu() }}>Discover</Link>
        </nav>
        <div className="opts">
          <div className="opt community"><a onClick={() => { this.hideMenu() }} href={CONST.externalLinks.header.devForum} target="_blank" /></div>
        </div>
      </header>
    );
  }
}
