import React from 'react'
import { withRouteData } from 'react-static'
import classNames from 'classnames';

//
import CONST from '../constants';
import withTracker from './partials/withTracker';

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
    this.resLogos = {
      GITHUB: GithubLogo,
      RFC: RfcLogo,
      WHITEPAPER: WhitepapersLogo,
      DOCUMENTATION: DocumentationLogo
    };
    this.resLinks = CONST.externalLinks.parsec.resources;
  }
  render() {
    const { data } = this.props;

    return (
      <section className="parsec">
        <div className="intro base">
          <h3 className="title">{data.pageIntro.title}</h3>
          <p className="desc">{data.pageIntro.desc}</p>
          <div className="parsec-i flip">
            <div className="parsec-i-b">
              <div className="parsec-i-med"><img src={ActualRouting} /></div>
              <div className="parsec-i-ctx">
                <h3 className="parsec-i-h">{data.whatIs.title}</h3>
                <p className="parsec-i-desc">{data.whatIs.para1}</p>
              </div>
            </div>
          </div>
          <div className="parsec-i">
            <div className="parsec-i-b">
              <div className="parsec-i-med"><img src={LocalNetwork} /></div>
              <div className="parsec-i-ctx">
                <h3 className="parsec-i-h">{data.whoFor.title}</h3>
                <p className="parsec-i-desc">{data.whoFor.para1}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="parres">
          <div className="parres-b layout4060">
            <div className="parres-lay-40">
              <div className="dual-tone-text">
                <span className="light">{data.resources.title.light1}</span>
              </div>
            </div>
            <div className="parres-lay-60">
              <div className="parres-cntr">
                <div className="parres-cntr-b">

                  <div className="parres-app">
                    <div className="parres-app-ls">
                      {
                        data.resources.res.map((res, i) => (
                          <div key={`parres-app-${i}`} className="parres-app-i">
                            <a href={this.resLinks[res.linkId]} target="_blank">
                              <div className="parres-app-logo"><img src={this.resLogos[res.logo]} /></div>
                              <div className="parres-app-name">{res.name}</div>
                            </a>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouteData(({ data }) => (
  withTracker(Parsec,  data)
))
