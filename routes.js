import CONST from './src/constants';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
//
const PAGES = {
  HOME: 'home',
  APP_DEV: 'app_developer',
  CORE_DEV: 'core_developer',
  PLATFORM_NODEJS: 'platform_nodejs',
  DISCOVER: 'discover',
  PLATFORM_WEB: 'platform_web',
  PLATFORM_RUST: 'platform_rust',
};

const CONTENT_PATH = path.resolve('src', 'contents');

const getLocalContent = (local, page) => {
  try {
    // file path
    const filePath = path.resolve(CONTENT_PATH, local, `${page}.yaml`);

    // read file
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.safeLoad(content);
  } catch (err) {
    console.error('Read content file error : ', err);
  }
};

export default [
  {
    path: '/',
    component: 'src/containers/home',
    getData: () => ({
      data: getLocalContent(CONST.locals.EN_GB, PAGES.HOME)
    })
  },
  {
    path: '/app_developer',
    component: 'src/containers/app_developer',
    getData: () => ({
      data: getLocalContent(CONST.locals.EN_GB, PAGES.APP_DEV)
    })
  },
  {
    path: '/core_developer',
    component: 'src/containers/core_developer',
    getData: () => ({
      data: getLocalContent(CONST.locals.EN_GB, PAGES.CORE_DEV)
    })
  },
  {
    path: '/discover',
    component: 'src/containers/discover',
  },
  {
    path: '/platform/nodejs',
    component: 'src/containers/platform_nodejs',
    getData: () => ({
      data: getLocalContent(CONST.locals.EN_GB, PAGES.PLATFORM_NODEJS)
    })
  },
  {
    path: '/platform/web',
    component: 'src/containers/platform_web',
    getData: () => ({
      data: getLocalContent(CONST.locals.EN_GB, PAGES.PLATFORM_WEB),
    }),
  },
  {
    path: '/platform/rust',
    component: 'src/containers/platform_rust',
    getData: () => ({
      data: getLocalContent(CONST.locals.EN_GB, PAGES.PLATFORM_RUST),
    }),
  },
  {
    is404: true,
    component: 'src/containers/404',
  }
];
