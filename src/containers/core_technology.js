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
import { HashLink as Link } from 'react-router-hash-link'
//
import Wrapper from './partials/wrapper';
import NetworkLayers from '../../public/images/network_layer.svg';
import CratesLogo from '../../public/images/crates_logo.png'
import DocsLogo from '../../public/images/docs_logo.png'

// Technology Stack (Network Layer) images
import StackLyrNet from '../../public/images/tech_stack/layer_net.png';
import StackLyrApp from '../../public/images/tech_stack/layer_app.png';
import StackClientLibs from '../../public/images/tech_stack/client_libs.png';

// import { animateScroll as scroll } from 'react-scroll';

class CoreDeveloper extends React.Component {

  constructor() {
    super();
    // window.addEventListener("hashchange", this.hashChange);
    // window.addEventListener("load", this.hashChange);
  }

  // Try to correct the scroll issue by rolling back a bit
  // hashChange() {
  //   if (typeof window !== 'undefined') {
  //     setTimeout(() => {
  //       const targetHash = window.location.hash.split('#').pop();
  //       if (!targetHash) {
  //         return;
  //       }
  //       const targetEle = document.getElementById(targetHash);
  //       scroll.scrollTo(targetEle.offsetTop - 100)
  //     }, 100);
  //   }
  // }

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
            <p>{data.pageIntro.para1.chunk1}&nbsp;<Link to={data.pageIntro.para1.link.href}>{data.pageIntro.para1.link.name}</Link>&nbsp;{data.pageIntro.para1.chunk2}</p>

            {/* ------------------------------------------------------------ */}
            {/* CLICKABLE NETWORK GRAPHUC MENU - NOT LIVE YET                */}
            {/* ------------------------------------------------------------ */}
            <div className="menugraphic">

              <div className="section hlayout_2080">

                {/* LEFT SIDE - Image */}
                <div className="hlay-20">
                  <div className="application-layer-img">
                    <img src={StackLyrApp} alt="Network layer" height="100%"/>
                  </div>
                </div>

                {/* RIGHT SIDE - boxes */}
                <div className="hlay-80">
                  <div className="section hlayout-65-10-25">
                    <div className="hlay-65">

                      <div className="section hlayout_5050">
                        <div className="hlay-50">
                          <div className="clickable dapp">
                            <Link to={data.components.app_layer.dapp.href}>
                              {data.components.app_layer.dapp.name}
                            </Link>
                          </div>
                          <div className="underline dapp"/>
                        </div>
                        <div className="hlay-50">
                          <div className="clickable wapp">
                            <Link to={data.components.app_layer.wapp.href}>
                              {data.components.app_layer.wapp.name}
                            </Link>
                          </div>
                          <div className="underline wapp"/>
                        </div>
                      </div>

                      <div className="section hlayout_5050">
                        <div className="hlay-50">
                          <div className="clickable bindings">
                            <a href={data.components.app_layer.bindings.github}>
                              {data.components.app_layer.bindings.name}
                            </a>
                          </div>
                          <div className="underline bindings"/>
                        </div>
                        <div className="hlay-50">
                          <div className="clickable browser">
                            <a href={data.components.app_layer.browser.github}>
                              {data.components.app_layer.browser.name}
                            </a>
                          </div>
                          <div className="underline browser"/>
                        </div>
                      </div>

                      <div className="section hlayout_4060">
                        <div className="hlay-60">
                          <div className="clickable safe_app">
                            <Link smooth to={data.anchor.concat(data.components.c_libs.comp.safe_app.anchor)}>{data.components.c_libs.comp.safe_app.name}</Link>
                          </div>
                          <div className="underline safe_app"/>
                        </div>
                        <div className="hlay-40">
                          <div className="clickable safe_auth">
                            <Link smooth to={data.anchor.concat(data.components.c_libs.comp.safe_auth.anchor)}>{data.components.c_libs.comp.safe_auth.name}</Link>
                          </div>
                          <div className="underline safe_auth"/>
                        </div>
                      </div>

