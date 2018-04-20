import React from 'react'
import { withRouteData } from 'react-static'
//
import CONST from '../constants';

class Licensing extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="licensing">
        <div className="licensing-b base">
          <div className="lic-content">
            <h3 className="page-title">{data.intro.title}</h3>
            <p>{data.intro.para1}</p>
            <ul className="list">
              {data.intro.list.map((li, i) => (
                <li key={`intro-list=${i}`} className="ls-i">{li}</li>
              ))}
            </ul>
            <p>{data.intro.para2}</p>
            <p>{data.intro.para3.chunk1}&nbsp;<a target="_blank" href={data.intro.para3.link.href}>{data.intro.para3.link.name}</a>{data.intro.para3.chunk2}</p>
          </div>
          <div className="lic-content">
            <h3 className="sub-title">Use of APIs</h3>
            <p>{data.useOfApi.para}</p>
            <ul className="list">
              {
                data.useOfApi.list.map((li, i) => (
                  <li key={`useapi-list-${i}`} className="ls-i"><a href={li.href} target="_blank">{li.name}</a></li>
                ))
              }
            </ul>
          </div>
          <div className="lic-content">
            <h3 className="sub-title">{data.linking.title}</h3>
            <p>{data.linking.para1}</p>
            <p>{data.linking.para2}</p>
          </div>
          <div className="lic-content">
            <h3 className="sub-title">{data.coreContributions.title}</h3>
            <p>{data.coreContributions.para1}</p>
            <p>{data.coreContributions.para2.chunk1}&nbsp;<a href={data.coreContributions.para2.link.href} target="_blank">{data.coreContributions.para2.link.name}</a></p>
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
  <Licensing data={data} />
));
