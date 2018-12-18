import React from 'react'
import { withRouteData, Link } from 'react-static'
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

          {/* Homepage Top CTA Banner - disable when no action (current: Updated SAFE Browser) */}
          <div className="hom-bnr-2-link">
            <p>New: <b>Updated SAFE Browser</b></p>
            <p className="lft-sec-btn">
              <button className="btn" type="button" onClick={() => {
                location.assign('https://github.com/maidsafe/safe_browser/releases/latest');
              }}>Download now</button>
            </p>
          </div>

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
                  <a href={data.contribute.appDev.link.href}>{data.contribute.appDev.link.name}</a>
                </div>
                <div className="contribute-i core">
                  <h3>{data.contribute.coreDev.title}</h3>
                  <p>{data.contribute.coreDev.desc}</p>
                  <a href={data.contribute.coreDev.link.href}>{data.contribute.coreDev.link.name}</a>
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
                  <a href={data.sharing.parsec.link.href}>{data.sharing.parsec.link.name}</a>
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
