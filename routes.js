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
  PLATFORM_ANDROID: 'doc_android.md',
  PLATFORM_DOTNET: 'doc_dotnet.md',
  PLATFORM_XAMARIN: 'doc_xamarin.md',
  PARSEC: 'parsec.yaml',
  CRUST: 'crust.yaml',
  GLOSSARY: 'glossary.yaml',
  DOCS: 'docs.yaml',
  DAPPS: 'dapps.yaml'
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
    template: 'src/containers/home',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.HOME))
    })
  },
  {
    path: '/start_developing',
    template: 'src/containers/start_developing',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.START_DEV))
    })
  },
  {
    path: '/core_technology',
    template: 'src/containers/core_technology',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.CORE_TECH))
    })
  },
  {
    path: '/discover',
    template: 'src/containers/discover',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.DISCOVER))
    })
  },
  {
    path: '/platform/nodejs',
    template: 'src/containers/platform',
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
    template: 'src/containers/platform',
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
    template: 'src/containers/licensing',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.LICENSING)),
    }),
  },
  {
    path: '/parsec',
    template: 'src/containers/parsec',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.PARSEC))
    })
  },
  {
    path: '/crust',
    template: 'src/containers/crust',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.CRUST))
    })
  },
  {
    path: '/glossary',
    template: 'src/containers/glossary',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.GLOSSARY))
    })
  },
  {
    path: '/docs',
    template: 'src/containers/docs',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.DOCS))
    })
  },
  {
    path: '/dapps',
    template: 'src/containers/dapps',
    getData: () => ({
      data: parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.DAPPS))
    })
  },
  {
    path: '/platform/android',
    template: 'src/containers/platform',
    getData: () => {
      const otherPlatforms = parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.START_DEV)).platformLinks;
      const content = parser.md(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.PLATFORM_ANDROID));
      const data = {
        otherPlatforms,
        content,
        name: 'Android'
      };
      return ({
        data,
      });
    }
  },
  {
    path: '/platform/dotnet',
    template: 'src/containers/platform',
    getData: () => {
      const otherPlatforms = parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.START_DEV)).platformLinks;
      const content = parser.md(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.PLATFORM_DOTNET));
      const data = {
        otherPlatforms,
        content,
        name: '.Net'
      };
      return ({
        data,
      });
    },
  },
  {
    path: '/platform/xamarin',
    template: 'src/containers/platform',
    getData: () => {
      const otherPlatforms = parser.yamlToJson(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.START_DEV)).platformLinks;
      const content = parser.md(getLocalContent(CONST.locals.EN_GB, CONTENT_FILE.PLATFORM_XAMARIN));
      const data = {
        otherPlatforms,
        content,
        name: 'Xamarin'
      };
      return ({
        data,
      });
    },
  },
  {
    path: '404',
    template: 'src/containers/404',
  }
];
