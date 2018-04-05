const words = require('./words.json');

// const matchedWords = (searchWord) => {
//     return Object.keys(words).filter((word) => word.startsWith(searchWord)).slice(0,10);
// }

const matchedWords = (searchWord) => {
  let result = [];
  for (let word of Object.keys(words)) {
    if (word.startsWith(searchWord)) {
      result.push(word);
    }
    if (result.length >= 10) {
      break;
    }
  }
  return result;
}

module.exports = {
  matchedWords
};