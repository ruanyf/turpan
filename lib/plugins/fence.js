/*
 * Modified from https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L41
 */

'use strict';

module.exports = md => {
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
    let langName = '';
    let highlighted;

    // mermaid
    if (info === 'mermaid') {
      return `<div class="mermaid" data-source="${encodeURIComponent(token.content)}"></div>\n`;
    }

    if (info) {
      langName = info.split(/\s+/g)[0];
      if (/!$/.test(info)) token.attrJoin('class', 'wrap');
      token.attrJoin('class', options.langPrefix + langName.replace(/=$|=\d+$|=\+$|!$|=!$/, ''));
      token.attrJoin('class', 'hljs');
      token.attrJoin('class', 'raw');
    }

    if (options.highlight) {
      highlighted = options.highlight(token.content, langName) || md.utils.escapeHtml(token.content)
    } else {
      highlighted = md.utils.escapeHtml(token.content)
    }

    if (highlighted.indexOf('<pre') === 0) {
      return `${highlighted}\n`;
    }

    return `<pre><code${self.renderAttrs(token)}>${highlighted}</code></pre>\n`;
  };
};
