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
//
import Wrapper from './partials/wrapper';
import CONST from '../constants';

class Licensing extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="licensing">
        <div className="licensing-b base">
          <div className="lic-content">
            <h3 className="page-title">{data.intro.title}</h3>
            <p>{data.intro.para1.chunk1}&nbsp;<a href={data.intro.para1.link.href} target="_blank" rel="noreferrer">{data.intro.para1.link.name}</a>&nbsp;{data.intro.para1.chunk2}</p>
            <ul className="list">
              {data.intro.list.map((li, i) => (
                <li key={`intro-list=${i}`} className="ls-i">{li}</li>
              ))}
            </ul>
            <p>{data.intro.para2}</p>
            <p>
              {data.intro.para3.chunk1}&nbsp;<a target="_blank" rel="noreferrer" href={data.intro.para3.link1.href}>{data.intro.para3.link1.name}</a>{data.intro.para3.chunk2}
              &nbsp;<a target="_blank" href={data.intro.para3.link2.href}>{data.intro.para3.link2.name}</a>&nbsp;{data.intro.para3.chunk3}
              &nbsp;<a target="_blank" rel="noreferrer" href={data.intro.para3.link3.href}>{data.intro.para3.link3.name}</a>&nbsp;{data.intro.para3.chunk4}
            </p>
          </div>
          <div className="lic-content">
            <h3 className="sub-title">{data.useOfApi.title}</h3>
            <p>
              {data.useOfApi.para}
            </p>
          </div>
          <div className="lic-content">
            <h3 className="sub-title">{data.coreContributions.title}</h3>
            <p>{data.coreContributions.para1}</p>
            <p>{data.coreContributions.para2}</p>
          </div>
          <div className="lic-content">
            <h3 className="sub-title">{data.patents.title}</h3>
            <p>{data.patents.para1}</p>
            <p>{data.patents.para2}</p>
            <ul className="list">
              <h4 className="ls-h">{data.patents.list.title}</h4>
              {
                data.patents.list.items.map((li, i) => (
                  <li key={`patents-li-${i}`} className="ls-i">{li}</li>
                ))
              }
            </ul>
            <p>{data.patents.para3}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Licensing, data)
));
