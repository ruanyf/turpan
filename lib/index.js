'use strict';

var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');

var md = new MarkdownIt({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       true,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      true,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externaly.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

// Link attributes plugin for markdown-it markdown parser.
md.use(require('markdown-it-link-attributes'), {
  target: '_blank',
  rel: 'noopener'
});

// A markdown-it plugin for size-specified image markups
md.use(require('markdown-it-imsize'));

// Render images occurring by itself in a paragraph as <figure><img ...></figure>
var implicitFigures = require('markdown-it-implicit-figures');
md.use(implicitFigures, {
  dataType: false,  // <figure data-type="image">, default: false 
  figcaption: true  // <figcaption>alternative text</figcaption>, default: false 
});

// adding emoji & emoticon syntax support.
var emoji = require('markdown-it-emoji');
md.use(emoji);

module.exports = md;
