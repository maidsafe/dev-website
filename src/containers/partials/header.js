import React from 'react'
import { withSiteData, Link } from 'react-static'
import classNames from 'classnames';

//
import CONST from '../../constants';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
  }

  hideMenu() {
    if (!this.state.showMenu) {
      return;
    }
    this.setState({showMenu: false});
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
          <Link to="/en-gb" onClick={() => {this.hideMenu()}}>
            <span className="images"></span>
            <span className="split"></span>
            <span className="desc">Dev<span className="extend">eloper</span></span>
          </Link>
        </div>
        <div className="mob-menu" onClick={(e) => {
          this.setState({showMenu: !this.state.showMenu});
        }}></div>
        <nav className={navMenuClasses}>
          <Link to="/app_developer" onClick={() => {this.hideMenu()}}>App Dev</Link>
          <Link to="/core_developer" onClick={() => {this.hideMenu()}}>Core Dev</Link>
          <Link to="/discover" onClick={() => {this.hideMenu()}}>Discover</Link>
        </nav>
        <div className="opts">
          <div className="opt community"><a onClick={() => {this.hideMenu()}} href={CONST.externalLinks.header.devForum} target="_blank" /></div>
        </div>
      </header>
    )
  }
}
