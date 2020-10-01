import React from 'react'
import { withSiteData } from 'react-static'
import { Link } from 'react-router-dom';

import CONST from '../../constants';

//
export default withSiteData(() => (
  <footer>
    <div className="footer-b">
      <div className="maid-icon"><a href={CONST.externalLinks.general.maidsafe} target="_blank" rel="noreferrer"></a></div>
      <div className="git-icon"><a href={CONST.externalLinks.general.github} target="_blank" rel="noreferrer"></a></div>
      <div className="footer-cntr">
        <div className="footer-cntr-i"><a href={CONST.externalLinks.general.safenetwork} target="_blank" rel="noreferrer">safenetwork.tech</a></div>
        <div className="footer-cntr-i"><a href={CONST.externalLinks.general.devForum} target="_blank" rel="noreferrer">Dev Forum</a></div>
        <div className="footer-cntr-i"><a href={CONST.externalLinks.general.chatRooms} target="_blank" rel="noreferrer">Chat Rooms</a></div>
        <div className="footer-cntr-i"><Link to="/licensing">Licensing</Link></div>
      </div>
    </div>
  </footer>
))
