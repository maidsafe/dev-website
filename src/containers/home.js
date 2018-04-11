import React from 'react'
import { withSiteData, Link } from 'react-static'
//
// import logoImg from '../logo.png'

export default withSiteData(() => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Welcome to</h1>
    <Link to="/platform/nodejs/v0_4_1">Nodejs</Link>
  </div>
))
