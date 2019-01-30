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
        <div className="docs-intro">

          <h1>{data.title}</h1>

          <div className="docs-intro-b">

              <p>
                {data.intro.para1.chunk1}
                <a href={data.intro.para1.link.href} target="_blank"> {data.intro.para1.link.name}</a>
                {data.intro.para1.chunk2}
              </p>

              <p>
                {data.intro.para2.chunk1}
                <a href={data.intro.para2.link1.href} target="_blank"> {data.intro.para2.link1.name}</a>
                {data.intro.para2.chunk2}
                <a href={data.intro.para2.link2.href} target="_blank"> {data.intro.para2.link2.name}</a>
                {data.intro.para2.chunk3}
              </p>

              <p>
                {data.intro.para3.chunk1}
                <a href={data.intro.para3.link.href} target="_blank"> {data.intro.para3.link.name}</a>
                {data.intro.para3.chunk2}
              </p>
          </div>
        </div>

        {/* Platform development - NodeJS API */}

        <div className="nodejs platform">
          {/* NodeJS heading */}
          <div className="platform-b">
            <h1>{data.nodejs.title}</h1>
            <p>{data.nodejs.para1.chunk1}</p>
          </div>

          <div className="platform-b layout4060">

            <div className="lay-40">
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
            </div>

            <div className="lay-60">
              {/* API documentation items */}
              <h4>{data.nodejs.api.title}</h4>
              <div className="platform-api"> {

                data.nodejs.items.map((key, i) => (
                  <div key={`key-items-${i}`} className="platform-i">
                    <p>
                    <a href={key.href}> {key.name}</a>
                    </p>
                  </div>
                )) }
              </div>
            </div>

          </div>

        </div>

        {/* Platform development - Java API */}

        <div className="java platform">

          <div className="platform-b">
            <h1>{data.java.title}</h1>
            <p>{data.java.para1.chunk1}</p>
          </div>
          <div className="platform-b layout4060">
            <div className="lay-40">
              <h3>{data.java.tutorial.title}</h3>

              <div className="tutorials">
                <div className="tutorial">
                  <a href={data.java.tutorial.href}>
                    <div className={`icn ${data.java.tutorial.icon}`}></div>
                    <div className="name">{data.java.tutorial.name}</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="lay-60">
              <h4>{data.java.api.title}</h4>
              <div className="platform-api"> {

                data.java.items.map((key, i) => (
                  <div key={`key-items-${i}`} className="platform-i">
                    <p>
                    <a href={key.href}> {key.name}</a>
                    </p>
                  </div>
                )) }
              </div>
            </div>
          </div>
        </div>

        {/* Platform development - C# .net API */}
        <div className="dotnet platform">

          <div className="platform-b">
            <h1>{data.dotnet.title}</h1>
            <p>{data.dotnet.para1.chunk1}</p>
          </div>

          <div className="platform-b layout4060">

            <div className="lay-40">

              <h3>{data.dotnet.tutorials.title}</h3>

              <div className="tutorials">

                <div className="tutorial">
                  <a href={data.dotnet.tutorials.desktop.href}>
                    <div className={`icn ${data.dotnet.tutorials.desktop.icon}`}></div>
                    <div className="name">{data.dotnet.tutorials.desktop.name}</div>
                  </a>
                </div>

                <div className="tutorial">
                  <a href={data.dotnet.tutorials.mobile.href}>
                    <div className={`icn ${data.dotnet.tutorials.mobile.icon}`}></div>
                    <div className="name">{data.dotnet.tutorials.mobile.name}</div>
                  </a>
                </div>

              </div>
            </div>

            <div className="lay-60">
              <h4>{data.dotnet.api.title}</h4>
              <div className="platform-api"> {

                data.dotnet.items.map((key, i) => (
                  <div key={`key-items-${i}`} className="platform-i">
                    <p><a href={key.href}> {key.name}</a></p>
                  </div>
                )) }
              </div>
            </div>
          </div>
        </div>


        {/* Core libraries - Rust */}
        <div className="rust">
          <div className="rust-b">

            <h1>{data.rust.title}</h1>

            <div className="rust-cntr">
              <p>
                {data.rust.para1.chunk1}
                <a href={data.rust.para1.link.href} target="_blank"> {data.rust.para1.link.name}</a>
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

            <h1>{data.other.title}</h1>
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
