import React from 'react';

export default function wrapper(Comp, data = {}, options = {}) {
  class HOC extends React.Component {
    render() {
      return <Comp data={data} {...this.props} />;
    }
  };

  return <HOC />;
}
