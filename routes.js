import CONST from './src/constants';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
//
const PAGES = {
  HOME: 'home',
  APP_DEV: 'app_developer',
  CORE_DEV: 'core_developer',
  PLATFORM_NODEJS_V0_4_1: 'platform_nodejs_v0_4_1',
  DISCOVER: 'discover',
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
    path: '/platform/nodejs/v0_4_1',
    component: 'src/containers/platform_nodejs_v0_4_1',
    getData: () => ({
      data: getLocalContent(CONST.locals.EN_GB, PAGES.PLATFORM_NODEJS_V0_4_1)
    })
  },
  {
    is404: true,
    component: 'src/containers/404',
  }
];
