const words = require('./words.json');

const matchedWords = (searchWord) => {
    return Object.keys(words).filter((word) => word.startsWith(searchWord)).slice(0,10);
}
  module.exports = {matchedWords};
