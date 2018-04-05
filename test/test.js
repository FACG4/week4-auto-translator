const serverLogic = require('../src/serverLogic.js');
const test = require('tape');

//test 1

test('tests tests!!!', (t) => {
  const actual = serverLogic.matchedWords('lion');
  const expected = ["lion","lionced","lioncel","lionel","lionesque","lioness","lionesses","lionet","lionfish","lionfishes"]
  t.deepEqual(actual, expected, 'should return the same words');
  t.end();
})

// test 2

// test 3

// test 4
