import React from 'react'
import { withSiteData, Link } from 'react-static'
import { withRouter } from 'react-static'
//
import classNames from 'classnames';
import CONST from '../../constants';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      appDevNav: false,
      coreTechNav: false,
      discoverNav: false,
    };
    this.routes = {
      APP_DEV: '/start_developing',
      CORE_TECH: '/core_technology',
      DISCOVER: '/discover',
      PLATFORM_NODEJS: '/platform/nodejs',
      PLATFORM_RUST: '/platform/rust',
      PLATFORM_WEB: '/platform/web',
    };
  }

  componentDidMount() {
    this.setNavActive();
  }

  componentDidUpdate(prevProp) {
    if (prevProp.location.pathname !== this.props.location.pathname) {
      this.setNavActive();
    }
  }

  hideMenu() {
    if (!this.state.showMenu) {
      return;
    }
    this.setState({ showMenu: false });
  }

  isNavMatch(target) {
    let route = '';
    if (!target) {
      return;
    }
    if (typeof window !== 'undefined') {
      route = window.location.pathname;
    }
    if (typeof target === 'string') {
      return (route.search(target) !== -1);
    }
    return (target.filter((nav) => (route.search(nav) !== -1)).length !== 0);
  }

  setNavActive() {
    this.setState({
      appDevNav: this.isNavMatch([this.routes.APP_DEV, this.routes.PLATFORM_NODEJS, this.routes.PLATFORM_WEB]),
      coreTechNav: this.isNavMatch(this.routes.CORE_TECH),
      discoverNav: this.isNavMatch(this.routes.DISCOVER),
    });
    this.hideMenu();
  }

  render() {
    const navMenuClasses = classNames({
      active: this.state.showMenu
    });
    const headerClasses = classNames({
      'header-fixed': this.props.isScrolling
    });
    return (
      <header className={headerClasses}>
        <div className="brand-logo">
          <Link to="/" onClick={() => { this.hideMenu() }}>
            <span className="images"></span>
          </Link>
        </div>
        <div className="mob-menu" onClick={(e) => {
          this.setState({ showMenu: !this.state.showMenu });
        }}></div>
        <nav className={navMenuClasses}>
          <Link className={classNames({
            selected: this.state.appDevNav
          })} to="/start_developing" onClick={() => { this.hideMenu() }}>Start Developing</Link>
          <Link className={classNames({
            selected: this.state.coreTechNav
          })} to="/core_technology" onClick={() => { this.hideMenu() }}>Core Technology</Link>
          <Link className={classNames({
            selected: this.state.discoverNav
          })} to="/discover" onClick={() => { this.hideMenu() }}>Discover</Link>
          <Link className="external community" to={CONST.externalLinks.header.devForum} onClick={() => { this.hideMenu() }} target="_blank">Comm<span className="extend">unity</span></Link>
        </nav>
      </header>
    );
  }
}

const HeaderCompWithRoute = withRouter(Header);

export default HeaderCompWithRoute;
