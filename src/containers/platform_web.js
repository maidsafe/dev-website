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
        <div className="content">
          <div className="content-b">
            <h1 id="pageHeading" className="page-title">{data.pageTitle}</h1>
            <p className="para">
              {data.safeWeb.para1}
            </p>
            <p className="para">
              {`${data.safeWeb.para2.chunk1} `}
              <Link to={data.safeWeb.para2.link1.href}>
                {data.safeWeb.para2.link1.name}
              </Link>
              {` ${data.safeWeb.para2.chunk2} `}
              <Link to={data.safeWeb.para2.link2.href}>
                {data.safeWeb.para2.link2.name}
              </Link>
              {` ${data.safeWeb.para2.chunk3} `}
            </p>
            <p className="para">
              {`${data.safeWeb.para3.chunk1} `}
              <Link to={data.safeWeb.para3.link1.href}>
                {data.safeWeb.para3.link1.name}
              </Link>
              {` ${data.safeWeb.para3.chunk2} `}
            </p>
            <h2 id="preReq" className="page-sub-title">{data.preRequisites.title}</h2>
            <p className="para">{data.preRequisites.para1}</p>
            <div className="list-type-1">
              <ul>
                <li>
                  <Link to={data.preRequisites.list1.list1_1.link1.href}>
                    {data.preRequisites.list1.list1_1.link1.name}
                  </Link>
                  {` ${data.preRequisites.list1.list1_1.chunk1}`}
                </li>
                <li>
                  <Link to={data.preRequisites.list1.list1_2.link1.href}>
                    {data.preRequisites.list1.list1_2.link1.name}
                  </Link>
                  {` ${data.preRequisites.list1.list1_2.chunk1} `}
                  <Link to={data.preRequisites.list1.list1_2.link2.href}>
                    {data.preRequisites.list1.list1_2.link2.name}
                  </Link>
                  {`${data.preRequisites.list1.list1_2.chunk2}`}
                </li>
                <li>
                  {`${data.preRequisites.list1.list1_3.chunk1} `}
                  <span className="highlights">
                    {data.preRequisites.list1.list1_3.highlight1}
                  </span>
                  {` ${data.preRequisites.list1.list1_3.chunk2} `}
                  <Link to={data.preRequisites.list1.list1_3.link1.href}>
                    {data.preRequisites.list1.list1_3.link1.name}
                  </Link>
                  {` ${data.preRequisites.list1.list1_3.chunk3} `}
                  <span className="highlights">
                    {data.preRequisites.list1.list1_3.highlight2}
                  </span>
                  {` ${data.preRequisites.list1.list1_3.chunk4} `}
                  <span className="highlights">
                    {data.preRequisites.list1.list1_3.highlight3}
                  </span>
                  {`${data.preRequisites.list1.list1_3.chunk5}`}
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
                  <span className="highlights">
                    {data.installBrowser.list1.list1_1.highlight1}
                  </span>
                  {` ${data.installBrowser.list1.list1_1.chunk1}`}
                </li>
                <li>
                  <span className="highlights">
                    {data.installBrowser.list1.list1_2.highlight1}
                  </span>
                  {` ${data.installBrowser.list1.list1_2.chunk1}`}
                </li>
              </ul>
            </div>
            <p className="para">{data.installBrowser.para4}</p>
            <p className="para">{data.installBrowser.para5}</p>
            <h2 id="createSkeleton" className="page-sub-title">{data.createBasicSkeleton.title}</h2>
            <p className="para">
              {`${data.createBasicSkeleton.para1.chunk1} `}
              <span className="highlights">
                {data.createBasicSkeleton.para1.highlight1}
              </span>
              {` ${data.createBasicSkeleton.para1.chunk2} `}
              <span className="highlights">
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
              {data.createBasicSkeleton.para2}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight}>
                {data.createBasicSkeleton.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.createBasicSkeleton.para3}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="bash" style={duotoneLight} >
                {data.createBasicSkeleton.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.createBasicSkeleton.para4.chunk1} `}
              <span className="highlights">
                {data.createBasicSkeleton.para4.highlight1}
              </span>
              {` ${data.createBasicSkeleton.para4.chunk2} `}
            </p>
            <p className="para">
              {data.createBasicSkeleton.para5}
            </p>
            <h2 id="authAppConnect" className="page-sub-title">{data.authAppandConnect.title}</h2>
            <p className="para"> {data.authAppandConnect.para1} </p>
            <p className="para">
              {`${data.authAppandConnect.para2.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para2.highlight1}
              </span>
              {` ${data.authAppandConnect.para2.chunk2} `}
              <span className="highlights">
                {data.authAppandConnect.para2.highlight2}
              </span>
              {` ${data.authAppandConnect.para2.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authAppandConnect.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.authAppandConnect.para3.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para3.highlight1}
              </span>
              {` ${data.authAppandConnect.para3.chunk2} `}
              <span className="highlights">
                {data.authAppandConnect.para3.highlight2}
              </span>
              {` ${data.authAppandConnect.para3.chunk3} `}
              <span className="highlights">
                {data.authAppandConnect.para3.highlight3}
              </span>
              {` ${data.authAppandConnect.para3.chunk4} `}
              <span className="highlights">
                {data.authAppandConnect.para3.highlight4}
              </span>
              {` ${data.authAppandConnect.para3.chunk5} `}
            </p>
            <p className="para">
              {`${data.authAppandConnect.para4.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para4.highlight1}
              </span>
              {` ${data.authAppandConnect.para4.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authAppandConnect.code2}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.authAppandConnect.para5.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para5.highlight1}
              </span>
              {` ${data.authAppandConnect.para5.chunk2} `}
            </p>
            <p className="para">
              {`${data.authAppandConnect.para6.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para6.highlight1}
              </span>
              {` ${data.authAppandConnect.para6.chunk2} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.authAppandConnect.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {data.authAppandConnect.para7}
            </p>
            <p className="para">
              {`${data.authAppandConnect.para8.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para8.highlight1}
              </span>
              {` ${data.authAppandConnect.para8.chunk2} `}
              <span className="highlights">
                {data.authAppandConnect.para8.highlight2}
              </span>
              {` ${data.authAppandConnect.para8.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight} showLineNumbers>
                {data.authAppandConnect.code4}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.authAppandConnect.para9.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para9.highlight1}
              </span>
              {` ${data.authAppandConnect.para9.chunk2} `}
              <span className="highlights">
                {data.authAppandConnect.para9.highlight2}
              </span>
              {` ${data.authAppandConnect.para9.chunk3} `}
            </p>
            <p className="para">
              {`${data.authAppandConnect.para10.chunk1} `}
              <span className="highlights">
                {data.authAppandConnect.para10.highlight1}
              </span>
              {` ${data.authAppandConnect.para10.chunk2} `}
              <span className="highlights">
                {data.authAppandConnect.para10.highlight2}
              </span>
              {` ${data.authAppandConnect.para10.chunk3} `}
            </p>
            <p className="para">
              {`${data.authAppandConnect.para11.chunk1} `}
              <Link to={data.authAppandConnect.para11.link1.href}>
                {data.authAppandConnect.para11.link1.name}
              </Link>
              {` ${data.authAppandConnect.para11.chunk2} `}
            </p>
            <p className="para">{data.authAppandConnect.para12}</p>
            <h2 id="createMD" className="page-sub-title">{data.createPublicMD.title}</h2>
            <p className="para">
              {`${data.createPublicMD.para1.chunk1} `}
              <span className="highlights">
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
              <span className="highlights">
                {data.createPublicMD.para6.highlight1}
              </span>
              {` ${data.createPublicMD.para6.chunk2} `}
            </p>
            <p className="para">
              {`${data.createPublicMD.para7.chunk1} `}
              <span className="highlights">
                {data.createPublicMD.para7.highlight1}
              </span>
              {` ${data.createPublicMD.para7.chunk2} `}
              <span className="highlights">
                {data.createPublicMD.para7.highlight2}
              </span>
              {` ${data.createPublicMD.para7.chunk3} `}
              <span className="highlights">
                {data.createPublicMD.para7.highlight3}
              </span>
              {` ${data.createPublicMD.para7.chunk4} `}
            </p>
            <p className="para">
              {`${data.createPublicMD.para8.chunk1} `}
              <span className="highlights">
                {data.createPublicMD.para8.highlight1}
              </span>
              {` ${data.createPublicMD.para8.chunk2} `}
              <span className="highlights">
                {data.createPublicMD.para8.highlight2}
              </span>
              {` ${data.createPublicMD.para8.chunk3} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.createPublicMD.code3}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.createPublicMD.para9.chunk1} `}
              <span className="highlights">
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
              <span className="highlights">
                {data.readMDEntries.para1.highlight1}
              </span>
              {` ${data.readMDEntries.para1.chunk2} `}
              <span className="highlights">
                {data.readMDEntries.para1.highlight2}
              </span>
              {` ${data.readMDEntries.para1.chunk3} `}
              <span className="highlights">
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
              <span className="highlights">
                {data.readMDEntries.para2.highlight1}
              </span>
              {` ${data.readMDEntries.para2.chunk2} `}
              <span className="highlights">
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
              <span className="highlights">
                {data.addEntries.para4.highlight1}
              </span>
              {` ${data.addEntries.para4.chunk2} `}
            </p>
            <p className="para">
              {`${data.addEntries.para5.chunk1} `}
              <span className="highlights">
                {data.addEntries.para5.highlight1}
              </span>
              {` ${data.addEntries.para5.chunk2} `}
              <span className="highlights">
                {data.addEntries.para5.highlight2}
              </span>
              {` ${data.addEntries.para5.chunk3} `}
              <span className="highlights">
                {data.addEntries.para5.highlight3}
              </span>
              {` ${data.addEntries.para5.chunk4} `}
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
              <span className="highlights">
                {data.updateRemoveEntries.para1.highlight1}
              </span>
              {` ${data.updateRemoveEntries.para1.chunk2} `}
              <span className="highlights">
                {data.updateRemoveEntries.para1.highlight2}
              </span>
              {` ${data.updateRemoveEntries.para1.chunk3} `}
              <span className="highlights">
                {data.updateRemoveEntries.para1.highlight3}
              </span>
              {` ${data.updateRemoveEntries.para1.chunk4} `}
            </p>
            <div className="code-block">
              <SyntaxHighlighter language="javascript" style={duotoneLight}>
                {data.updateRemoveEntries.code1}
              </SyntaxHighlighter>
            </div>
            <p className="para">
              {`${data.updateRemoveEntries.para2.chunk1} `}
              <span className="highlights">
                {data.updateRemoveEntries.para2.highlight1}
              </span>
              {` ${data.updateRemoveEntries.para2.chunk2} `}
            </p>
            <p className="para">
              {`${data.updateRemoveEntries.para3.chunk1} `}
              <span className="highlights">
                {data.updateRemoveEntries.para3.highlight1}
              </span>
              {` ${data.updateRemoveEntries.para3.chunk2} `}
              <span className="highlights">
                {data.updateRemoveEntries.para3.highlight2}
              </span>
              {` ${data.updateRemoveEntries.para3.chunk3} `}
            </p>
            <p className="para">
              {data.updateRemoveEntries.para4}
            </p>
            <h2 id="whatNow" className="page-sub-title">{data.whatNow.title}</h2>
            <p className="para">
              {data.whatNow.para1}
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