                      <div className="section">
                        <div className="clickable safe_core">
                          <Link smooth to={data.anchor.concat(data.components.c_libs.comp.safe_core.anchor)}>{data.components.c_libs.comp.safe_core.name}</Link>
                        </div>
                        <div className="underline safe_core"/>
                      </div>
                    </div>
                    <div className="hlay-10">
                      <div className="client-libs-img">
                        <Link smooth to={data.anchor.concat(data.components.c_libs.anchor)}>
                          <img src={StackClientLibs} alt="Client Libs" height="100%"/>
                        </Link>
                      </div>
                    </div>
                    <div className="hlay-25">
                      <div className="clickable vault">
                        <Link smooth to={data.anchor.concat(data.components.vault.anchor)}>{data.components.vault.name}</Link>
                      </div>
                      <div className="underline vault"/>
                    </div>
                  </div>
                </div>

              </div>

              <div className="section hlayout_2080">
                <div className="hlay-20">
                  <div className="network-layer-img">
                    <img src={StackLyrNet} alt="Network layer" height="100%"/>
                  </div>
                </div>
                <div className="hlay-80">
                  <div className="section">
                    <div className="clickable routing">
                      <Link smooth to={data.anchor.concat(data.components.routing.anchor)}>{data.components.routing.name}</Link>
                    </div>
                    <div className="underline routing"/>
                  </div>
                  <div className="section">
                    <div className="clickable quic-p2p">
                      <Link smooth to={data.anchor.concat(data.components.quic_p2p.anchor)}>{data.components.quic_p2p.name}</Link>
                    </div>
                    <div className="underline quic-p2p"/>
                  </div>
                </div>
              </div>
            </div>
            {/* Remove static image
            <div className="med"><img src={NetworkLayers} alt="Network layer" /></div>
            */}
          </div>

          {/* -------------------------------------------------------------- */}
          {/*   NETWORK LAYER - quic-p2p & ROUTING                           */}
          {/* -------------------------------------------------------------- */}
          <div className="content-comp">
            {/*<h1>{data.components.title}</h1>*/}

