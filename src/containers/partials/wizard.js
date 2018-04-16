import React from 'react'
import { withSiteData, Link } from 'react-static'
import classNames from 'classnames';

//
import CONST from '../../constants';

export default class Wizard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { data } = this.props;
    console.log('eee', data)
    return (
      <div className="wizard">
        <div className="wizard-b">
          <div className="wizard-top-nav">
            <span className="wizard-top-nav-i" data-index='{i}'></span>
            {
              data.features.map((feat, i) => (
                <span className="wizard-top-nav-i" data-index={i}></span>
              ))
            }
          </div>
          <div className="wizard-cntr">
            {
              data.features.map((feat, i) => {
                return (
                  <div className="wizard-i">
                    <h3 className="wizard-feat-name">{feat.title}</h3>
                    <p className="wizard-feat-para">{feat.para}</p>
                  </div>
                );
              })
            }
          </div>
          <div className="wizard-opt">
            <div className="wizard-opt left">{data.features[1].title}</div>
            <div className="wizard-opt right"></div>
          </div>
        </div>
      </div>
    )
  }
}
