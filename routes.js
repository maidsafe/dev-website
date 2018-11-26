import CONST from './src/constants';
import fs from 'fs';
import path from 'path';
//
import * as parser from './parser';
//

const CONTENT_DIR = path.resolve('src', 'contents');

const CONTENT_FILE = {
  HOME: 'home.yaml',
  START_DEV: 'start_developing.yaml',
  CORE_TECH: 'core_technology.yaml',
  DISCOVER: 'discover.yaml',
  LICENSING: 'licensing.yaml',
  PLATFORM_NODEJS: 'doc_node_js.md',
  PLATFORM_WEB: 'doc_web.md',
  PARSEC: 'parsec.yaml',
  CRUST: 'crust.yaml',
  GLOSSARY: 'glossary.yaml',
  DOCS: 'docs.yaml'
};

const getLocalContent = (local, fileName) => {
  try {
    // file path
    const filePath = path.resolve(CONTENT_DIR, local, fileName);
    // read file
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error('Read content file error : ', err);
  }
};

export default [
  {
    path: '/',
    component: 'src/containers/home',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.HOME))
    })
  },
  {
    path: '/start_developing',
    component: 'src/containers/start_developing',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.START_DEV))
    })
  },
  {
    path: '/core_technology',
    component: 'src/containers/core_technology',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.CORE_TECH))
    })
  },
  {
    path: '/discover',
    component: 'src/containers/discover',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.DISCOVER))
    })
  },
  {
    path: '/platform/nodejs',
    component: 'src/containers/platform',
    getData: () => {
      const otherPlatforms = parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.START_DEV)).platformLinks;
      const content = parser.md(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.PLATFORM_NODEJS));
      const data = {
        otherPlatforms,
        content,
        name: 'nodejs'
      };
      return ({
        data
      });
    }
  },
  {
    path: '/platform/web',
    component: 'src/containers/platform',
    getData: () => {
      const otherPlatforms = parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.START_DEV)).platformLinks;
      const content = parser.md(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.PLATFORM_WEB));
      const data = {
        otherPlatforms,
        content,
        name: 'web'
      };
      return ({
        data,
      });
    },
  },
  {
    path: '/licensing',
    component: 'src/containers/licensing',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.LICENSING)),
    }),
  },
  {
    path: '/parsec',
    component: 'src/containers/parsec',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.PARSEC))
    })
  },
  {
    path: '/crust',
    component: 'src/containers/crust',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.CRUST))
    })
  },
  {
    path: '/glossary',
    component: 'src/containers/glossary',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.GLOSSARY))
    })
  },
  {
    path: '/docs',
    component: 'src/containers/docs',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.DOCS))
    })
  },
  {
    is404: true,
    component: 'src/containers/404',
  }
];
