import yaml from 'js-yaml';
import showdown from 'showdown';
import cheerio from 'cheerio';
import ReactParser from 'html-react-parser';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-java'
import 'prismjs/themes/prism.css'

// parse yaml
export const yamlToJson = (content) => (
  yaml.safeLoad(content)
);

// parse md file
export const md = (content) => {
  const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    ghCompatibleHeaderId: true,
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    ghCodeBlocks: true,
    ghMentions: true,
    ghMentionsLink: true,
    excludeTrailingPunctuationFromURLs: true,
  });
  // return HTML String
  return converter.makeHtml(content);
};

export const parsePlatformData = (content) => {
  const $ = cheerio.load(content, {
    xmlMode: true
  });
  $('h1').addClass('header-1');
  $('h2').addClass('header-2 ');
  $('p').addClass('para');
  $('ul').addClass('list');
  $('li').addClass('list-i');
  $('a').map((i, ele) => {
    const href = $(ele).attr('href');
    if (href && href[0] === '#') {
      return;
    }
    $(ele).attr('target', '_blank');
  });

  $('pre').map((index, element) => {
    const ele = $(element);
    const codeEle = ele.children('code');
    const code = codeEle.contents()[0].data;
    const highlightedHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    ele.addClass('language-javascript')
    codeEle.html(highlightedHtml);
  }).get().join(' ');

  $('li code').map((i, ele) => {
    $(ele).addClass('language-basic')
  }).get().join(' ');

  $('p code').map((i, ele) => {
    $(ele).addClass('language-basic')
  }).get().join(' ');


  const navEle = $.root().children().filter((i, el) => ['h1', 'h2', 'h3'].indexOf(el.name) !== -1);

  return {
    html: ReactParser($.html()),
    nav: navEle
  };
};
