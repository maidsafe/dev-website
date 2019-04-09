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

          {/* -------------------------------------------------------------- */}
          {/*   CORE TECHNOLOGY - PAGE HEADING                               */}
          {/* -------------------------------------------------------------- */}
          <div className="content-intro">
            <h1>{data.pageIntro.title}</h1>
            <p>{data.pageIntro.para1.chunk1}&nbsp;<a href={data.pageIntro.para1.link.href}>{data.pageIntro.para1.link.name}</a>&nbsp;{data.pageIntro.para1.chunk2}</p>
            <div className="med"><img src={NetworkLayers} alt="Network layer" /></div>

            {/* ------------------------------------------------------------ */}
            {/* CLICKABLE NETWORK GRAPHUC MENU - NOT LIVE YET                */}
            {/* ------------------------------------------------------------ */}
{/*
            <div className="menugraphic">

              <div className="section layout2080">
                <div className="row lay-20">

                </div>
                <div className="lay-80">
                  <div className="clickable dapp">
                    Desktop, mobile, CLI apps
                  </div>
                  <div className="clickable wapp">
                    Web Apps
                  </div>
                </div>
              </div>
              <div className="section layout2080">
                <div className="row lay-20">
                </div>
                <div className="row lay-80">
                  <div className="clickable bindings">
                      Language bindings (Javascript, Java, C#)
                  </div>
                  <div className="clickable browser">
                      SAFE Browser & Authenticator plugin
                  </div>
                </div>
              </div>

              <div className="section layout2080">
                <div className="row lay-20">

                </div>
                <div className="lay-80">
                  <div className="clickable safe_app">
                    <a href={data.anchor.concat(data.components.c_libs.comp.safe_app.name.toLowerCase())}>{data.components.c_libs.comp.safe_app.name}</a>
                  </div>
                  <div className="clickable safe_auth">
                    <a href={data.anchor.concat(data.components.c_libs.comp.safe_auth.name.toLowerCase())}>{data.components.c_libs.comp.safe_auth.name}</a>
                  </div>
                </div>
              </div>

              <div className="section layout2080">
                <div className="row lay-20">
                  <h3>Application Layer</h3>
                </div>
                <div className="lay-80">
                  <div className="clickable safe_core">
                    <a href={data.anchor.concat(data.components.c_libs.comp.safe_core.name.toLowerCase())}>{data.components.c_libs.comp.safe_core.name}</a>
                  </div>
                  <div className="clickable vault">
                    <a href={data.anchor.concat(data.components.vault.name.toLowerCase())}>{data.components.vault.name}</a>
                  </div>
                </div>
              </div>

              <div className="section layout2080">
                <div className="row lay-20"><h3>Application Layer</h3></div>
                <div className="lay-80">
                  <div className="clickable routing">
                    <a href={data.anchor.concat(data.components.routing.name.toLowerCase())}>{data.components.routing.name}</a>
                  </div>
                </div>
              </div>

              <div className="section layout2080">
                <div className="row lay-20"/>
                <div className="lay-80">
                  <div className="clickable crusty">
                    <a href={data.anchor.concat(data.components.crust.name.toLowerCase())}>{data.components.crust.name}</a>
                  </div>
                </div>
              </div>

            </div>
*/}
          </div>

          {/* -------------------------------------------------------------- */}
          {/*   NETWORK LAYER - CRUST & ROUTING                              */}
          {/* -------------------------------------------------------------- */}
          <div className="content-comp">
            {/*<h1>{data.components.title}</h1>*/}

            {/* =========================== */}
            {/* ======    CRUST     ======= */}
            {/* =========================== */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.crust.name.toLowerCase()}>{data.components.crust.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.crust.para1.chunk1}
                  <a href={data.components.crust.para1.link1.href} target="_blank">{data.components.crust.para1.link1.name}</a>
                  {data.components.crust.para1.chunk2}
                  <a href={data.components.crust.para1.link2.href} target="_blank">{data.components.crust.para1.link2.name}</a>
                  {data.components.crust.para1.chunk3}
                  <a href={data.components.crust.para1.link3.href} target="_blank">{data.components.crust.para1.link3.name}</a>
                  {data.components.crust.para1.chunk4}
                  <a href={data.components.crust.para1.link4.href} target="_blank">{data.components.crust.para1.link4.name}</a>
                  {data.components.crust.para1.chunk5}
                </p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.crust.github} target="_blank"></a></div>
                <a href={data.components.crust.doc.href} target="_blank">
                  <img src={data.components.crust.doc.img}></img>
                </a>

                <a href={data.components.crust.crate.href} target="_blank">
                  <img src={data.components.crust.crate.img}></img>
                </a>
              </div>
            </div>

            {/* =========================== */}
            {/* ======    ROUTING    ====== */}
            {/* =========================== */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.routing.name.toLowerCase()}>{data.components.routing.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.routing.para1}
                </p>
                <p>
                  {data.components.routing.para2.chunk1}&nbsp;
                  <a href={data.components.routing.para2.link1.href} target="_blank">{data.components.routing.para2.link1.name}</a>
                  &nbsp;{data.components.routing.para2.chunk2}&nbsp;
                  <a href={data.components.routing.para2.link2.href} target="_blank">{data.components.routing.para2.link2.name}</a>
                  {data.components.routing.para2.chunk3}
                </p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.routing.github} target="_blank"></a></div>
                <a href={data.components.routing.doc.href} target="_blank">
                  <img src={data.components.routing.doc.img}></img>
                </a>

                <a href={data.components.routing.crate.href} target="_blank">
                  <img src={data.components.routing.crate.img}></img>
                </a>
              </div>
            </div>

            {/* === PARSEC === */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h3 id={data.components.routing.parsec.name.toLowerCase()}>{data.components.routing.parsec.name}</h3>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.routing.parsec.para1}
                </p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.routing.parsec.github} target="_blank"></a></div>
                <a href={data.components.routing.parsec.doc.href} target="_blank">
                  <img src={data.components.routing.parsec.doc.img}></img>
                </a>

                <a href={data.components.routing.parsec.crate.href} target="_blank">
                  <img src={data.components.routing.parsec.crate.img}></img>
                </a>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/*   APPLICATION LAYER - VAULTS                                 */}
            {/* ------------------------------------------------------------ */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.vault.name.toLowerCase()}>{data.components.vault.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>{data.components.vault.para1}</p>
                <p>{data.components.vault.para2}</p>
                <p>{data.components.vault.para5}</p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.vault.github} target="_blank"></a></div>
                <a href={data.components.vault.doc.href} target="_blank">
                  <img src={data.components.vault.doc.img}></img>
                </a>

                <a href={data.components.vault.crate.href} target="_blank">
                  <img src={data.components.vault.crate.img}></img>
                </a>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/*   SAFE CLIENT_LIBS SECTION                                   */}
            {/* ------------------------------------------------------------ */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1>{data.components.c_libs.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.c_libs.para1.chunk1}
                </p>
              </div>

              {/* =========================== */}
              {/* ===     Components      === */}
              {/* =========================== */}

              <div className="comp-i-head">
                <h3 id={data.components.c_libs.comp.name.toLowerCase()}>{data.components.c_libs.comp.name}</h3>
              </div>

              {/* === SAFE_Core === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.comp.safe_core.name.toLowerCase()}>{data.components.c_libs.comp.safe_core.name}</b>: {data.components.c_libs.comp.safe_core.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.comp.safe_core.github} target="_blank"></a></div>

                <a href={data.components.c_libs.comp.safe_core.doc.href} target="_blank">
                  <img src={data.components.c_libs.comp.safe_core.doc.img}></img>
                </a>

                <a href={data.components.c_libs.comp.safe_core.crate.href} target="_blank">
                  <img src={data.components.c_libs.comp.safe_core.crate.img}></img>
                </a>

              </div>

              {/* === SAFE_Authenticator === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.comp.safe_auth.name.toLowerCase()}>{data.components.c_libs.comp.safe_auth.name}</b>: {data.components.c_libs.comp.safe_auth.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.comp.safe_auth.github} target="_blank"></a></div>
                <a href={data.components.c_libs.comp.safe_auth.doc.href} target="_blank">
                  <img src={data.components.c_libs.comp.safe_auth.doc.img}></img>
                </a>
                <a id={data.components.c_libs.comp.safe_auth.name.toLowerCase()} href={data.components.c_libs.comp.safe_auth.crate.href} target="_blank">
                  <img src={data.components.c_libs.comp.safe_auth.crate.img}></img>
                </a>
              </div>

              {/* === SAFE_App === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.comp.safe_app.name.toLowerCase()}>{data.components.c_libs.comp.safe_app.name}</b>: {data.components.c_libs.comp.safe_app.para1.chunk1}
                <a href={data.components.c_libs.comp.safe_app.para1.link1.href} target="_self">{data.components.c_libs.comp.safe_app.para1.link1.name}</a>
                {data.components.c_libs.comp.safe_app.para1.chunk2}&nbsp;
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.comp.safe_app.github} target="_blank"></a></div>
                <a href={data.components.c_libs.comp.safe_app.doc.href} target="_blank">
                  <img src={data.components.c_libs.comp.safe_app.doc.img}></img>
                </a>
                <a href={data.components.c_libs.comp.safe_app.crate.href} target="_blank">
                  <img src={data.components.c_libs.comp.safe_app.crate.img}></img>
                </a>
              </div>

              {/* =========================== */}
              {/* === Auxiliary_libraries === */}
              {/* =========================== */}

              <div className="comp-i-head">
                <h3 id={data.components.c_libs.auxs.name.toLowerCase()}>{data.components.c_libs.auxs.name}</h3>
              </div>

              {/* === FFI_Utils === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.auxs.ffi.name.toLowerCase()}>{data.components.c_libs.auxs.ffi.name}</b>: {data.components.c_libs.auxs.ffi.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.auxs.ffi.github} target="_blank"></a></div>
                <a href={data.components.c_libs.auxs.ffi.doc.href} target="_blank">
                  <img src={data.components.c_libs.auxs.ffi.doc.img}></img>
                </a>
                <a href={data.components.c_libs.auxs.ffi.crate.href} target="_blank">
                  <img src={data.components.c_libs.auxs.ffi.crate.img}></img>
                </a>
              </div>

              {/* === SAFE_Bindgen === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.auxs.bindgen.name.toLowerCase()}>{data.components.c_libs.auxs.bindgen.name}</b>: {data.components.c_libs.auxs.bindgen.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.auxs.bindgen.github} target="_blank"></a></div>
                <a href={data.components.c_libs.auxs.bindgen.doc.href} target="_blank">
                  <img src={data.components.c_libs.auxs.bindgen.doc.img}></img>
                </a>
                <a href={data.components.c_libs.auxs.bindgen.crate.href} target="_blank">
                  <img src={data.components.c_libs.auxs.bindgen.crate.img}></img>
                </a>
              </div>

              {/* === System_URI === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.auxs.uri.name.toLowerCase()}>{data.components.c_libs.auxs.uri.name}</b>: {data.components.c_libs.auxs.uri.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.auxs.uri.github} target="_blank"></a></div>
                <a href={data.components.c_libs.auxs.uri.doc.href} target="_blank">
                  <img src={data.components.c_libs.auxs.uri.doc.img}></img>
                </a>
                <a href={data.components.c_libs.auxs.uri.crate.href} target="_blank">
                  <img src={data.components.c_libs.auxs.uri.crate.img}></img>
                </a>
              </div>

            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/*   UTILITIES SECTION                                            */}
          {/* -------------------------------------------------------------- */}
          <div className="content-comp">
            <h1>{data.util.title}</h1>

            {/* === Self-Encryption === */}
            <div className="comp-i">

              {/*<div className="comp-i-head">
                <h3 id={data.util.comp1.name.toLowerCase()}>{data.util.comp1.name}</h3>
              </div>*/}

              <div className="comp-i-cntr">
                  <b id={data.util.comp1.name.toLowerCase()}>{data.util.comp1.name}</b>:{data.util.comp1.para1.chunk1}&nbsp;
                  {data.util.comp1.para2.chunk1}&nbsp;
                  <a href={data.util.comp1.para2.link1.href} target="_blank">{data.util.comp1.para2.link1.name}</a>
                  &nbsp;{data.util.comp1.para2.chunk2}
              </div>
              <div className="comp-links">
                <p>
                  <div className="git-btn"><a href={data.util.comp1.git} target="_blank"></a></div>
                  <a href={data.util.comp1.doc.href} target="_blank">
                    <img src={data.util.comp1.doc.img}></img>
                  </a>

                  <a href={data.util.comp1.crate.href} target="_blank">
                    <img src={data.util.comp1.crate.img}></img>
                  </a>
                </p>
              </div>
            </div>

            {/* === Rust-Sodium === */}
            <div className="comp-i">
            {/*
              <div className="comp-i-head">
                <h3 id={data.util.comp2.name.toLowerCase()}>{data.util.comp2.name}</h3>
              </div>
              */}
              <div className="comp-i-cntr">
                <b id={data.util.comp2.name.toLowerCase()}>{data.util.comp2.name}</b>: {data.util.comp2.para1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.util.comp2.github} target="_blank"></a></div>
                <a href={data.util.comp2.doc.href} target="_blank">
                  <img src={data.util.comp2.doc.img}></img>
                </a>

                <a href={data.util.comp2.crate.href} target="_blank">
                  <img src={data.util.comp2.crate.img}></img>
                </a>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/*   RFCs SECTION                                                 */}
          {/* -------------------------------------------------------------- */}
          <div className="rfcs">
              <div className="rfcs-b">
                <h1 id={data.rfcs.title.toLowerCase()}>{data.rfcs.title}</h1>
                <p>
                  {data.rfcs.summary}
                </p>
                <div className="rfcs-cntr">
                  <div className="rfc-i">
                    <a href={data.rfcs.learn.href} target="_blank">
                      <span>{data.rfcs.learn.name}</span>
                    </a>
                  </div>
                  <div className="rfc-i">
                    <a href={data.rfcs.active.href} target="_blank">
                      <span>{data.rfcs.active.name}</span>
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
