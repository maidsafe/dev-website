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
    for (let i = 0; i < linkHeads.length; i++) {
      linkHeads[i].addEventListener('click', () => {
        this.hideNav();
      }, false)
    }
    const links = document.getElementsByClassName('nav-i-links');
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
        var targetEle = document.getElementById(targetHash);
        if (targetEle && targetEle.offsetTop) {
          window.scroll(0, targetEle.offsetTop - 200);
        }
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
              {`${data.safeDesktop.para1.chunk1} `}
              <Link to={data.safeDesktop.para1.link1.href}>
                {data.safeDesktop.para1.link1.name}
              </Link>
              {` ${data.safeDesktop.para1.chunk2} `}
            </p>
            <p className="para">
              {`${data.safeDesktop.para2.chunk1} `}
              <Link to={data.safeDesktop.para2.link1.href}>
                {data.safeDesktop.para2.link1.name}
              </Link>
              {` ${data.safeDesktop.para2.chunk2} `}
              <span className="highlight">
                {data.safeDesktop.para2.highlight1}
              </span>
              {` ${data.safeDesktop.para2.chunk3} `}
            </p>
            <p className="para">
              {`${data.safeDesktop.para3.chunk1} `}
              <Link to={data.safeDesktop.para3.link1.href}>
                {data.safeDesktop.para3.link1.name}
              </Link>
              {` ${data.safeDesktop.para3.chunk2} `}
              <Link to={data.safeDesktop.para3.link2.href}>
                {data.safeDesktop.para3.link2.name}
              </Link>
              {` ${data.safeDesktop.para3.chunk3} `}
              <Link to={data.safeDesktop.para3.link3.href}>
                {data.safeDesktop.para3.link3.name}
              </Link>
              {` ${data.safeDesktop.para3.chunk4} `}
            </p>
            <p className="para">
              {`${data.safeDesktop.para4.chunk1} `}
              <Link to={data.safeDesktop.para4.link1.href}>
                {data.safeDesktop.para4.link1.name}
              </Link>
              {` ${data.safeDesktop.para4.chunk2} `}
            </p>
            <h2 id="preReq" className="page-sub-title">{data.preRequisites.title}</h2>
            <p className="para">{data.preRequisites.para1}</p>
            <div className="list-type-1">
              <ul>
                <li>
                  <Link to={data.preRequisites.list1.list1_1.link1.href}>
                    {data.preRequisites.list1.list1_1.link1.name}
                  </Link>
                  {`${data.preRequisites.list1.list1_1.chunk1}`}
                </li>
                <li>
                  <Link to={data.preRequisites.list1.list1_2.link1.href}>
                    {data.preRequisites.list1.list1_2.link1.name}
                  </Link>
                  {` ${data.preRequisites.list1.list1_2.chunk1}`}
                  <Link to={data.preRequisites.list1.list1_2.link2.href}>
                    {data.preRequisites.list1.list1_2.link2.name}
                  </Link>
                  {` ${data.preRequisites.list1.list1_2.chunk2} `}
                  <Link to={data.preRequisites.list1.list1_2.link3.href} target="_blank">
                    {data.preRequisites.list1.list1_2.link3.name}
                  </Link>
                  {`${data.preRequisites.list1.list1_2.chunk3} `}
                </li>
                <li>
                  {`${data.preRequisites.list1.list1_3.chunk1} `}
                  <span className="highlight">
                    {data.preRequisites.list1.list1_3.highlight1}
                  </span>
                  {` ${data.preRequisites.list1.list1_3.chunk2} `}
                  <span className="highlight">
                    {data.preRequisites.list1.list1_3.highlight2}
                  </span>
                  {` ${data.preRequisites.list1.list1_3.chunk3} `}
                  <Link to={data.preRequisites.list1.list1_3.link1.href} target="_blank">
                    {data.preRequisites.list1.list1_3.link1.name}
                  </Link>
                  {` ${data.preRequisites.list1.list1_3.chunk4} `}
                  <span className="highlight">
                    {data.preRequisites.list1.list1_3.highlight3}
                  </span>
                  {` ${data.preRequisites.list1.list1_3.chunk5} `}
                  <span className="highlight">
                    {data.preRequisites.list1.list1_3.highlight4}
                  </span>
                  {`${data.preRequisites.list1.list1_3.chunk6}`}
                </li>
              </ul>
            </div>
            <h2 id="installBrowser" className="page-sub-title">{data.installBrowser.title}</h2>
            <p className="para">{data.installBrowser.para1}</p>
            <p className="para">
              {`${data.installBrowser.para2.chunk1} `}
              <Link to={data.installBrowser.para2.link1.href}>
                {data.installBrowser.para2.link1.name}
              </Link>
              {` ${data.installBrowser.para2.chunk2} `}
              <Link to={data.installBrowser.para2.link2.href}>
                {data.installBrowser.para2.link2.name}
              </Link>
              {` ${data.installBrowser.para2.chunk3} `}
            </p>
            <p className="para">{data.installBrowser.para3}</p>
            <div className="list-type-1">
              <ul>
                <li>
                  <span className="highlight">
                    {data.installBrowser.list1.list1_1.highlight1}
                  </span>
                  {` ${data.installBrowser.list1.list1_1.chunk1}`}
                </li>
                <li>
                  <span className="highlight">
                    {data.installBrowser.list1.list1_2.highlight1}
                  </span>
                  {` ${data.installBrowser.list1.list1_2.chunk1}`}
                </li>
              </ul>
            </div>
            <p className="para">{data.installBrowser.para4}</p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.installBrowser.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">{data.installBrowser.para4_1}</p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.installBrowser.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">{data.installBrowser.para4_2}</p>
            <p className="para">{data.installBrowser.para5}</p>
            <h2 id="createSkeleton" className="page-sub-title">{data.createBasicSkeleton.title}</h2>
            <p className="para">
              {`${data.createBasicSkeleton.para1.chunk1} `}
              <span className="highlight">
                {data.createBasicSkeleton.para1.highlight1}
              </span>
              {` ${data.createBasicSkeleton.para1.chunk2} `}
              <span className="highlight">
                {data.createBasicSkeleton.para1.highlight2}
              </span>
              {` ${data.createBasicSkeleton.para1.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.createBasicSkeleton.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.createBasicSkeleton.para2.chunk1} `}
              <Link to={data.createBasicSkeleton.para2.link1.href}>
                {data.createBasicSkeleton.para2.link1.name}
              </Link>
              {` ${data.createBasicSkeleton.para2.chunk2} `}
              <span className="highlight">
                {data.createBasicSkeleton.para2.highlight1}
              </span>
              {` ${data.createBasicSkeleton.para2.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.createBasicSkeleton.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.createBasicSkeleton.para2_1}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.createBasicSkeleton.code2_1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.createBasicSkeleton.para2_2}
            </p>
            <p className="para">
              {data.createBasicSkeleton.para3}
            </p>
            <p className="para">
              {data.createBasicSkeleton.para4}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.createBasicSkeleton.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.createBasicSkeleton.para5}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight} >
                {data.createBasicSkeleton.code4}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.createBasicSkeleton.para6}
            </p>
            <h2 id="importSafeApi" className="page-sub-title">{data.importSafeApi.title}</h2>
            <p className="para">
              {`${data.importSafeApi.para1.chunk1} `}
              <span className="highlight">
                {data.importSafeApi.para1.highlight1}
              </span>
              {` ${data.importSafeApi.para1.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.importSafeApi.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.importSafeApi.para2.chunk1} `}
              <span className="highlight">
                {data.importSafeApi.para2.highlight1}
              </span>
              {` ${data.importSafeApi.para2.chunk2} `}
              <span className="highlight">
                {data.importSafeApi.para2.highlight2}
              </span>
              {` ${data.importSafeApi.para2.chunk3} `}
              <span className="highlight">
                {data.importSafeApi.para2.highlight3}
              </span>
              {` ${data.importSafeApi.para2.chunk4} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.importSafeApi.code2}
              </SyntaxHighlighter>
            </div>
            <h2 id="sendAuthReq" className="page-sub-title">{data.sendAuthRequest.title}</h2>
            <p className="para"> {data.sendAuthRequest.para1} </p>
            <p className="para">
              {`${data.sendAuthRequest.para2.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para2.highlight1}
              </span>
              {` ${data.sendAuthRequest.para2.chunk2} `}
              <span className="highlight">
                {data.sendAuthRequest.para2.highlight2}
              </span>
              {` ${data.sendAuthRequest.para2.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.sendAuthRequest.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.sendAuthRequest.para3.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para3.highlight1}
              </span>
              {` ${data.sendAuthRequest.para3.chunk2} `}
              <span className="highlight">
                {data.sendAuthRequest.para3.highlight2}
              </span>
              {` ${data.sendAuthRequest.para3.chunk3} `}
              <span className="highlight">
                {data.sendAuthRequest.para3.highlight3}
              </span>
              {` ${data.sendAuthRequest.para3.chunk4} `}
              <span className="highlight">
                {data.sendAuthRequest.para3.highlight4}
              </span>
              {` ${data.sendAuthRequest.para3.chunk5} `}
            </p>
            <p className="para">
              {`${data.sendAuthRequest.para4.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para4.highlight1}
              </span>
              {` ${data.sendAuthRequest.para4.chunk2} `}
              <span className="highlight">
                {data.sendAuthRequest.para4.highlight2}
              </span>
              {` ${data.sendAuthRequest.para4.chunk3} `}
              <span className="highlight">
                {data.sendAuthRequest.para4.highlight3}
              </span>
              {` ${data.sendAuthRequest.para4.chunk4} `}
              <span className="highlight">
                {data.sendAuthRequest.para4.highlight4}
              </span>
              {` ${data.sendAuthRequest.para4.chunk5}`}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.sendAuthRequest.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">{data.sendAuthRequest.para4_1}</p>
            <p className="para">
              {`${data.sendAuthRequest.para5.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para5.highlight1}
              </span>
              {` ${data.sendAuthRequest.para5.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.sendAuthRequest.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.sendAuthRequest.para6.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para6.highlight1}
              </span>
              {` ${data.sendAuthRequest.para6.chunk2} `}
            </p>
            <p className="para">
              {`${data.sendAuthRequest.para7.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para7.highlight1}
              </span>
              {` ${data.sendAuthRequest.para7.chunk2} `}
              <span className="highlight">
                {data.sendAuthRequest.para7.highlight2}
              </span>
              {` ${data.sendAuthRequest.para7.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.sendAuthRequest.code4}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.sendAuthRequest.para8.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para8.highlight1}
              </span>
              {` ${data.sendAuthRequest.para8.chunk2} `}
              <span className="highlight">
                {data.sendAuthRequest.para8.highlight2}
              </span>
              {` ${data.sendAuthRequest.para8.chunk3} `}
            </p>
            <p className="para">
              {`${data.sendAuthRequest.para9.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para9.highlight1}
              </span>
              {` ${data.sendAuthRequest.para9.chunk2} `}
              <span className="highlight">
                {data.sendAuthRequest.para9.highlight2}
              </span>
              {` ${data.sendAuthRequest.para9.chunk3} `}
            </p>
            <p className="para">
              {`${data.sendAuthRequest.para10.chunk1} `}
              <Link to={data.sendAuthRequest.para10.link1.href}>
                {data.sendAuthRequest.para10.link1.name}
              </Link>
              {` ${data.sendAuthRequest.para10.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.sendAuthRequest.code5}
              </SyntaxHighlighter>
            </div>
            <p className="para">{data.sendAuthRequest.para11}</p>
            <p className="para">
              {`${data.sendAuthRequest.para12.chunk1} `}
              <span className="highlight">
                {data.sendAuthRequest.para12.highlight1}
              </span>
              {` ${data.sendAuthRequest.para12.chunk2} `}
              <span className="highlight">
                {data.sendAuthRequest.para12.highlight2}
              </span>
              {` ${data.sendAuthRequest.para12.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.sendAuthRequest.code6}
              </SyntaxHighlighter>
            </div>
            <h2 id="connectSafe" className="page-sub-title">{data.connectSafeNetwork.title}</h2>
            <p className="para">
              {`${data.connectSafeNetwork.para1.chunk1} `}
              <span className="highlight">
                {data.connectSafeNetwork.para1.highlight1}
              </span>
              {` ${data.connectSafeNetwork.para1.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.connectSafeNetwork.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.connectSafeNetwork.para2}
            </p>
            <h2 id="createMD" className="page-sub-title">{data.createPublicMD.title}</h2>
            <p className="para">
              {`${data.createPublicMD.para1.chunk1} `}
              <span className="highlight">
                {data.createPublicMD.para1.highlight1}
              </span>
              {` ${data.createPublicMD.para1.chunk2} `}
            </p>
            <p className="para">
              {`${data.createPublicMD.para2.chunk1} `}
              <Link to={data.createPublicMD.para2.link1.href}>
                {data.createPublicMD.para2.link1.name}
              </Link>
              {` ${data.createPublicMD.para2.chunk2} `}
            </p>
            <p className="para">
              {`${data.createPublicMD.para3.chunk1} `}
              <Link to={data.createPublicMD.para3.link1.href}>
                {data.createPublicMD.para3.link1.name}
              </Link>
              {` ${data.createPublicMD.para3.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.createPublicMD.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.createPublicMD.para4}
            </p>
            <p className="para">
              {data.createPublicMD.para5}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.createPublicMD.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.createPublicMD.para6.chunk1} `}
              <span className="highlight">
                {data.createPublicMD.para6.highlight1}
              </span>
              {` ${data.createPublicMD.para6.chunk2} `}
            </p>
            <p className="para">
              {`${data.createPublicMD.para7.chunk1} `}
              <span className="highlight">
                {data.createPublicMD.para7.highlight1}
              </span>
              {` ${data.createPublicMD.para7.chunk2} `}
              <span className="highlight">
                {data.createPublicMD.para7.highlight2}
              </span>
              {` ${data.createPublicMD.para7.chunk3} `}
              <span className="highlight">
                {data.createPublicMD.para7.highlight3}
              </span>
              {` ${data.createPublicMD.para7.chunk4} `}
            </p>
            <p className="para">
              {data.createPublicMD.para8}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.createPublicMD.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.createPublicMD.para9.chunk1} `}
              <span className="highlight">
                {data.createPublicMD.para9.highlight1}
              </span>
              {` ${data.createPublicMD.para9.chunk2} `}
            </p>
            <p className="para">
              {data.createPublicMD.para10}
            </p>
            <h2 id="readEntries" className="page-sub-title">{data.readMDEntries.title}</h2>
            <p className="para">
              {`${data.readMDEntries.para1.chunk1} `}
              <span className="highlight">
                {data.readMDEntries.para1.highlight1}
              </span>
              {` ${data.readMDEntries.para1.chunk2} `}
              <span className="highlight">
                {data.readMDEntries.para1.highlight2}
              </span>
              {` ${data.readMDEntries.para1.chunk3} `}
              <span className="highlight">
                {data.readMDEntries.para1.highlight3}
              </span>
              {` ${data.readMDEntries.para1.chunk4} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.readMDEntries.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.readMDEntries.para2.chunk1} `}
              <span className="highlight">
                {data.readMDEntries.para2.highlight1}
              </span>
              {` ${data.readMDEntries.para2.chunk2} `}
              <span className="highlight">
                {data.readMDEntries.para2.highlight2}
              </span>
              {` ${data.readMDEntries.para2.chunk3} `}
            </p>
            <p className="para">
              {data.readMDEntries.para3}
            </p>
            <h2 id="addEntries" className="page-sub-title">{data.addEntries.title}</h2>
            <p className="para">
              {data.addEntries.para1}
            </p>
            <p className="para">
              {data.addEntries.para2}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.addEntries.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.addEntries.para3}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.addEntries.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.addEntries.para4.chunk1} `}
              <span className="highlight">
                {data.addEntries.para4.highlight1}
              </span>
              {` ${data.addEntries.para4.chunk2} `}
            </p>
            <p className="para">
              {`${data.addEntries.para5.chunk1} `}
              <span className="highlight">
                {data.addEntries.para5.highlight1}
              </span>
              {` ${data.addEntries.para5.chunk2} `}
              <span className="highlight">
                {data.addEntries.para5.highlight2}
              </span>
              {` ${data.addEntries.para5.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.addEntries.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.addEntries.para6}
            </p>
            <p className="para">
              {data.addEntries.para7}
            </p>
            <h2 id="updateRemoveEntries" className="page-sub-title">{data.updateRemoveEntries.title}</h2>
            <p className="para">
              {`${data.updateRemoveEntries.para1.chunk1} `}
              <span className="highlight">
                {data.updateRemoveEntries.para1.highlight1}
              </span>
              {` ${data.updateRemoveEntries.para1.chunk2} `}
              <span className="highlight">
                {data.updateRemoveEntries.para1.highlight2}
              </span>
              {` ${data.updateRemoveEntries.para1.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.updateRemoveEntries.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.updateRemoveEntries.para2.chunk1} `}
              <span className="highlight">
                {data.updateRemoveEntries.para2.highlight1}
              </span>
              {` ${data.updateRemoveEntries.para2.chunk2} `}
            </p>
            <p className="para">
              {`${data.updateRemoveEntries.para3.chunk1} `}
              <span className="highlight">
                {data.updateRemoveEntries.para3.highlight1}
              </span>
              {` ${data.updateRemoveEntries.para3.chunk2} `}
              <span className="highlight">
                {data.updateRemoveEntries.para3.highlight2}
              </span>
              {` ${data.updateRemoveEntries.para3.chunk3} `}
            </p>
            <p className="para">
              {`${data.updateRemoveEntries.para3_1.chunk1} `}
              <span className="highlight">
                {data.updateRemoveEntries.para3_1.highlight1}
              </span>
              {` ${data.updateRemoveEntries.para3.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.updateRemoveEntries.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.updateRemoveEntries.para4}
            </p>
          </div>
        </div>
        <div className={navClasses}>
          <div className="nav-b">
            <div className="nav-i">
              <div className="nav-i-head">
                <Link to={data.pageNav.nav1.href}>{data.pageNav.nav1.name}</Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub1.href}>
                  {data.pageNav.nav1.subNavs.sub1.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub2.href}>
                  {data.pageNav.nav1.subNavs.sub2.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub3.href}>
                  {data.pageNav.nav1.subNavs.sub3.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub4.href}>
                  {data.pageNav.nav1.subNavs.sub4.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub5.href}>
                  {data.pageNav.nav1.subNavs.sub5.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub6.href}>
                  {data.pageNav.nav1.subNavs.sub6.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub7.href}>
                  {data.pageNav.nav1.subNavs.sub7.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub8.href}>
                  {data.pageNav.nav1.subNavs.sub8.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub9.href}>
                  {data.pageNav.nav1.subNavs.sub9.name}
                </Link>
              </div>
              <div className="nav-i-links">
                <Link to={data.pageNav.nav1.subNavs.sub10.href}>
                  {data.pageNav.nav1.subNavs.sub10.name}
                </Link>
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
