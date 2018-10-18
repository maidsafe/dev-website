import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import Wrapper from './partials/wrapper';
import Contribute from '../../public/images/contribute.svg';
import StandaloneImg from '../../public/images/standalone.svg';
import Roadmap from '../../public/images/roadmap.png';

class Home extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <section className="home">
        <div className="home-b">
          {/* Homepage Top CTA Banner - disable when no action (current: crust test OFF) */}
          {/*
          <div className="hom-bnr-2-link">
            <p>{data.test.crust_test.desc}: <b>{data.test.crust_test.title}</b></p>
            <p className="lft-sec-btn">
              <button className="btn" type="button" onClick={() => {
                location.assign(data.test.crust_test.link.href);
              }}>{data.test.crust_test.link.name}</button>
            </p>
          </div>
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

          <div className="roadmap">
            <div className="roadmap-b layout4060">
              <div className="lay-40">
                <div className="dual-tone-text">
                  <span className="light">{data.roadmap.title}</span>
                  <p>{data.roadmap.desc}</p>
                </div>
              </div>
              <div className="lay-60">
                <img src={Roadmap} />
              </div>
              <div className="mob-view">
                <div className="mob-view-b">
                  <div className="mob-view-ib mob-view-done">
                    {
                      data.roadmap.mobView.done.map((item, i) => (
                        <div key={`mob-view-done-i-${i}`} className={`mob-view-i ${item.icon}`}>
                          <div className="mob-view-icon"></div>
                          <div className="mob-view-title">{item.name}</div>
                          <div className="mob-view-desc">{item.desc}</div>
                        </div>
                      ))
                    }
                    <span className="mob-view-status-title">Complete</span>
                  </div>
                  <div className="progress-pointer"></div>
                  <div className="mob-view-ib mob-view-inprogress">
                    {
                      data.roadmap.mobView.inprogress.map((item, i) => (
                        <div key={`mob-view-progress-i-${i}`} className={`mob-view-i ${item.icon}`}>
                          <div className="mob-view-icon"></div>
                          <div className="mob-view-title">{item.name}</div>
                          <div className="mob-view-desc">{item.desc}</div>
                        </div>
                      ))
                    }
                    <span className="mob-view-status-title">In Progress</span>
                  </div>
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
