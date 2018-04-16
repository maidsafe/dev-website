import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import Contribute from '../../public/images/contribute.svg';
import Roadmap from '../../public/images/roadmap.png';

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { data } = this.props;
    return (
      <section className="home">
        <div className="home-b">
          <div className="home-banner">
            <div className="home-banner-typo"></div>
            <div className="home-banner-link"><a href={data.homeBanner.link.href} target="_blank">{data.homeBanner.link.name}</a></div>
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
                      data.buildOnSafeNet.sixKeys.map((key, i) => {
                        return (
                          <div key={`key-features-${i}`} className="six-key-i">
                            <div className={`icn ${key.icon}`}></div>
                            <div className="title">{key.title}</div>
                            <div className="desc">{key.desc}</div>
                          </div>
                        )
                      })
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
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouteData(({ data }) => (
  <Home data={data} />
));
