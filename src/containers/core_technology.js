import React from 'react'
import { withRouteData } from 'react-static'
//
import Wrapper from './partials/wrapper';
import NetworkLayers from '../../public/images/network_layer.svg';

class CoreDeveloper extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="core-dev">
        <div className="core-dev-b">
          <div className="content-intro">
            <h1>{data.pageIntro.title}</h1>
            <p>{data.pageIntro.para1.chunk1}&nbsp;<a href={data.pageIntro.para1.link.href}>{data.pageIntro.para1.link.name}</a>&nbsp;{data.pageIntro.para1.chunk2}</p>
            <div className="med"><img src={NetworkLayers} alt="Network layer" /></div>
          </div>
          <div className="content-comp">
            <h1>{data.components.title}</h1>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.components.comp1.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.comp1.para1.chunk1}&nbsp;
                  <a href={data.components.comp1.para1.link1.href} target="_blank">{data.components.comp1.para1.link1.name}</a>
                  {data.components.comp1.para1.chunk2}&nbsp;
                  <a href={data.components.comp1.para1.link2.href} target="_blank">{data.components.comp1.para1.link2.name}</a>
                  {data.components.comp1.para1.chunk3}
                </p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.components.comp2.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.comp2.para1}
                </p>
                <p>
                  {data.components.comp2.para2.chunk1}&nbsp;
                  <a href={data.components.comp2.para2.link1.href} target="_blank">{data.components.comp2.para2.link1.name}</a>
                  &nbsp;{data.components.comp2.para2.chunk2}&nbsp;
                  <a href={data.components.comp2.para2.link2.href} target="_blank">{data.components.comp2.para2.link2.name}</a>
                  {data.components.comp2.para2.chunk3}
                </p>
                <p>
                  {data.components.comp2.para3.chunk1}&nbsp;
                  <a href={data.components.comp2.para3.link1.href} target="_blank">{data.components.comp2.para3.link1.name}</a>
                  {data.components.comp2.para3.chunk2}&nbsp;
                </p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.components.comp3.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>{data.components.comp3.para1}</p>
                <p>{data.components.comp3.para2}</p>
                <p>{data.components.comp3.para5}</p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.components.comp4.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.comp4.para1}&nbsp;
                </p>
                <p>{data.components.comp4.para2}</p>
                <p>{data.components.comp4.para3.chunk1}&nbsp;
                  <a href={data.components.comp4.para3.link1.href} target="_blank">{data.components.comp4.para3.link1.name}</a>
                  {data.components.comp4.para3.chunk2}
                </p>
                <p>{data.components.comp4.para4}</p>
              </div>
            </div>
          </div>
          <div className="content-comp">
            <h1>{data.utilities.title}</h1>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.utilities.comp1.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.utilities.comp1.para1.chunk1}&nbsp;
                  {/* <a href={data.utilities.comp1.para1.link1.href} target="_blank">{data.utilities.comp1.para1.link1.name}</a> */}
                </p>
                <p>
                  {data.utilities.comp1.para2.chunk1}&nbsp;
                  <a href={data.utilities.comp1.para2.link1.href} target="_blank">{data.utilities.comp1.para2.link1.name}</a>
                  &nbsp;{data.utilities.comp1.para2.chunk2}
                </p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.utilities.comp2.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.utilities.comp2.para1}&nbsp;
                  {/* <a href={data.utilities.comp2.para1.link1.href} target="_blank">{data.utilities.comp2.para1.link1.name}</a> */}
                </p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.utilities.comp3.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.utilities.comp3.para1}
                </p>
              </div>
            </div>
            {/* <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.utilities.comp4.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  <a href={data.utilities.comp4.para1.link1.href} target="_blank">{data.utilities.comp4.para1.link1.name}</a>
                </p>
              </div>
            </div> */}
          </div>
          <div className="rfcs">
              <div className="rfcs-b">
                <h3>{data.rfcs.title}</h3>
                <div className="rfcs-cntr">
                  <div className="rfc-i">
                    <a href={data.rfcs.rfc1.href} target="_blank">
                      <span>{data.rfcs.rfc1.name}</span>
                    </a>
                  </div>
                  <div className="rfc-i">
                    <a href={data.rfcs.rfc2.href} target="_blank">
                      <span>{data.rfcs.rfc2.name}</span>
                    </a>
                  </div>
                  <div className="rfc-i">
                    <a href={data.rfcs.rfc3.href} target="_blank">
                      <span>{data.rfcs.rfc3.name}</span>
                    </a>
                  </div>
                  <div className="rfc-i">
                    <a href={data.rfcs.rfc4.href} target="_blank">
                      <span>{data.rfcs.rfc4.name}</span>
                    </a>
                  </div>
                  <div className="rfc-i">
                    <a href={data.rfcs.rfc5.href} target="_blank">
                      <span>{data.rfcs.rfc5.name}</span>
                    </a>
                  </div>
                  <div className="rfc-i">
                    <a href={data.rfcs.rfc6.href} target="_blank">
                      <span>{data.rfcs.rfc6.name}</span>
                    </a>
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
  Wrapper(CoreDeveloper,  data)
))
