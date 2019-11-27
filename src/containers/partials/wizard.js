import React from 'react'
import { withSiteData } from 'react-static'
import { Link } from 'react-router-dom'
import classNames from 'classnames';

//
import CONST from '../../constants';

export default class Wizard extends React.Component {
  constructor() {
    super();
    this.state = {
      contentPos: 0
    };
    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  goPrev() {
    if (this.state.contentPos === 0) {
      return;
    }
    this.setState({ contentPos: this.state.contentPos - 1 });
  }

  goNext() {
    if (this.state.contentPos === this.props.data.features.length - 1) {
      return;
    }
    this.setState({ contentPos: this.state.contentPos + 1 })
  }

  getOpts() {
    const { data } = this.props;
    let leftBtn = null;
    let rightBtn = null;

    if (this.state.contentPos > 0) {
      leftBtn = (
        <div className={classNames('wizard-opt left', {
          hide: this.state.contentPos === 0
        })}><button onClick={() => this.goPrev()}>{data.features[this.state.contentPos - 1].title}</button></div>
      );
    }
    if (this.state.contentPos < this.props.data.features.length - 1) {
      rightBtn = (
        <div className={classNames('wizard-opt right', {
          hide: this.state.contentPos === this.props.data.features.length - 1
        })}><button onClick={() => this.goNext()}>{data.features[this.state.contentPos + 1].title}</button></div>
      );
    }
    return (
      <div className="wizard-opts">
        {leftBtn}
        {rightBtn}
      </div>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div className="wizard">
        <div className="wizard-b">
          <div className="wizard-top-nav">
            {
              data.features.map((feat, i) => (
                <span key={`wizard-top-nav-${i}`} className={classNames('wizard-top-nav-i', {
                  active: this.state.contentPos === i
                })} data-index={i}></span>
              ))
            }
          </div>
          <div className="wizard-cntr">
            {
              data.features.map((feat, i) => {
                const wizardClass = classNames('wizard-i', {
                  active: this.state.contentPos === i
                });
                return (
                  <div key={`wizard-i-${i}`} className={wizardClass}>
                    <h3 className="wizard-feat-name">{feat.title}</h3>
                    <p className="wizard-feat-para">{feat.para}</p>
                  </div>
                );
              })
            }
          </div>
          {this.getOpts()}
        </div>
      </div>
    )
  }
}
