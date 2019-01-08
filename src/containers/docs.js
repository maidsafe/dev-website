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

            {/* NodeJS heading */}
            <h1>{data.nodejs.title}</h1>
            <p>{data.nodejs.para1.chunk1}</p>

            <h3>{data.nodejs.tutorials.title}</h3>
            {/* Tutorial documentation */}
            <div className="tutorials">
              <div className="tutorial">
                <a href={data.nodejs.tutorials.nodejs.href}>
                  <div className={`icn ${data.nodejs.tutorials.nodejs.icon}`}></div>
                  <div className="name">{data.nodejs.tutorials.nodejs.name}</div>
                </a>
              </div>
              <div className="tutorial">
                <a href={data.nodejs.tutorials.web.href}>
                  <div className={`icn ${data.nodejs.tutorials.web.icon}`}></div>
                  <div className="name">{data.nodejs.tutorials.web.name}</div>
                </a>
              </div>
            </div>

            {/* API documentation items */}
            <h3>{data.nodejs.api.title}</h3>
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

        </div>

        {/* Platform development - Java API */}

        <div className="java">
          <div className="java-b">


            <h1>{data.java.title}</h1>
            <p>{data.java.para1.chunk1}</p>

            <h3>{data.java.tutorial.title}</h3>

            <div className="tutorials">
              <div className="tutorial">
                <a href={data.java.tutorial.href}>
                  <div className={`icn ${data.java.tutorial.icon}`}></div>
                  <div className="name">{data.java.tutorial.name}</div>
                </a>
              </div>
            </div>

            <h3>{data.java.api.title}</h3>
            <div className="java-cntr"> {

              data.java.items.map((key, i) => (
                <div key={`key-items-${i}`} className="java-i">
                  <p>
                  <a href={key.href}> {key.name}</a>
                  </p>
                </div>
              )) }
            </div>
          </div>
        </div>

        {/* Platform development - C# .net API */}
        {/*
        <div className="csharp">
          <div className="csharp-b">

          {/* C-sharp heading
          <h1>{data.csharp.title}</h1>
          <p>{data.csharp.para1.chunk1}</p>

            <h3>{data.csharp.api.title}</h3>
            <div className="csharp-cntr"> {

              data.csharp.items.map((key, i) => (
                <div key={`key-items-${i}`} className="csharp-i">
                  <p>
                  <a href={key.href}> {key.name}</a>
                  </p>
                </div>
              )) }
            </div>


          </div>
        </div>
*/}




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
