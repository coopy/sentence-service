var Express = require('express');

var wordsService = require('./lib/words');

var app = new Express();

app.get('/words', function (req, res) {
  var useHashTags = req.query.tags;
  var sentence = wordsService.buildRandomSentence(useHashTags);

  res.send({
    sentence: sentence
  });
});

app.listen(3000, function (err) {
  if (err) {
    throw err;
  }
  console.log('server listening on port 3000');
})
