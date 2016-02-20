'use strict';

var fs = require('fs');
var path = require('path');

var dataPath = path.join(__dirname, '../data');

function readWords(type) {
  var data = fs.readFileSync(path.join(dataPath, `data.${type}`), 'utf8');
  return data.split('\n');
}

var words = {
  adjectives: readWords('adj'),
  adverbs: readWords('adv'),
  nouns: readWords('noun'),
  verbs: readWords('verb')
};

function getRandomWord(words) {
  var length = words.length;
  var randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].replace(/_/g, ' ');
}

function getCapitalCaseArticle(word) {
  var firstChar = word.charAt(0).toLowerCase();
  var vowels = ['a', 'o', 'u', 'e', 'i', 'y'];
  if (vowels.indexOf(firstChar) !== -1) {
    return 'An';
  }
  return 'A';
}

// Word can have multiple words separated by space
function makeHashTag(word) {
  return word.split(' ')
    .map(function (part) {
      return `#${part}`;
    })
    .join(' ');
}

function makeActive(verb) {
  var parts = verb.split(' ');
  var firstPart = parts[0];
  var lastChar = firstPart.charAt(firstPart.length - 1);
  var suffix = 's';
  if (['h', 's', 'z'].indexOf(lastChar) !== -1) {
    suffix = 'es'
  }
  parts[0] += suffix;
  return parts.join(' ');
}

function buildRandomSentence(withHashTags) {
  var noun = getRandomWord(words.nouns);
  if (withHashTags) {
    noun = makeHashTag(noun);
  }
  var adjective = getRandomWord(words.adjectives);
  var article = getCapitalCaseArticle(adjective);

  var activeVerb = makeActive(getRandomWord(words.verbs));
  var adverb = getRandomWord(words.adverbs);

  return `${article} ${adjective} ${noun} ${activeVerb} ${adverb}`;
}

module.exports = {
  buildRandomSentence: buildRandomSentence
};
