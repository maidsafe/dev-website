import React from 'react'
import withTracker from './partials/withTracker';
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
  withTracker(NotFound)
);
