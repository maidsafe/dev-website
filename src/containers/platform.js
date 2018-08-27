import React from 'react'
import { withRouteData, Link } from 'react-static'
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { duotoneLight } from 'react-syntax-highlighter/styles/prism';
import classNames from 'classnames';
import Wrapper from './partials/wrapper';
import { parsePlatformData } from '../../parser';
import { animateScroll as scroll } from 'react-scroll';

class Platform extends React.Component {
  constructor() {
    super();
    this.state = {
      showNav: false
    };
    this.nav = [];
    this.content = [];
  }

  componentWillMount() {
    const { data } = this.props;
    const parsedData = parsePlatformData(data.content);
    this.nav = (parsedData && parsedData.nav) ? parsedData.nav.map((i, nav) => nav).get().map((nav, i) => {
      return (
        <div key={`nav-i-${i}`} className={classNames('nav-i', {
          'nav-i-h1': nav.name === 'h1',
          'nav-i-h2': nav.name === 'h2',
        })}>
          <Link to={`#${nav.attribs.id}`}>
            {nav.children[0].data}
          </Link>
        </div>
      );
    }) : [];

    this.content = parsedData.html;
  }

  componentDidMount() {
    const linkHeads = document.getElementsByClassName('nav-i');
    for (let i = 0; i < linkHeads.length; i++) {
      linkHeads[i].addEventListener('click', () => {
        this.hideNav();
      }, false)
    }
    const links = document.getElementsByClassName('nav-i');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        this.hideNav();
      }, false)
    }
    window.addEventListener("hashchange", this.hashChange);
    window.addEventListener("load", this.hashChange);
  }

  hashChange() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const targetHash = window.location.hash.split('#').pop();
        if (!targetHash) {
          return;
        }
        const targetEle = document.getElementById(targetHash);
        scroll.scrollTo(targetEle.offsetTop - 100)
      }, 100);
    }
  }

  hideNav() {
    if (!this.state.showNav) {
      return;
    }
    this.setState({ showNav: false });
  }

  render() {
    const { data } = this.props;

    const navClasses = classNames('nav', {
      active: this.state.showNav
    });

    console.log('this.props', this)

    return (
      <div className="platform">
        <div className="content">
          <div className="platform-links">
            <div className="platform-links-b">
              {
                data.otherPlatforms.map((platform, i) => (
                  <div key={`platform-link-${i}`} className="platform-link-i">
                    <a href={platform.href}>
                      <div className={classNames(`icn ${platform.icon}`, {
                        active: (platform.name.toLowerCase() === data.name.toLowerCase())
                      })}></div>
                      <div className="name">{platform.name}</div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="content-b">
            {this.content}
          </div>
        </div>
        <div className={navClasses}>
          <div className="nav-b">
            {this.nav}
          </div>
        </div>
        <div className="mob-nav-menu-icon"><button className="btn" onClick={() => { this.setState({ showNav: !this.state.showNav }) }}></button></div>
      </div>
    );
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Platform, data)
));
