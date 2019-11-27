import React from 'react'
import { withRouteData } from 'react-static'
import { Link } from 'react-router-dom'

import CONST from '../constants';
import Wrapper from './partials/wrapper';

import IntroImage from '../../public/images/app_dev_intro.svg';
import WHMLogo from '../../public/images/web_hosting_manager_rgb.svg';
import EmailAppLogo from '../../public/images/email_app_rgb.svg';
import JAMSLogo from '../../public/images/jams_rgb.png';
import SAFECmsLogo from '../../public/images/safe_cms_logo.png';
import AccessNetwork from '../../public/images/access_network.png';
//
class AppDev extends React.Component {
  constructor() {
    super();
    this.appsLogos = {
      WEB_HOSTING_MANAGER: WHMLogo,
      EMAIL_APP: EmailAppLogo,
      JAMS: JAMSLogo,
      SAFE_CMS: SAFECmsLogo,
    };
    this.sampleAppsLinks = CONST.externalLinks.appDevs.sampleApps;
  }
  render() {
    const { data } = this.props;

    return (
      <section className="app-dev">
        {
		// <div className="platform-links">
        //   <div className="platform-links-b">
        //     {
        //       data.platformLinks.map((platform, i) => (
        //         <div key={`platform-link-${i}`} className="platform-link-i">
        //           <a href={platform.href}>
        //             <div className={`icn ${platform.icon}`}></div>
        //             <div className="name">{platform.name}</div>
        //           </a>
        //         </div>
        //       ))
        //     }
        //   </div>
        // </div>
		}
        <div className="intro">
          <div className="intro-b layout5050">
            <div className="intro-sec-1 lay-50">
              <div className="dual-tone-text">
                <span className="dark">{data.intro.title.dark}</span>
                <span className="light">{data.intro.title.light}</span>
                <div className="sub-title">{data.intro.subTitle}</div>
                <p>{data.intro.para1}</p>
                <p>{data.intro.para2}</p>
                {/* DG adding in a button here! */}
                <div className="dual-tone-text app">
                  <Link to="/dapps">{data.dapps.sampleApps.title}</Link>
                </div>
              </div>
            </div>
            <div className="intro-sec-2 lay-50">
              <div className="intro-image"><img src={IntroImage} /></div>
            </div>
          </div>
        </div>
{/*
        <div className="dapps">
          <div className="dapps-b layout4060">
            <div className="lay-40">
              <div className="dual-tone-text">
                <span className="dark">{data.dapps.title.dark1}</span>
                <span className="dark">{data.dapps.title.dark2}</span>
                <span className="light">{data.dapps.title.light}</span>
              </div>
            </div>
            <div className="lay-60">
              <div className="dapps-cntr">
                <div className="dapps-cntr-b">
                  <p className="desc">{data.dapps.para}</p>
                  <div className="sample-apps">
                    <h3>{data.dapps.sampleApps.title}</h3>
                    <div className="sample-app-ls">
                      {
                        data.dapps.sampleApps.apps.map((app, i) => (
                          <div key={`sample-apps-${i}`} className="sample-app-i">
                            <a href={this.sampleAppsLinks[app.linkId]} target="_blank">
                              <div className="sample-app-logo"><img src={this.appsLogos[app.logo]} /></div>
                              <div className="sample-app-name">{app.name}</div>
                            </a>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
*/}

        <div className="start-develop">
          <div className="start-develop-b">
            <div className="start-develop-sec-1">
              <div className="start-develop-sec-1-b">
                <div className="dual-tone-text">
                  <span className="dark">{data.startDevelop.title.dark}</span>
                  <span className="light">{data.startDevelop.title.light}</span>
                </div>
              </div>
            </div>
            <div className="start-develop-sec-2">
              <div className="start-develop-cntr">
                <div className="start-develop-cntr-b">
                  {
                    data.startDevelop.features.map((feature, i) => (
                      <div key={`start-dev-${i}`} className="start-develop-i">
                        <div className="start-develop-i-title">{feature.title}</div>
                        <div className={`start-develop-i-icon ${feature.icon}`}></div>
                        <div className="start-develop-i-desc">
                          <p>{`${feature.para.chunk1} `}</p>
                          <p>{`${feature.para.chunk2} `}</p>
                          {
                            feature.para.chunk3 &&
                            <p>{`${feature.para.chunk3} `}</p>
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
		{
			// <div className="access-net">
			//   <div className="access-net-b layout4060">
			//     <div className="lay-40">
			//       <div className="dual-tone-text">
			//         <span className="dark">{data.accessingNetwork.title.dark}</span>
			//         <span className="light">{data.accessingNetwork.title.light}</span>
			//         <p>{data.accessingNetwork.para1.chunk1}<a href={data.accessingNetwork.para1.link.href}>{data.accessingNetwork.para1.link.name}</a>{data.accessingNetwork.para1.chunk2}</p>
			//         <p>{data.accessingNetwork.para2}</p>
			//         <p>{`${data.accessingNetwork.para3.chunk} `}<a href={data.accessingNetwork.para3.link.href}>{data.accessingNetwork.para3.link.name}</a></p>
			//       </div>
			//     </div>
			//     <div className="lay-60">
			//       <img src={AccessNetwork} />
			//     </div>
			//   </div>
			// </div>

		}
      </section>
    );
  }
}

export default withRouteData(({ data }) => (
  Wrapper(AppDev, data)
));
