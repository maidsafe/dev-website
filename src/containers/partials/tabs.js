import React from 'react'
import { withSiteData, Link } from 'react-static'
import classNames from 'classnames';

import MockRouting from '../../../public/images/mock_routing.svg';
import ActualRouting from '../../../public/images/actual_routing.svg';
import LocalNetwork from '../../../public/images/local_network.svg';

import CONST from '../../constants';
import Wizard from './wizard';

//
export default class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      tabPos: 0
    };
    this.imgs = {
      mockRouting: MockRouting,
      localNetwork: LocalNetwork,
      actualRouting: ActualRouting,
    };
    this.getLayoutHalfContainer = this.getLayoutHalfContainer.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  goPrev() {
    if (this.state.tabPos === 0) {
      return;
    }
    this.setState({ tabPos: this.state.tabPos - 1 })
  }

  goNext() {
    if (this.state.tabPos === this.props.data.length - 1) {
      return;
    }
    this.setState({ tabPos: this.state.tabPos + 1 })
  }

  getLayoutHalfContainer(types) {
    return types.map((type, i) => {
      return (
        <div
          key={`tabs-${type.name}-${i}`}
          className={classNames('tab-cntr', {
            'active': this.state.tabPos === i
          })}
          id={type.id}>
          <div className="tab-cntr-img"><img src={this.imgs[type.id]} /></div>
          <div className="tab-cntr-content">
            <h3 className="tab-cntr-title">{type.name}</h3>
            <p className="tab-cntr-para">{type.para1}</p>
            <p className="tab-cntr-para">{type.para2}</p>
            {/* <div className="tab-cntr-opt"><button className="btn ghost-btn">{type.btnLink.name}</button></div> */}
          </div>
        </div>
      )
    })
  }

  getWizardContainer(data) {
    return data.map((d, i) => {
      return (
        <div
          key={`tabs-${d.name}-${i}`}
          className={classNames('tab-cntr', {
            'active': this.state.tabPos === i
          })}
          id={d.id}>
          <Wizard data={d} />
        </div>
      )
    });
  }

  render() {
    const { data, type } = this.props;

    let container = null;
    switch (type) {
      case CONST.tabTypes.LAY_HALF:
        container = this.getLayoutHalfContainer(data);
        break;
      case CONST.tabTypes.WIZARD:
        container = this.getWizardContainer(data);
        break;
    }

    return (
      <div className="types tabs">
        <div className="types-b tabs-b">
          <div className="tab-nav" id="NetworkType">
            <div className="tab-nav-b">
              <div className="tab-nav-ib" style={{ left: `-${this.props.tabNavWidth * (this.state.tabPos)}%` }}>
                {data.map((type, i) => {
                  const navClass = classNames('tab-nav-i', {
                    'active': i === this.state.tabPos
                  });
                  return (<div key={`tab-nav-${i}`} className={navClass}>{type.name}</div>)
                })}
              </div>
              <div className="tab-nav-opts">
                <div className={classNames('tab-nav-opt left', {
                  hidden: this.state.tabPos === 0
                })}><button onClick={() => this.goPrev()}></button></div>
                <div className={classNames('tab-nav-opt right', {
                  hidden: this.state.tabPos === data.length - 1
                })}><button onClick={() => this.goNext()}></button></div>
              </div>
            </div>
          </div>
          {container}
        </div>
      </div>
    )
  }
}
