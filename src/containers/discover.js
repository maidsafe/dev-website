import React from 'react'
import { withRouteData } from 'react-static'
import classNames from 'classnames';
import Tabs from './partials/tabs'
//
import EcoSystemBanner from '../../public/images/ecosystem_banner.svg'
import Auth1 from '../../public/images/auth_1.png'
import Auth2 from '../../public/images/auth_2.png'
import Auth3 from '../../public/images/auth_3.png'

import CONST from '../constants';

class Discover extends React.Component {
  constructor() {
    super();
    this.tabNavWidth = 33.33;
    this.authImgs = {
      AUTH_1: Auth1,
      AUTH_2: Auth2,
      AUTH_3: Auth3,
    };
  }
  componentDidMount() {
    this.prepareTabs();
    window.addEventListener('resize', () => {
      this.prepareTabs();
    }, true);
  }

  prepareTabs() {
    if (window.innerWidth <= 768) {
      this.tabNavWidth = 100

      // network type
      const tabNav = document.getElementsByClassName('tab-nav');
      for(let i = 0; i < tabNav.length; i++) {
        const tabBase = tabNav[i].querySelector('.tab-nav-ib');
        tabBase.style.width = `${tabNav[i].offsetWidth * 3}px`;
      }
    } else {
      const tabNav = document.getElementsByClassName('tab-nav');
      for(let i = 0; i < tabNav.length; i++) {
        const tabBase = tabNav[i].querySelector('.tab-nav-ib');
        tabBase.style.width = `100%`;
      }
    }
  }

  render() {
    const { data } = this.props;

    return (
      <section className="discover">
        <div className="intro base">
          <h3 className="title">{data.intro.title}</h3>
          <p className="para">{data.intro.para1}</p>
          <p className="para">{data.intro.para2}</p>
          <p className="para">{data.intro.para3}</p>
          <div className="ecosystem-banner"><img src={EcoSystemBanner} /></div>
        </div>
        <div className="authenticator">
          <div className="authenticator-b base">
            <h3 className="title">{data.authenticator.title}</h3>
            <p className="desc">{data.authenticator.desc}</p>
            <p className="para">
              {`${data.authenticator.para1.chunk1}`}
              <span className="highlight">
                {data.authenticator.para1.highlight}
              </span>
              {`${data.authenticator.para1.chunk2}`}
            </p>
            <div className="steps">
              {
                data.authenticator.steps.map((step, i) => (
                  <div key={`authenticator-steps-${i}`} className="step">
                    <h3 className={classNames('step-img', {
                      small: !!step.smallIcon
                    })}><img src={this.authImgs[step.icon]} /></h3>
                    <h3 className="step-name">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="network-type">
          <div className="network-type-b base">
            <h3 className="title">{data.networks.title}</h3>
            <p className="desc">{data.networks.desc}</p>
            <Tabs data={data.networks.types} type={CONST.tabTypes.LAY_HALF} tabNavWidth={this.tabNavWidth} />
          </div>
        </div>
        <div className="vault">
          <div className="vault-b base">
            <h3 className="title">{data.vault.title}</h3>
            <p className="para">{data.vault.desc}</p>
            <p className="para">{data.vault.para}</p>
            <div className="vault-opt"><button className="btn ghost-btn" onClick={() => { window.open(`${data.vault.btnLink.link}`) }}>{data.vault.btnLink.name}</button></div>
          </div>
        </div>
        <div className="def-cntrs">
          <div className="def-cntrs-b base">
            <h3 className="def-cntrs-title">{data.containers.title}</h3>
            <p className="def-cntrs-desc">
              {`${data.containers.desc.chunk1} `}
              <span className="highlight">
                {data.containers.desc.highlight1}
              </span>
              {` ${data.containers.desc.chunk2} `}
              <span className="highlight">
                {data.containers.desc.highlight2}
              </span>
              {` ${data.containers.desc.chunk3} `}
              <span className="highlight">
                {data.containers.desc.highlight3}
              </span>
              {` ${data.containers.desc.chunk4} `}
              <span className="highlight">
                {data.containers.desc.highlight4}
              </span>
              {` ${data.containers.desc.chunk5} `}
              <span className="highlight">
                {data.containers.desc.highlight5}
              </span>
              {` ${data.containers.desc.chunk6} `}
            </p>
            <p className="para">{data.containers.para}</p>
            <div className="def-cntrs-ls">
              {
                data.containers.list.map((cont, i) => (
                  <div key={`def-cntrs-${i}`} className="def-cntrs-ls-i">
                    <div className={`def-cntrs-ls-i-icon ${cont.icon}`}></div>
                    <div className="def-cntrs-ls-i-title">{cont.title}</div>
                  </div>
                ))
              }
            </div>
            {/* <div className="def-cntr-quote">{data.containers.quote}</div> */}
          </div>
        </div>
        <div className="data-types">
          <div className="data-types-b base">
            <h3 className="data-types-title">{data.dataTypes.title}</h3>
            <p className="data-types-desc">{data.dataTypes.desc}</p>
            <Tabs data={data.dataTypes.types} type={CONST.tabTypes.WIZARD} tabNavWidth={this.tabNavWidth} />
          </div>
        </div>
      </section>
    );
  }
}

export default withRouteData(({ data }) => (
  <Discover data={data} />
));
