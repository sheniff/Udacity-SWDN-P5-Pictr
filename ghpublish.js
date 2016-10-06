// Publish www folder to GH pages
var ghpages = require('gh-pages');
var path = require('path');
var dir = path.join(__dirname, 'platforms', 'browser', 'www');

console.log('Deploying [' + dir + '] to gh-pages...');
ghpages.publish(
  dir,
  function(err) {
    if (err)
      console.log('Uh oh...', err);
    else
      console.log('DONE!');
  }
);
