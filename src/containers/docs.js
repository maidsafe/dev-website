import React from 'react'
import { withRouteData } from 'react-static'
//
import Wrapper from './partials/wrapper';

class Docs extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="docs">

        {/* Page header - Introduction */}
        <div className="content-intro">
          <h1>{data.intro.title}</h1>
          <div className="comp-i-cntr">
            <p>
              {data.intro.para1.chunk1}
              <a href={data.intro.para1.href1} target="_blank"> {data.intro.para1.href1}</a>
              {data.intro.para1.chunk2}
            </p>

            <p>
              {data.intro.para2.chunk1}
              <a href={data.intro.para2.href1} target="_blank"> {data.intro.para2.href1}</a>
              {data.intro.para2.chunk2}
              <a href={data.intro.para2.href2} target="_blank"> {data.intro.para2.href2}</a>
              {data.intro.para2.chunk3}
            </p>

            <p>
              {data.intro.para3.chunk1}
              <a href={data.intro.para3.href1} target="_blank"> {data.intro.para3.href1}</a>
              {data.intro.para3.chunk2}
            </p>

          </div>
        </div>


        {/* Platform development - NodeJS API */}

        <div className="nodejs">
          <div className="nodejs-b">

            <h3>{data.nodejs.title}</h3>

            <div className="nodejs-cntr"> {

              data.nodejs.items.map((key, i) => (
                <div key={`key-items-${i}`} className="nodejs-i">
                  <p>
                  <a href={key.href}> {key.name}</a>
                  </p>
                </div>
              )) }
            </div>

          </div>

          <div className="tutorial">
            <a href={data.nodejs.tutorial.href}>
              <div className={`icn ${data.nodejs.tutorial.icon}`}></div>
              <div className="name">{data.nodejs.tutorial.name}</div>
            </a>
          </div>
          <div className="tutorial">
            <a href={data.nodejs.tutorial.href}>
              <div className={`icn ${data.nodejs.tutorial.icon}`}></div>
              <div className="name">{data.nodejs.tutorial.name}</div>
            </a>
          </div>
          <div className="tutorial">
            <a href={data.nodejs.web_tut.href}>
              <div className={`icn ${data.nodejs.web_tut.icon}`}></div>
              <div className="name">{data.nodejs.web_tut.name}</div>
            </a>
          </div>

        </div>

        {/* Platform development - C# .net API */}

        <div className="csharp">
          <div className="csharp-b">

            <h3>{data.csharp.title}</h3>

            <div className="csharp-cntr"> {

              data.csharp.items.map((key, i) => (
                <div key={`key-items-${i}`} className="csharp-i">
                  <p>
                  <a href={key.href}> {key.name}</a>
                  </p>
                </div>
              )) }
            </div>


            <div className="tutorial-link">
              <a href={data.nodejs.tutorial.href}>
                <div className={`icn ${data.nodejs.tutorial.icon}`}></div>
                <div className="name">{data.nodejs.tutorial.name}</div>
              </a>
            </div>

          </div>
        </div>

        {/* Core libraries - Rust */}
        <div className="rust">
          <div className="rust-b">

            <h3>{data.rust.title}</h3>

            <div className="rust-cntr">
              <p>
                {data.rust.para1.chunk1}
                <a href={data.rust.para1.href1} target="_blank"> {data.rust.para1.href1}</a>
                {data.rust.para1.chunk2}
              </p>
            </div>

            <div className="rust-cntr"> {
              data.rust.items.map((key, i) => (
                <div key={`key-items-${i}`} className="rust-i">
                  <p>
                  <a href={key.href}> {key.name}</a>
                  </p>
                </div>
              )) }
            </div>
          </div>
        </div>

        {/* Core libraries - Rust */}
        <div className="other">
          <div className="other-b">

            <h3>{data.other.title}</h3>
{/*}
            <div className="other-cntr">
              <p>
                {data.other.para1.chunk1}
                <a href={data.other.para1.href1} target="_blank"> {data.other.para1.href1}</a>
                {data.other.para1.chunk2}
              </p>
            </div>
*/}
            <div className="other-cntr"> {
              data.other.items.map((key, i) => (
                <div key={`key-items-${i}`} className="other-i">
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
