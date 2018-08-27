import React from 'react'
import Wrapper from './partials/wrapper';
//
class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>404 - Oh no's! We couldn't find that page :(</h1>
      </div>
    );
  }
}

export default () => (
  Wrapper(NotFound)
);