            {/* =========================== */}
            {/* ======   quic-p2p   ======= */}
            {/* =========================== */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.quic_p2p.anchor}>{data.components.quic_p2p.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.quic_p2p.para1}
                </p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.quic_p2p.github} target="_blank"></a></div>
                <a href={data.components.quic_p2p.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.components.quic_p2p.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>
            </div>

            {/* =========================== */}
            {/* ======    ROUTING    ====== */}
            {/* =========================== */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.routing.anchor}>{data.components.routing.name}</h1>
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
                <a href={data.components.routing.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.components.routing.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>
            </div>

            {/* === PARSEC === */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.routing.parsec.anchor}>{data.components.routing.parsec.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.routing.parsec.para1}
                </p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.routing.parsec.github} target="_blank"></a></div>
                <a href={data.components.routing.parsec.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.components.routing.parsec.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/*   APPLICATION LAYER - VAULTS                                 */}
            {/* ------------------------------------------------------------ */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.vault.anchor}>{data.components.vault.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>{data.components.vault.para1}</p>
                <p>{data.components.vault.para2}</p>
                <p>{data.components.vault.para5}</p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.vault.github} target="_blank"></a></div>
                <a href={data.components.vault.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.components.vault.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/*   SAFE CLIENT_LIBS SECTION                                   */}
            {/* ------------------------------------------------------------ */}
            <div className="comp-i">
              <div className="comp-i-head">
                <h1 id={data.components.c_libs.anchor}>{data.components.c_libs.name}</h1>
              </div>
              <div className="comp-i-cntr">
                <p>
                  {data.components.c_libs.para1.chunk1}
                </p>
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.github} target="_blank"></a></div>
              </div>

              {/* =========================== */}
              {/* ===     Components      === */}
              {/* =========================== */}

              <div className="comp-i-head">
                <h3 id={data.components.c_libs.comp.anchor}>{data.components.c_libs.comp.name}</h3>
              </div>

              {/* === SAFE_Core === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.comp.safe_core.anchor}>{data.components.c_libs.comp.safe_core.name}</b>: {data.components.c_libs.comp.safe_core.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.comp.safe_core.github} target="_blank"></a></div>
                <a href={data.components.c_libs.comp.safe_core.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.components.c_libs.comp.safe_core.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>

              {/* === SAFE_Authenticator === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.comp.safe_auth.anchor}>{data.components.c_libs.comp.safe_auth.name}</b>: {data.components.c_libs.comp.safe_auth.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.comp.safe_auth.github} target="_blank"></a></div>
                <a href={data.components.c_libs.comp.safe_auth.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a id={data.components.c_libs.comp.safe_auth.anchor} href={data.components.c_libs.comp.safe_auth.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>

              {/* === SAFE_App === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.comp.safe_app.anchor}>{data.components.c_libs.comp.safe_app.name}</b>: {data.components.c_libs.comp.safe_app.para1.chunk1}
                <a href={data.components.c_libs.comp.safe_app.para1.link1.href} target="_self">{data.components.c_libs.comp.safe_app.para1.link1.name}</a>
                {data.components.c_libs.comp.safe_app.para1.chunk2}&nbsp;
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.comp.safe_app.github} target="_blank"></a></div>
                <a href={data.components.c_libs.comp.safe_app.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.components.c_libs.comp.safe_app.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>

              {/* =========================== */}
              {/* === Auxiliary_libraries === */}
              {/* =========================== */}

              <div className="comp-i-head">
                <h3 id={data.components.c_libs.auxs.anchor}>{data.components.c_libs.auxs.name}</h3>
              </div>

              {/* === FFI_Utils === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.auxs.ffi.anchor}>{data.components.c_libs.auxs.ffi.name}</b>: {data.components.c_libs.auxs.ffi.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.auxs.ffi.github} target="_blank"></a></div>
                <a href={data.components.c_libs.auxs.ffi.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.components.c_libs.auxs.ffi.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>

              {/* === SAFE_Bindgen === */}
              <div className="comp-i-cntr">
                <b id={data.components.c_libs.auxs.bindgen.anchor}>{data.components.c_libs.auxs.bindgen.name}</b>: {data.components.c_libs.auxs.bindgen.para1.chunk1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.components.c_libs.auxs.bindgen.github} target="_blank"></a></div>
                <a href={data.components.c_libs.auxs.bindgen.doc.href} target="_blank">
                  <img src={DocsLogo}></img>
                </a>
                <a href={data.components.c_libs.auxs.bindgen.crate.href} target="_blank">
                  <img src={CratesLogo}></img>
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
                  <b id={data.util.comp1.anchor}>{data.util.comp1.name}</b>:{data.util.comp1.para1.chunk1}&nbsp;
                  {data.util.comp1.para2.chunk1}&nbsp;
                  <a href={data.util.comp1.para2.link1.href} target="_blank">{data.util.comp1.para2.link1.name}</a>
                  &nbsp;{data.util.comp1.para2.chunk2}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.util.comp1.github} target="_blank"></a></div>
                <a href={data.util.comp1.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.util.comp1.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>
            </div>

            {/* === safe-nd === */}
            <div className="comp-i">
            {/*
              <div className="comp-i-head">
                <h3 id={data.util.comp2.name.toLowerCase()}>{data.util.comp2.name}</h3>
              </div>
              */}
              <div className="comp-i-cntr">
                <b id={data.util.comp2.anchor}>{data.util.comp2.name}</b>: {data.util.comp2.para1}
              </div>
              <div className="comp-links">
                <div className="git-btn"><a href={data.util.comp2.github} target="_blank"></a></div>
                <a href={data.util.comp2.doc.href} target="_blank"><img src={DocsLogo}></img></a>
                <a href={data.util.comp2.crate.href} target="_blank"><img src={CratesLogo}></img></a>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/*   RFCs SECTION                                                 */}
          {/* -------------------------------------------------------------- */}
          <div className="rfcs">
              <div className="rfcs-b">
                <h1 id={data.rfcs.anchor}>{data.rfcs.title}</h1>
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
