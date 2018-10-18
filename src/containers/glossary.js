import React from 'react'
import { withRouteData } from 'react-static'
//
import Wrapper from './partials/wrapper';

class Glossary extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className="glossary">
        {/* Title and initial description */}
        <div className="content-comp">
          <div className="comp-i">

            {/* Glossary page title */}
            <div className="comp-i-head">
              <h1>{data.title.header}</h1>
            </div>

            {/* Repeating section for each entry */}
            <div className="comp-i-cntr">
            {
              data.items.map((key, i) => (
                <div key={`key-items-${i}`} className="items-i">
                  <p>
                    <div className="title"><h4>{key.name}</h4></div>
                    <div className="desc">{key.desc}</div>
                  </p>
                </div>
              ))
            }
            </div>

          </div>
        </div>
      </section>
    )
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Glossary,  data)
))
