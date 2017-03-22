'use strict';

var test = require('tape');
var md = require('../lib');

test('markdown test', function (t) {
  t.plan(5);

  t.equal(
    md.render('`x = 2`'),
    '<p><code>x = 2</code></p>\n'
  );

  t.equal(
    md.render('www.yahoo.com'),
    '<p><a href="http://www.yahoo.com" target="_blank" rel="noopener">www.yahoo.com</a></p>\n'
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
});
