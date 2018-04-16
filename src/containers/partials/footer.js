import React from 'react'
import { withSiteData } from 'react-static'
//
export default withSiteData(() => (
  <footer>
    <div className="footer-b">
      <div className="maid-icon"><a href="https://maidsafe.net" target="_blank"></a></div>
      <div className="git-icon"><a href="https://github.com/maidsafe" target="_blank"></a></div>
      <div className="footer-cntr">
        <div className="footer-cntr-i"><a href="/">Docs</a></div>
        <div className="footer-cntr-i"><a href="/">Community</a></div>
        <div className="footer-cntr-i"><a href="/">Blog</a></div>
      </div>
    </div>
  </footer>
))
