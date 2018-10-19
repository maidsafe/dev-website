import React from 'react'
import { withRouteData } from 'react-static'
//
import Wrapper from './partials/wrapper';
import ContribImg from '../../public/images/get_involved.png';

class Crust extends React.Component {
  render() {
    const { data } = this.props;

    return (

    <section className="crust">

      {/* Title and initial description */}
      <div className="content-intro">

        {/* Page Header */}
        <h1>{data.title}</h1>

        {/* introduction text */}
        <div className="comp-i">
          <p>
            <div className="comp-i-cntr">
              {data.intro.para.chunk1}
            </div>
          </p>

          {/* ---------- feature bullets ---------- */}
          <p> {/* multi-protocol */}
            &nbsp;&#9679;&nbsp;
            <b><a href={data.features.f1.href}>&nbsp;&nbsp;
            {data.intro.bullet1.name}</a></b> : {data.intro.bullet1.summary}
          </p>
          <p> {/* secure serialisation */}
            &nbsp;&#9679;&nbsp;
            <b><a href={data.features.f2.href}>&nbsp;&nbsp;
            {data.intro.bullet2.name}</a></b> : {data.intro.bullet2.summary}
          </p>
          <p> {/* bootstrap cache */}
            &nbsp;&#9679;&nbsp;
            <b><a href={data.features.f3href}>&nbsp;&nbsp;
            {data.intro.bullet3.name}</a></b> : {data.intro.bullet3.summary}
          </p>

        </div>
      </div>

      {/* ---------- Overview ---------- */}
      <div className="content-comp">
        <div className="comp-i">

          <div className="comp-i-head">
            <h3>{data.overview.title}</h3>
          </div>

          <div className="comp-i-cntr">
            <p>
              {data.overview.para.chunk1}
              <a href={data.overview.para.link1.href} target="_blank">{data.overview.para.link1.name}</a>
              {data.overview.para.chunk2}
              <a href={data.overview.para.link2.href} target="_blank">{data.overview.para.link2.name}</a>
              {data.overview.para.chunk3}
              <a href={data.overview.para.link3.href} target="_blank">{data.overview.para.link3.name}</a>
              {data.overview.para.chunk4}
              <a href={data.overview.para.link4.href} target="_blank">{data.overview.para.link4.name}</a>
              {data.overview.para.chunk5}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Features of Crust ---------- */}
      <div className="content-comp">
        <a name={data.features.anchor}></a>
        <div className="comp-i">

          {/* Upcoming features of Crust */}
          <div className="comp-i-head">
            <h3>{data.features.title}</h3>
          </div>

          <div className="comp-i-cntr">

            {/* Feature 1: Multi-protocol */}
            <a name={data.features.f1.anchor}></a>
            <p>
              &nbsp;&#9679;&nbsp;
              <b>{data.features.f1.name}</b>:&nbsp;
              {data.features.f1.summary}
            </p>

            {/* Feature 2: Secure serialisation */}
            <a name={data.features.f2.anchor}></a>
            <p>
              &nbsp;&#9679;&nbsp;
              <b>{data.features.f2.name}</b>:&nbsp;
              {data.features.f2.summary}
            </p>


            {/* Feature 3: Bootstrap cache */}
            <a name={data.features.f3.anchor}></a>
            <p>
              &nbsp;&#9679;&nbsp;
              <b>{data.features.f3.name}</b>:&nbsp;
              {data.features.f3.summary}
            </p>

          </div>
        </div>
      </div>

      {/* ---------- License  ---------- */}
      <div className="content-comp">
        <a name={data.license.anchor}></a>
        <div className="comp-i">

          {/* License Header */}
          <div className="comp-i-head">
            <h3>{data.license.title}</h3>
          </div>

          {/* License text */}
          <div className="comp-i">
            <div className="comp-i-cntr">
              <p>
                {data.license.chunk1}
                <a href={data.license.link1.href} target="_blank"> {data.license.link1.name}</a>
                {data.license.chunk2}
                <a href={data.license.link2.href} target="_blank"> {data.license.link2.name}</a>
                {data.license.chunk3}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Contribution  ---------- */}
      <div className="content-comp">
        <a name={data.contrib.anchor}></a>
        <div className="comp-i">

          {/* License Header */}
          <div className="comp-i-head">
            <h3>{data.contrib.title}</h3>
          </div>

          {/* License text */}
          <div className="comp-i">
            <div className="comp-i-cntr">
              <p>
                {data.contrib.para.chunk1}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Get Involved ---------- */}
      <div className="content-comp">
        <a name={data.action.anchor}></a>
        <div className="comp-i">

          {/* Title */}
          <div className="comp-i-head">
            <h3>{data.action.title}</h3>
          </div>

          {/* Image */}
          <div className="comp-i-cntr img">
            <img src={ContribImg} alt="Get Involved"/>
          </div>

          {/* Calls to action */}
          <div className="getinv">
            {/* GitHub Repository */}
            <p>
              <a href={data.action.a1.link.href} target="_blank"> {data.action.a1.link.name}</a>
            </p>

            {/* Crust Test Programme */}
            {/* ==================== */}
            {/* Comment out if not live! */}
            {/*
            <p>
              <a href={data.action.a2.link.href} target="_blank"> {data.action.a2.link.name}</a>
            </p>
            */}
          </div>
        </div>
      </div>

      </section>
    )
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Crust,  data)
))
