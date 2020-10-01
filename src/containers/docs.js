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

class Docs extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="docs">

        <div className="platform main">

          {/* Platform development documentation */}
          <div className="main-section">

           <h1>{data.docs.title}</h1>
            <h2>{data.platform.title}</h2>
            <p>{data.platform.summary}</p>
            <p>Right now development of simpler, dev-facing APIs is underway. As such documentation is still to be finalised, but <a href="https://github.com/maidsafe/sn_api/blob/master/README.md" target="_blank">you can access the latest Safe API documentation in this repo.</a></p>
          </div>



          {/* Core libraries - Rust */}
          <div className="core main">
            <div className="main-section">

              <h2>{data.rust.title}</h2>

              <p>
                {data.rust.para1.chunk1}
                <a href={data.rust.para1.link1.href} target="_blank" rel="noreferrer"> {data.rust.para1.link1.name}</a>
                {data.rust.para1.chunk2}
                <a href={data.rust.para1.link2.href} target="_blank" rel="noreferrer"> {data.rust.para1.link2.name}</a>
                {data.rust.para1.chunk3}
              </p>

              <div className="list"> {
                data.rust.items.map((key, i) => (
                  <div key={`key-items-${i}`} className="item3">
                    <p>
                    <a href={key.href}>
                      <span className={`icn ${"rust"}`}></span>
                      <span className="name">{key.name}</span>
                    </a>
                    </p>
                  </div>
                )) }
              </div>
            </div>
          </div>
        </div>
      </section>


    )
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Docs,  data)
))
