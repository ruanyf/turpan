'use strict';

var test = require('tape');
var md = require('../lib');

test('markdown test', function (t) {
  t.plan(13);

  t.equal(
    md.render('`x = 2`'),
    '<p><code>x = 2</code></p>\n'
  );

  t.equal(
    md.render('```javascript\nx = 2\n```'),
    '<pre class="hljs"><code>x = <span class="hljs-number">2</span>\n</code></pre>\n'
  );

  t.equal(
    md.render('www.yahoo.com'),
    '<p><a href="http://www.yahoo.com" target="_blank" rel="noopener">www.yahoo.com</a></p>\n'
  );

  t.equal(
    md.render('test ![](image.png)'),
    '<p>test <img src="image.png" alt=""></p>\n'
  );

  t.equal(
    md.render('![test](image.png =100x200)'),
    '<figure><img src="image.png" alt="test" width="100" height="200"><figcaption>test</figcaption></figure>\n'
  );

  t.equal(
    md.render('![test](image.png "title")'),
    '<figure><img src="image.png" alt="test" title="title"><figcaption>test</figcaption></figure>\n'
  );

  t.equal(
    md.render(':)'),
    '<p>😃</p>\n'
  );

  t.equal(
    md.render('::: warning\n*here be dragons*\n:::'),
    '<div role="alert" class="alert alert-warning">\n<p><em>here be dragons</em></p>\n</div>\n'
  );

  t.equal(
    md.render('- [ ] Mercury\n- [x] Venus'),
    '<ul class="task-list">\n<li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Mercury</li>\n<li class="task-list-item"><input class="task-list-item-checkbox" checked="" disabled="" type="checkbox"> Venus</li>\n</ul>\n'
  );

  t.equal(
    md.render('# Title'),
    '<h1 id="title">Title <a class="markdownIt-Anchor" href="#title">#</a></h1>\n'
  );

  t.equal(
    md.render('# Title\n## Title'),
    '<h1 id="title">Title <a class="markdownIt-Anchor" href="#title">#</a></h1>\n<h2 id="title-1">Title <a class="markdownIt-Anchor" href="#title-1">#</a></h2>\n'
  );

  t.equal(
    md.render('# 中文标题，你好 世界'),
    '<h1 id="中文标题，你好-世界">中文标题，你好 世界 <a class="markdownIt-Anchor" href="#中文标题，你好-世界">#</a></h1>\n'
  );

  t.equal(
    md.render('[TOC]\n## title1\n### 标题2\n#### title3\n## title4'),
    '<p><div id="toc" class="toc"><ul class="markdownIt-TOC">\n<li><a href="#title1">title1</a>\n<ul>\n<li><a href="#%E6%A0%87%E9%A2%982">标题2</a></li>\n</ul>\n</li>\n<li><a href="#title4">title4</a></li>\n</ul>\n</div></p>\n<h2 id="title1">title1 <a class="markdownIt-Anchor" href="#title1">#</a></h2>\n<h3 id="标题2">标题2 <a class="markdownIt-Anchor" href="#标题2">#</a></h3>\n<h4 id="title3">title3 <a class="markdownIt-Anchor" href="#title3">#</a></h4>\n<h2 id="title4">title4 <a class="markdownIt-Anchor" href="#title4">#</a></h2>\n'
  );
});
