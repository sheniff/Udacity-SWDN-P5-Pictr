// Publish www folder to GH pages
var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(
  path.join(__dirname, 'www'),
  function(err) {
    if (err)
      console.log('Uh oh...', err);
    else
      console.log('DONE!');
  }
);
