import React from 'react'
import { withRouteData } from 'react-static'
//
import Wrapper from './partials/wrapper';

class Docs extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="docs">

        {/* Page header */}
        <div className="content-intro">
          <h1>{data.intro.title}</h1>
          <div className="comp-i-cntr">
            <p>{data.intro.para1}</p>
            <p>{data.intro.para2}</p>
          </div>
        </div>

        {/* To start with... */}
        <div className="content-comp">
          <div className="comp-i">
            <div className="comp-i-head">
              <h3>{data.start.title}</h3>
            </div>
            <div className="comp-i-cntr">
              <p>
                {data.start.para1.chunk1}
                <a href={data.start.para1.href1} target="_blank"> {data.start.para1.href1}</a>
                {data.start.para1.chunk2}
              </p>
              <p>
                {data.start.para2.chunk1}
                <a href={data.start.para2.href1} target="_blank"> {data.start.para2.href1}</a>
                {data.start.para2.chunk2}
                <a href={data.start.para2.href2} target="_blank"> {data.start.para2.href2}</a>
                {data.start.para2.chunk3}
              </p>
              <p>{data.start.para3}</p>
            </div>
          </div>
        </div>

        {/* The code... */}
        <div className="content-comp">
          <div className="comp-i">
            <div className="comp-i-head">
              <h3>{data.code.title}</h3>
            </div>
            <div className="comp-i-cntr">
              <p>
                {data.code.para1.chunk1}
                <a href={data.code.para1.href1} target="_blank"> {data.code.para1.href1}</a>
              </p>
              <p>
                {data.code.para2.chunk1}
                <a href={data.code.para2.href1} target="_blank"> {data.code.para2.href1}</a>
                {data.code.para2.chunk2}
              </p>
            </div>
          </div>
        </div>

        {/* Repeating section for each API document item */}
        <div className="content-comp">
          <div className="comp-i">

            <div className="comp-i-head"> <h3>{data.api_title}</h3> </div>

            <div className="comp-i-cntr"> {
              data.api_items.map((key, i) => (
                <div key={`key-items-${i}`} className="api_items-i">
                  <p>
                  <a href={key.href}> {key.name}</a>
                  </p>
                </div>
              )) }
            </div>

          </div>
        </div>

        {/* Repeating section for each additional API document item */}
        <div className="content-comp">
          <div className="comp-i">
            <div className="comp-i-head"> <h3>{data.oth_title}</h3> </div>

            <div className="comp-i-cntr"> {
              data.oth_items.map((key, i) => (
                <div key={`key-items-${i}`} className="oth_items-i">
                  <p>
                  <a href={key.href}> {key.name}</a>
                  </p>
                </div>
              )) }
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
