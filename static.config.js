import React from 'react'
import axios from 'axios'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
//
import routes from './routes';

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => routes,
  webpack: (config, { defaultLoaders, stage }) => {
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use:
              stage === 'dev'
                ? [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
                : ExtractTextPlugin.extract({
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: false,
                      },
                    },
                    {
                      loader: 'sass-loader',
                      options: { includePaths: ['src/'] },
                    },
                  ],
                }),
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
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
}
