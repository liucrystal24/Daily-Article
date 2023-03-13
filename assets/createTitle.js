/**
 * 创建文章基础样式
 * @export
 * @param {*} title 标题
 * @param {*} background 背景
 * @param {*} content 知识点
 * @param {*} extension 拓展点
 */
export default function ({ title, background, content, extension }) {
  const summary = document.body.querySelector('#summary');

  const titleDom = `<header>${title}</header>`;

  let backgroundDom = `<section><div>背景：</div><ul>`
  for (let i = 0; i < background.length; i++) {
    backgroundDom += `<li>${background[i]}</li>`
  }
  backgroundDom += `</ul></section>`

  let contentDom = `<section><div>知识点：</div><ul>`
  for (let i = 0; i < content.length; i++) {
    contentDom += `<li>${content[i]}</li>`
  }
  contentDom += `</ul></section>`

  let extensionDom = `<section><div>拓展点：</div><ul>`
  for (let i = 0; i < extension.length; i++) {
    extensionDom += `<li>${extension[i]}</li>`
  }
  extensionDom += `</ul></section>`

  summary.innerHTML += titleDom + backgroundDom + contentDom + extensionDom;
}

