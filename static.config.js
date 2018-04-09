import axios from 'axios'
import fs from 'fs'
import marked from 'marked'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { markdown } from 'markdown'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const locales = fs.readdirSync('./src/locales')
    const i18nApiVersionRoutesArray = []
    locales.forEach(lang => {
      const platforms = fs.readdirSync(`./src/locales/${lang}/platforms`)
      platforms.forEach(platform => {
        const versions = fs.readdirSync(`./src/locales/${lang}/platforms/${platform}/versions`)
        versions.forEach(version => {
          let path = `/${lang}/api/${platform}/${version}`
          path = path.replace('.md', '')
          i18nApiVersionRoutesArray.push({
            path,
            component: 'src/containers/Markdown',
            getData: () => ({
              markdown: markdown.toHTML(fs.readFileSync(`./src/locales/${lang}/platforms/${platform}/versions/${version}`, 'utf-8')),
            }),
          })
        })
      })
    })

    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ].concat(locales.map(lang => ({
      path: `/${lang}/node-js-api-tut`,
      component: 'src/containers/Markdown',
      getData: () => ({
        markdown: markdown.toHTML(fs.readFileSync(`./src/locales/${lang}/site_content/safe_desktop_app_tutorial.md`, 'utf-8')),
      }),
    })))
      .concat(i18nApiVersionRoutesArray)
  },
  webpack: (config, { defaultLoaders, stage }) => {
    const renderer = new marked.Renderer()

    config.module.rules = [
      {
        oneOf: [
          // TODO: Possibly conflicting with default loader. Research
          // {
          //   test: /\.(jpe?g|png|gif|svg)$/i,
          //   use: [
          //     'url-loader?limit=10000',
          //     'img-loader',
          //   ],
          // },
          {
            test: /\.md$/,
            use: [{
              loader: 'html-loader',
            }, {
              loader: 'markdown-loader',
              options: {
                renderer,
              },
            }],
          },
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
                      options: { includePaths: ['src/scss'] },
                    },
                  ],
                }),
          },
          {
            test: /\.json$/,
            use: [{ loader: 'json-loader' }],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}
