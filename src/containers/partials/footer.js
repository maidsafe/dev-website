import React from 'react'
import { withSiteData } from 'react-static'

import CONST from '../../constants';

//
export default withSiteData(() => (
  <footer>
    <div className="footer-b">
      <div className="maid-icon"><a href={CONST.externalLinks.general.maidsafe} target="_blank"></a></div>
      <div className="git-icon"><a href={CONST.externalLinks.general.github} target="_blank"></a></div>
      <div className="footer-cntr">
        <div className="footer-cntr-i"><a href={CONST.externalLinks.footer.docs} target="_blank">Docs</a></div>
        <div className="footer-cntr-i"><a href={CONST.externalLinks.footer.community} target="_blank">Community</a></div>
        <div className="footer-cntr-i"><a href={CONST.externalLinks.footer.blog} target="_blank">Blog</a></div>
      </div>
    </div>
  </footer>
))
