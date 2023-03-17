import hljs from './highlight.js';

/**
 * 创建文章基础样式
 * @export
 * @param {*} title 标题
 * @param {*} background 背景
 * @param {*} content 知识点
 * @param {*} extension 拓展点
 */
function initArticle(config) {
  loadArticleConfig(config)
  codeHighlight();
}

function loadArticleConfig({ title, background, content, extension }) {
  const summary = document.body.querySelector('#summary');

  const titleDom = `<header>${title}</header>`;

  let backgroundDom = `<section><div class='titlePoint'>📖 背景</div><ul>`
  for (let i = 0; i < background.length; i++) {
    backgroundDom += `<li>${background[i]}</li>`
  }
  backgroundDom += `</ul></section>`

  let contentDom = `<section><div class='titlePoint'>📖 知识点</div><ul>`
  for (let i = 0; i < content.length; i++) {
    contentDom += `<li>${content[i]}</li>`
  }
  contentDom += `</ul></section>`

  let extensionDom = `<section><div class='titlePoint'>📖 拓展点</div><ul>`
  for (let i = 0; i < extension.length; i++) {
    extensionDom += `<li>${extension[i]}</li>`
  }
  extensionDom += `</ul></section>`

  summary.innerHTML += titleDom + backgroundDom + contentDom + extensionDom;

  const codeShow = document.body.querySelector('#code');
  const codeDom = `<div class='titlePoint'>📖 代码展示</div><div class="code-container"><pre><code class="hljs"></code></pre></div>`;
  codeShow.innerHTML = codeDom;
}

function codeHighlight() {
  const allText = readFile();
  document.querySelector('.hljs').innerHTML = allText;
  hljs.highlightAll();
}

function readFile(fileName) {
  const rawFile = new XMLHttpRequest();
  const url = fileName || window.location.href + '/index.js';
  let allText = '';
  rawFile.open("GET", url, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  }
  rawFile.send(null);
  return allText || '';
}

export {
  initArticle
}