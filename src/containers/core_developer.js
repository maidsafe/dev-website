import React from 'react'
import { withRouteData } from 'react-static'
//
class CoreDeveloper extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="core-dev">
        <div className="core-dev-b">
          <div className="content-intro">
            <h1>{data.pageIntro.title}</h1>
            <p>
             {data.pageIntro.para.chunk1}
            </p>
          </div>
          <div className="content-comp">
            <h2>{data.client_libs.title}</h2>
            <p>
              {data.client_libs.para}
            </p>
            <p>
              {data.client_libs.para2}
            </p>
            <p>
              {data.client_libs.para3}
            </p>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.client_libs.comp1.name}</h3>
                <div className="git-link"><a href={data.client_libs.comp1.link.href} target="_blank">{data.client_libs.comp1.link.name}</a></div>
              </div>
              <div className="comp-i-cntr">
                <p>{data.client_libs.comp1.para.chunk1}&nbsp;<span className="highlight">{`${data.client_libs.comp1.para.highlight1}`}</span>&nbsp;{data.client_libs.comp1.para.chunk2}</p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.client_libs.comp2.name}</h3>
                <div className="git-link"><a href={data.client_libs.comp2.link.href} target="_blank">{data.client_libs.comp2.link.name}</a></div>
              </div>
              <div className="comp-i-cntr">
                <p>{data.client_libs.comp2.para1}</p>
                <p>{data.client_libs.comp2.para2}</p>
                <p>{data.client_libs.comp2.para3}</p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.client_libs.comp3.name}</h3>
                <div className="git-link"><a href={data.client_libs.comp3.link.href} target="_blank">{data.client_libs.comp3.link.name}</a></div>
              </div>
              <div className="comp-i-cntr">
                <p>{data.client_libs.comp3.para}</p>
                <p>{data.client_libs.comp3.para2}</p>
              </div>
            </div>
		</div>
		<div className="content-comp">
		  <h2>{data.network_libs.title}</h2>
		  <p>
			{data.network_libs.para}
		  </p>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.network_libs.comp4.name}</h3>
                <div className="git-link"><a href={data.network_libs.comp4.link.href} target="_blank">{data.network_libs.comp4.link.name}</a></div>
              </div>
              <div className="comp-i-cntr">
                <p>{data.network_libs.comp4.para1}</p>
                <p>{data.network_libs.comp4.para2}</p>
              </div>
            </div>
            <div className="comp-i">
              <div className="comp-i-head">
                <h3>{data.network_libs.comp5.name}</h3>
                <div className="git-link"><a href={data.network_libs.comp5.link.href} target="_blank">{data.network_libs.comp5.link.name}</a></div>
              </div>
              <div className="comp-i-cntr">
                <p>{data.network_libs.comp5.para}</p>
              </div>
            </div>
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
              </div>
            </div>
          </div>

          <div className="patents">
            <div className="patents-b">
              <h3>{data.patents.title}</h3>
              <div className="patents-cntr">
                <div className="patent-i"><a href={data.patents.patent1.href} target="_blank">{data.patents.patent1.name}</a></div>
                <div className="patent-i"><a href={data.patents.patent2.href} target="_blank">{data.patents.patent2.name}</a></div>
                <div className="patent-i"><a href={data.patents.patent3.href} target="_blank">{data.patents.patent3.name}</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouteData(({ data }) => (
  <CoreDeveloper data={data} />
))
