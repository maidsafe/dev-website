// Copyright 2020 MaidSafe.net limited.
//
// This SAFE Network Software is licensed to you under the MIT license <LICENSE-MIT
// http://opensource.org/licenses/MIT> or the Modified BSD license <LICENSE-BSD
// https://opensource.org/licenses/BSD-3-Clause>, at your option. This file may not be copied,
// modified, or distributed except according to those terms. Please review the Licences for the
// specific language governing permissions and limitations relating to use of the SAFE Network
// Software.

import React from 'react'
//
import routes from './routes';

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => routes,
  plugins: ['react-static-plugin-react-router', 'react-static-plugin-sass', 'ie11-polyfills-plugin'],
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="keywords" content="DevHub, MaidSafe, Safe, Safe Network, Autonomous, Developer, Decentralised, Safe Coin, Distributed Platform" />
        <link rel="shortcut icon" type="image/icon" href="/images/favicon.ico" />
        <title>SAFE Network - DevHub</title>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  babelExcludes: [/core-js/]
}
