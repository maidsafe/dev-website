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
import classNames from 'classnames';
import Tabs from './partials/tabs'
import Wrapper from './partials/wrapper';
//
import EcoSystemBanner from '../../public/images/ecosystem_banner.svg'
import Auth1 from '../../public/images/auth_1.png'
import Auth2 from '../../public/images/auth_2.png'
import Auth3 from '../../public/images/auth_3.png'
import MockRouting from '../../public/images/mock_routing.svg';
import ActualRouting from '../../public/images/actual_routing.svg';
import LocalNetwork from '../../public/images/local_network.svg';

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
      for (let i = 0; i < tabNav.length; i++) {
        const tabBase = tabNav[i].querySelector('.tab-nav-ib');
        tabBase.style.width = `${tabNav[i].offsetWidth * 3}px`;
      }
    } else {
      const tabNav = document.getElementsByClassName('tab-nav');
      for (let i = 0; i < tabNav.length; i++) {
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
            <p className="desc">
              {`${data.authenticator.para1.chunk1}`}
			  {
				  // <span className="highlight">
				  //   {data.authenticator.para1.highlight}
				  // </span>
				  // {`${data.authenticator.para1.chunk2}`}
			  }
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
            {/* <Tabs data={data.networks.types} type={CONST.tabTypes.LAY_HALF} tabNavWidth={this.tabNavWidth} /> */}
            <div className="network-type-i flip">
              <div className="network-type-i-b">
                <div className="network-type-i-med"><img src={MockRouting} /></div>
                <div className="network-type-i-ctx">
                  <h3 className="network-type-i-h">{data.networks.types[0].name}</h3>
                  <p className="network-type-i-desc">{data.networks.types[0].para1}</p>
                  <p className="network-type-i-desc">{data.networks.types[0].para2}</p>
                  <a className="network-type-i-link"></a>
                </div>
              </div>
            </div>
            <div className="network-type-i">
              <div className="network-type-i-b">
                <div className="network-type-i-med"><img src={LocalNetwork} /></div>
                <div className="network-type-i-ctx">
                  <h3 className="network-type-i-h">{data.networks.types[1].name}</h3>
                  <p className="network-type-i-desc">{data.networks.types[1].para1}</p>
                  <p className="network-type-i-desc">{data.networks.types[1].para2}</p>
                  <a className="network-type-i-link" href={data.networks.types[1].btnLink.link} target="_blank">{data.networks.types[1].btnLink.name}</a>
                </div>
              </div>
            </div>
            <div className="network-type-i flip">
              <div className="network-type-i-b">
                <div className="network-type-i-med"><img src={ActualRouting} /></div>
                <div className="network-type-i-ctx">
                  <h3 className="network-type-i-h">{data.networks.types[2].name}</h3>
                  <p className="network-type-i-desc">{data.networks.types[2].para1}</p>
                  <p className="network-type-i-desc">{data.networks.types[2].para2}</p>
                  <a className="network-type-i-link"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="node">
          <div className="node-b base">
            <h3 className="title">{data.node.title}</h3>
            <p className="para">{data.node.desc}</p>
            <p className="para">{data.node.para}</p>
            <div className="node-opt"><button className="btn ghost-btn" onClick={() => { window.open(`${data.node.btnLink.link}`) }}>{data.node.btnLink.name}</button></div>
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
        {

			// <div className="data-types">
			// <div className="data-types-b base">
			// <h3 className="data-types-title">{data.dataTypes.title}</h3>
			// <p className="data-types-desc">{data.dataTypes.desc}</p>
			// {/* <Tabs data={data.dataTypes.types} type={CONST.tabTypes.WIZARD} tabNavWidth={this.tabNavWidth} /> */}
			// <div className="data-types-split">
			// <div className="data-types-split-b">
			// <div className="data-types-split-i">
			// <h3 className="data-types-split-i-h">{data.dataTypes.types[0].name}</h3>
			// <div className="data-types-split-i-feat">
			// <h4 className="data-types-split-i-feat-h">{data.dataTypes.types[0].features[0].title}</h4>
			// <p className="data-types-split-i-feat-p">{data.dataTypes.types[0].features[0].para}</p>
			// </div>
			// <div className="data-types-split-i-feat">
			// <h4 className="data-types-split-i-feat-h">{data.dataTypes.types[0].features[1].title}</h4>
			// <p className="data-types-split-i-feat-p">{data.dataTypes.types[0].features[1].para}</p>
			// </div>
			// </div>
			// <div className="data-types-split-i">
			// <h3 className="data-types-split-i-h">{data.dataTypes.types[1].name}</h3>
			// <div className="data-types-split-i-feat">
			// <h4 className="data-types-split-i-feat-h">{data.dataTypes.types[1].features[0].title}</h4>
			// <p className="data-types-split-i-feat-p">{data.dataTypes.types[1].features[0].para}</p>
			// </div>
			// <div className="data-types-split-i-feat">
			// <h4 className="data-types-split-i-feat-h">{data.dataTypes.types[1].features[1].title}</h4>
			// <p className="data-types-split-i-feat-p">{data.dataTypes.types[1].features[1].para}</p>
			// </div>
			// </div>
			// </div>
			// </div>
			// </div>
			// </div>
		}
      </section>
    );
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Discover, data)
));
