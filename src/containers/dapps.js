// Copyright 2020 MaidSafe.net limited.
//
// This SAFE Network Software is licensed to you under the MIT license <LICENSE-MIT
// http://opensource.org/licenses/MIT> or the Modified BSD license <LICENSE-BSD
// https://opensource.org/licenses/BSD-3-Clause>, at your option. This file may not be copied,
// modified, or distributed except according to those terms. Please review the Licences for the
// specific language governing permissions and limitations relating to use of the SAFE Network
// Software.

import React from 'react'
import { withRouteData } from 'react-static'
//
import Wrapper from './partials/wrapper';

import CONST from '../constants';
// dApp logo images...
import IntroImage from '../../public/images/app_dev_intro.svg';
import WHMLogo from '../../public/images/web_hosting_manager_rgb.svg';
import EmailAppLogo from '../../public/images/email_app_rgb.svg';
import JAMSLogo from '../../public/images/jams_rgb.png';
import SAFECmsLogo from '../../public/images/dapps_safe_cms.png';
import SAFEDriveLogo from '../../public/images/dapps_safe_drive_256.png';
import SAFEBrowserLogo from '../../public/images/dapps_safebrowser_256.png';
import SAFEAuthenticatorLogo from '../../public/images/dapps_safeauthenticator.png';
import SAFEMessagesLogo from '../../public/images/dapps_safemessage.png';
import SAFENetDriveLogo from '../../public/images/dapps_safe_netdrive.png';
import DevolutionLogo from '../../public/images/dapps_devolution512.png';
import PatterLogo from '../../public/images/dapps_patter.png';
import WebIDLogo from '../../public/images/dapps_webid.png';

class Dapps extends React.Component {
  constructor() {
    super();
    this.appsLogos = {
      WEB_HOSTING_MANAGER: WHMLogo,
      EMAIL_APP: EmailAppLogo,
      JAMS: JAMSLogo,
      SAFE_CMS: SAFECmsLogo,
      SAFE_DRIVE: SAFEDriveLogo,
      SAFE_BROWSER: SAFEBrowserLogo,
      SAFE_AUTHENTICATOR: SAFEAuthenticatorLogo,
      SAFE_MESSAGES: SAFEMessagesLogo,
      SAFE_NETDRIVE: SAFENetDriveLogo,
      DEVOLUTION: DevolutionLogo,
      PATTER: PatterLogo,
      WEBID: WebIDLogo
    };
    this.appsLinks = CONST.externalLinks.appDevs.sampleApps;
  }

  render() {
    const { data } = this.props;

    return (
      <section className="dapps-main">

        {/* Title and initial description */}
        <div className="header">

          {/* Page title */}
          <h1>{data.header.title}</h1>

          {/* Introduction text */}
          <div className="intro-text">
            <div className="para">
              {data.header.description}
            </div>

            {/* DG adding in a button here! */}
            <div className="forum-link app">
              <a href={data.getinvolved.href}>{data.getinvolved.name}</a>
            </div>
          </div>
        </div>

        <div className="dapps-feat">
          {/* Section title */}
          <div className="title">
            <h2>{data.header.existing}</h2>
			<p>{data.header.note}</p>
          </div>

          {/* Repeating section for each entry */}
          <div className="apps-items"> {
            data.items.map((app, i) => (
              <div key={`app-${i}`} className="app-i layoutDApps">

                <div className="sec-1 lay-left">
                  <div className="logo"><img src={this.appsLogos[app.logo]} /></div>
                </div>
                <div className="sec-2 lay-right">
                  <div className="name">{app.name}</div>
                  <div className="desc">{app.desc}</div>
                  <hr />

                  <div className="layout5050">
                    <div className="lay-50">
                    {
                      app.detail.map((detail, j) => (
                      <div key={`detail-${j}`} className="detail"><b>• {detail.type}:</b> <a href={detail.href} target="_blank">{detail.name}</a></div>
                    ))
                    }
                    </div>
                    <div className="lay-50">
                      <div className="detail"><b>• Platform:</b> {app.platform}</div>
                      <div className="detail"><b>• Status:</b> {app.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>
    )
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Dapps,  data)
))
