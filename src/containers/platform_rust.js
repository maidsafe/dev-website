import React from 'react'
import { withRouteData, Link } from 'react-static'
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { duotoneLight } from 'react-syntax-highlighter/styles/prism';
import classNames from 'classnames';

class Platform extends React.Component {
  constructor() {
    super();
    this.state = {
      showNav: false
    };
    this.hideNav = this.hideNav.bind(this);
  }

  componentDidMount() {
    const linkHeads = document.getElementsByClassName('nav-i-head');
    for (let i = 0; i< linkHeads.length; i++) {
      linkHeads[i].addEventListener('click', () => {
        this.hideNav();
      }, false)
    }
    const links = document.getElementsByClassName('nav-i-links');
    for (let i = 0; i< links.length; i++) {
      links[i].addEventListener('click', () => {
        this.hideNav();
      }, false)
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

    return (
      <div className="platform">
      <div className="platform-links">
          <div className="platform-links-b">
            {
              data.platformLinks.map((platform, i) => (
                <div key={`platform-link-${i}`} className="platform-link-i">
                  <a href={platform.href}>
                    <div className={classNames(`icn ${platform.icon}`, {
                      active: platform.isActive
                    })}></div>
                    <div className="name">{platform.name}</div>
                  </a>
                </div>
              ))
            }
          </div>
        </div>
        <div className="content">
          <div className="content-b">
            <h1 id="pageHeading" className="page-title">{data.pageTitle}</h1>
            <p className="para">
              {data.safeRust.para1}
            </p>
            <h2 id="outline" className="page-sub-title">{data.outline.title}</h2>
            <div className="list-type-1">
              <ul>
                <li> {data.outline.list1.list1_1} </li>
                <li> {data.outline.list1.list1_2} </li>
                <li> {data.outline.list1.list1_3} </li>
                <li> {data.outline.list1.list1_4} </li>
              </ul>
            </div>
            <h2 id="preReq" className="page-sub-title">{data.preRequisites.title}</h2>
            <h3 id="installBrowser" className="page-sub-2-title"> {data.preRequisites.installBrowser.title} </h3>
            <p className="para">{data.preRequisites.installBrowser.para1}</p>
            <p className="para">
              {`${data.preRequisites.installBrowser.para2.chunk1} `}
              <Link to={data.preRequisites.installBrowser.para2.link1.href}>
                {data.preRequisites.installBrowser.para2.link1.name}
              </Link>
              {` ${data.preRequisites.installBrowser.para2.chunk2} `}
              <Link to={data.preRequisites.installBrowser.para2.link2.href}>
                {data.preRequisites.installBrowser.para2.link2.name}
              </Link>
              {` ${data.preRequisites.installBrowser.para2.chunk3} `}
            </p>
            <p className="para">{data.preRequisites.installBrowser.para3}</p>
            <div className="list-type-1">
              <ul>
                <li>
                  <span className="highlight">
                    {data.preRequisites.installBrowser.list1.list1_1.highlight1}
                  </span>
                  {` ${data.preRequisites.installBrowser.list1.list1_1.chunk1}`}
                </li>
                <li>
                  <span className="highlight">
                    {data.preRequisites.installBrowser.list1.list1_2.highlight1}
                  </span>
                  {` ${data.preRequisites.installBrowser.list1.list1_2.chunk1}`}
                </li>
              </ul>
            </div>
            <p className="para">{data.preRequisites.installBrowser.para4}</p>
            <p className="para">{data.preRequisites.installBrowser.para5}</p>
            <h3 id="installRustDep" className="page-sub-2-title"> {data.preRequisites.installRustDep.title} </h3>
            <p className="para">{data.preRequisites.installRustDep.para1}</p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.preRequisites.installRustDep.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.preRequisites.installRustDep.para2.chunk1} `}
              <span className="highlight">
                {data.preRequisites.installRustDep.para2.highlight1}
              </span>
              {` ${data.preRequisites.installRustDep.para2.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.preRequisites.installRustDep.code2}
              </SyntaxHighlighter>
            </div>
            <h2 id="authApp" className="page-sub-title"> {data.authApp.title} </h2>
            <p className="para">{data.authApp.para1}</p>
            <h3 id="reqAuthAccess" className="page-sub-2-title"> {data.authApp.reqAuthAccess.title} </h3>
            <p className="para">{data.authApp.reqAuthAccess.para1}</p>
            <p className="para">
              {`${data.authApp.reqAuthAccess.para2.chunk1} `}
              <span className="highlight">
                {data.authApp.reqAuthAccess.para2.highlight1}
              </span>
              {` ${data.authApp.reqAuthAccess.para2.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authApp.reqAuthAccess.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.authApp.reqAuthAccess.para3.chunk1} `}
              <span className="highlight">
                {data.authApp.reqAuthAccess.para3.highlight1}
              </span>
              {` ${data.authApp.reqAuthAccess.para3.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authApp.reqAuthAccess.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.authApp.reqAuthAccess.para4.chunk1} `}
              <span className="highlight">
                {data.authApp.reqAuthAccess.para4.highlight1}
              </span>
              {` ${data.authApp.reqAuthAccess.para4.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authApp.reqAuthAccess.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.authApp.reqAuthAccess.para5.chunk1} `}
              <span className="highlight">
                {data.authApp.reqAuthAccess.para5.highlight1}
              </span>
              {` ${data.authApp.reqAuthAccess.para5.chunk2} `}
              <Link to={data.authApp.reqAuthAccess.para5.link1.href}>
                {data.authApp.reqAuthAccess.para5.link1.name}
              </Link>
              {` ${data.authApp.reqAuthAccess.para5.chunk3} `}
            </p>
            <p className="para">
              {`${data.authApp.reqAuthAccess.para6.chunk1} `}
              <span className="highlight">
                {data.authApp.reqAuthAccess.para6.highlight1}
              </span>
              {` ${data.authApp.reqAuthAccess.para6.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authApp.reqAuthAccess.code4}
              </SyntaxHighlighter>
            </div>
            <h3 id="connectNetwork" className="page-sub-2-title"> {data.authApp.connectNetwork.title} </h3>
            <p className="para">
              {`${data.authApp.connectNetwork.para1.chunk1} `}
              <span className="highlight">
                {data.authApp.connectNetwork.para1.highlight1}
              </span>
              {` ${data.authApp.connectNetwork.para1.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authApp.connectNetwork.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.authApp.connectNetwork.para2}
            </p>
            <h3 id="realNetworkConn" className="page-sub-2-title"> {data.authApp.realNetworkConn.title} </h3>
            <p className="para">
              {`${data.authApp.realNetworkConn.para1.chunk1} `}
              <span className="highlight">
                {data.authApp.realNetworkConn.para1.highlight1}
              </span>
              {` ${data.authApp.realNetworkConn.para1.chunk2} `}
              <span className="highlight">
                {data.authApp.realNetworkConn.para1.highlight2}
              </span>
              {` ${data.authApp.realNetworkConn.para1.chunk3} `}
            </p>
            <h3 id="mockNetworkConn" className="page-sub-2-title"> {data.authApp.mockNetworkConn.title} </h3>
            <p className="para">
              {data.authApp.mockNetworkConn.para1}
            </p>
            <p className="para">
              {`${data.authApp.mockNetworkConn.para2.chunk1} `}
              <span className="highlight">
                {data.authApp.mockNetworkConn.para2.highlight1}
              </span>
              {` ${data.authApp.mockNetworkConn.para2.chunk2} `}
              <span className="highlight">
                {data.authApp.mockNetworkConn.para2.highlight2}
              </span>
              {` ${data.authApp.mockNetworkConn.para2.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authApp.mockNetworkConn.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.authApp.mockNetworkConn.para3}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authApp.mockNetworkConn.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.authApp.mockNetworkConn.para4}
            </p>
            <h2 id="usingSafeCoreApi" className="page-sub-title"> {data.usingSafeCoreApi.title} </h2>
            <p className="para">
              {`${data.usingSafeCoreApi.para1.chunk1} `}
              <span className="highlight">
                {data.usingSafeCoreApi.para1.highlight1}
              </span>
              {` ${data.usingSafeCoreApi.para1.chunk2} `}
              <span className="highlight">
                {data.usingSafeCoreApi.para1.highlight2}
              </span>
              {` ${data.usingSafeCoreApi.para1.chunk3} `}
              <span className="highlight">
                {data.usingSafeCoreApi.para1.highlight3}
              </span>
              {` ${data.usingSafeCoreApi.para1.chunk4} `}
              <span className="highlight">
                {data.usingSafeCoreApi.para1.highlight4}
              </span>
              {` ${data.usingSafeCoreApi.para1.chunk5} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.usingSafeCoreApi.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.usingSafeCoreApi.para2.chunk1} `}
              <Link to={data.usingSafeCoreApi.para2.link1.href}>
                {data.usingSafeCoreApi.para2.link1.name}
              </Link>
              {` ${data.usingSafeCoreApi.para2.chunk2} `}
            </p>
            <h3 id="interactingWithNetwork" className="page-sub-2-title"> {data.usingSafeCoreApi.interactingWithNetwork.title} </h3>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.usingSafeCoreApi.interactingWithNetwork.code1}
              </SyntaxHighlighter>
            </div>
            <h3 id="createPublicMD" className="page-sub-2-title"> {data.usingSafeCoreApi.createPublicMD.title} </h3>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.usingSafeCoreApi.createPublicMD.code1}
              </SyntaxHighlighter>
            </div>
            <h3 id="readMDEntries" className="page-sub-2-title"> {data.usingSafeCoreApi.readMDEntries.title} </h3>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.usingSafeCoreApi.readMDEntries.code1}
              </SyntaxHighlighter>
            </div>
            <h3 id="updateRemoveEntries" className="page-sub-2-title"> {data.usingSafeCoreApi.updateRemoveEntries.title} </h3>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.usingSafeCoreApi.updateRemoveEntries.code1}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        <div className={navClasses}>
          <div className="nav-b">
            <div className="nav-i">
              <div className="nav-i-head">
                <Link to={data.pageNav.href}>{data.pageNav.name}</Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.href}>
                  {data.pageNav.nav1.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav2.href}>
                  {data.pageNav.nav2.name}
                </Link>
                <div className="nav-i-links-i">
                  <Link to={data.pageNav.nav2.subNavs.sub1.href}>
                    {data.pageNav.nav2.subNavs.sub1.name}
                  </Link>
                </div>
                <div className="nav-i-links-i">
                  <Link to={data.pageNav.nav2.subNavs.sub2.href}>
                    {data.pageNav.nav2.subNavs.sub2.name}
                  </Link>
                </div>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav3.href}>
                  {data.pageNav.nav3.name}
                </Link>
                <div className="nav-i-links-i">
                  <Link to={data.pageNav.nav3.subNavs.sub1.href}>
                    {data.pageNav.nav3.subNavs.sub1.name}
                  </Link>
                </div>
                <div className="nav-i-links-i">
                  <Link to={data.pageNav.nav3.subNavs.sub2.href}>
                    {data.pageNav.nav3.subNavs.sub2.name}
                  </Link>
                </div>
                <div className="nav-i-links-i">
                  <Link to={data.pageNav.nav3.subNavs.sub3.href}>
                    {data.pageNav.nav3.subNavs.sub3.name}
                  </Link>
                </div>
                <div className="nav-i-links-i">
                  <Link to={data.pageNav.nav3.subNavs.sub4.href}>
                    {data.pageNav.nav3.subNavs.sub4.name}
                  </Link>
                </div>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav4.href}>
                  {data.pageNav.nav4.name}
                </Link>
                <div className="nav-i-links">
                  <Link to={data.pageNav.nav4.subNavs.sub1.href}>
                    {data.pageNav.nav4.subNavs.sub1.name}
                  </Link>
                </div>
                <div className="nav-i-links">
                  <Link to={data.pageNav.nav4.subNavs.sub2.href}>
                    {data.pageNav.nav4.subNavs.sub2.name}
                  </Link>
                </div>
                <div className="nav-i-links">
                  <Link to={data.pageNav.nav4.subNavs.sub3.href}>
                    {data.pageNav.nav4.subNavs.sub3.name}
                  </Link>
                </div>
                <div className="nav-i-links">
                  <Link to={data.pageNav.nav4.subNavs.sub4.href}>
                    {data.pageNav.nav4.subNavs.sub4.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mob-nav-menu-icon"><button className="btn" onClick={() => { this.setState({ showNav: !this.state.showNav }) }}></button></div>
      </div>
    );
  }
}

export default withRouteData(({ data }) => (
  <Platform data={data} />
))
