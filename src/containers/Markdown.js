import React from 'react'
import { withRouteData } from 'react-static'
//

export default withRouteData(({ markdown }) => (
  <div dangerouslySetInnerHTML={{ __html: markdown }} />
))
