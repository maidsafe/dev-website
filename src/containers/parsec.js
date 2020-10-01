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
import { Link } from 'react-router-dom'
import classNames from 'classnames';

//
import CONST from '../constants';
import Wrapper from './partials/wrapper';

// Images for page graphics
import MockRouting from '../../public/images/mock_routing.svg';
import ActualRouting from '../../public/images/actual_routing.svg';
import LocalNetwork from '../../public/images/local_network.svg';

// Logos
import GithubLogo from '../../public/images/logo_github.png';
import RfcLogo from '../../public/images/logo_github_2.png';
import WhitepapersLogo from '../../public/images/logo_whitepapers.png';
import DocumentationLogo from '../../public/images/logo_documentation.png';

class Parsec extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { data } = this.props;

    return (
      <section className="parsec">
        <div className="intro-base">

          <p className="title">{data.header.title}</p>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.pageIntro.title}</h3> </div>
          <div className="parsec-i-cntr">
            <p>
              {data.pageIntro.desc}&nbsp;
              <a href={data.pageIntro.link1.href} target="_blank" rel="noreferrer">{data.pageIntro.link1.name}</a>
              {data.pageIntro.end}
            </p>
          </div>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.networkUse.title}</h3> </div>
          <div className="parsec-i-cntr">
            <p className="parsec-i-desc">{data.networkUse.para1}</p>
            <p className="parsec-i-desc">{data.networkUse.para2}</p>
          </div>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.bigDeal.title}</h3> </div>
          <div className="parsec-i-cntr">
            <p>
              {data.bigDeal.para1}
            </p>
          </div>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.myProject.title}</h3> </div>
          <div className="parsec-i-cntr">
            <p>
              {data.myProject.para1}
            </p>
          </div>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.moreInfo.title}</h3> </div>
          <div className="parsec-i-cntr">
            <p>
              {data.moreInfo.para1.chunk1}
              <a href={data.moreInfo.link1.href} target="_blank" rel="noreferrer">{data.moreInfo.link1.name}</a>
              {data.moreInfo.para1.chunk2}
              <a href={data.moreInfo.link2.href} target="_blank" rel="noreferrer">{data.moreInfo.link2.name}</a>
              {data.moreInfo.para1.chunk3}
            </p>
          </div>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.resources.title}</h3> </div>
          <div className="parsec-i-res">
            <p><a href={data.resources.res1.href} target="_blank" rel="noreferrer">{data.resources.res1.name}</a></p>
            <p><a href={data.resources.res2.href} target="_blank" rel="noreferrer">{data.resources.res2.name}</a></p>
            <p><a href={data.resources.res3.href} target="_blank" rel="noreferrer">{data.resources.res3.name}</a></p>
            <p><a href={data.resources.res4.href} target="_blank" rel="noreferrer">{data.resources.res4.name}</a></p>
          </div>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.articles.title}</h3> </div>
          <div className="parsec-i-res">
            <p><a href={data.articles.link1.href} target="_blank" rel="noreferrer">{data.articles.link1.name}</a></p>
            <p><a href={data.articles.link2.href} target="_blank" rel="noreferrer">{data.articles.link2.name}</a></p>
          </div>
        </div>

        <div className="parsec-i">
          <div className="parsec-i-head"> <h3>{data.videos.title}</h3> </div>
          <div className="parsec-i-cntr">
          <p>{data.videos.intro}</p>
          </div>
          <div className="parsec-i-res">
            <p><a href={data.videos.video1.href} target="_blank" rel="noreferrer">{data.videos.video1.name}</a></p>
            <p><a href={data.videos.video2.href} target="_blank" rel="noreferrer">{data.videos.video2.name}</a></p>
            <p><a href={data.videos.video3.href} target="_blank" rel="noreferrer">{data.videos.video3.name}</a></p>
            <p><a href={data.videos.video4.href} target="_blank" rel="noreferrer">{data.videos.video4.name}</a></p>
          </div>
        </div>

      </section>
    )
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Parsec, data)
))
