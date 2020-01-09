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
import { Link } from 'react-router-dom'
//
import Wrapper from './partials/wrapper';
import Contribute from '../../public/images/contribute.svg';
import StandaloneImg from '../../public/images/standalone.svg';

class Home extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <section className="home">
        <div className="home-b">
          {/* Homepage Top CTA Banner - disable when no action (current: Android Platform Development)
          <div className="hom-bnr-2-link">
            <p><b>New:</b> Extended platform support</p>
            <p className="lft-sec-btn">
              <button className="btn" type="button" onClick={() => {
                location.assign('/platform/android');
              }}>Android</button>  &nbsp;
              <button className="btn" type="button" onClick={() => {
                location.assign('/platform/xamarin');
              }}>Xamarin</button> &nbsp;
              <button className="btn" type="button" onClick={() => {
                location.assign('/platform/dotnet');
              }}>.Net</button>

            </p>
          </div>
		  // <section className="platform">
		  //   <div className="platform-links">
		  //     <div className="platform-links-b">
		  //       {
		  //         data.platformLinks.map((platform, i) => (
		  //           <div key={`platform-link-${i}`} className="platform-link-i">
		  //             <a href={platform.href}>
		  //               <div className={`icn ${platform.icon}`}></div>
		  //               <div className="name">{platform.name}</div>
		  //             </a>
		  //           </div>
		  //         ))
		  //       }
		  //     </div>
		  //   </div>
		  // </section>
          */}

          <div className="hom-bnr-2">
            <div className="hom-bnr-2-cntx">
              <div className="hom-bnr-2-h">{data.homeBanner2.title}</div>
              <div className="hom-bnr-2-cntn">{data.homeBanner2.para}</div>
            </div>
          </div>


          <div className="build-on-safe">
            <div className="build-on-safe-b layout4060">
              <div className="lay-40">
                <div className="dual-tone-text">
                  <span className="dark">{data.buildOnSafeNet.title.dark1}</span>
                  <span className="dark">{data.buildOnSafeNet.title.dark2}</span>
                  <span className="light">{data.buildOnSafeNet.title.light}</span>
                </div>
              </div>
              <div className="lay-60">
                <div className="six-keys">
                  <div className="six-keys-b">
                    {
                      data.buildOnSafeNet.sixKeys.map((key, i) => (
                        <div key={`key-features-${i}`} className="six-key-i">
                          <div className={`icn ${key.icon}`}></div>
                          <div className="title">{key.title}</div>
                          <div className="desc">{key.desc}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contribute">
            <div className="contribute-b layout5050">
              <div className="contribute-sec-1 lay-50 top-align">
                <div className="dual-tone-text">
                  <span className="dark">{data.contribute.title.dark1}</span>
                  <span className="dark">{data.contribute.title.dark2}</span>
                  <span className="light">{data.contribute.title.light}</span>
                  <div className="contribute-img"><img src={Contribute} /></div>
                </div>
              </div>
              <div className="contribute-sec-2 lay-50">
                <div className="contribute-i app">
                  <h3>{data.contribute.appDev.title}</h3>
                  <p>{data.contribute.appDev.desc}</p>
                  <Link to={data.contribute.appDev.link.href}>{data.contribute.appDev.link.name}</Link>
                </div>
                <div className="contribute-i core">
                  <h3>{data.contribute.coreDev.title}</h3>
                  <p>{data.contribute.coreDev.desc}</p>
                  <Link to={data.contribute.coreDev.link.href}>{data.contribute.coreDev.link.name}</Link>
                </div>
                <div className="contribute-i app">
                  <h3>{data.contribute.dapps.title}</h3>
                  <p>{data.contribute.dapps.desc}</p>
                  <Link to={data.contribute.dapps.link.href}>{data.contribute.dapps.link.name}</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="standalone">
            <div className="standalone-b layout5050">
              <div className="standalone-sec-1 lay-50 top-align">
                <div className="dual-tone-text">
                  <span className="vlight">{data.sharing.title.shared}</span>
                  <span className="light">{data.sharing.title.tech}</span>
                  <div className="standalone-img"><img src={StandaloneImg} /></div>
                </div>
              </div>
              <div className="standalone-sec-2 lay-50">
                <div className="standalone-i core">
                  <h3>{data.sharing.parsec.title}</h3>
                  <p>{data.sharing.parsec.desc}</p>
                  <Link to={data.sharing.parsec.link.href}>{data.sharing.parsec.link.name}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Home, data)
));
