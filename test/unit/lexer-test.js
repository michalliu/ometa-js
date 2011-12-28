var common = require('../fixtures/common'),
    assert = require('assert');

suite('Ometajs language lexer', function() {
  test('should parse source correctly', function() {
    assert.deepEqual([
      { type: 'name', value: 'abc', offset: 0 },
      { type: 'space', value: ' ', offset: 3 },
      { type: 'string', value: 'abc', offset: 4 },
      { type: 'space', value: ' ', offset: 8 },
      { type: 'string', value: '"a""\'', offset: 9 },
      { type: 'space', value: ' ', offset: 17 },
      { type: 'token', value: 'abc', offset: 18 },
      { type: 'space', value: ' ', offset: 23 },
      { type: 'punc', value: '{', offset: 24 },
      { type: 'punc', value: '}', offset: 25 },
      { type: 'space', value: ' ', offset: 26 },
      { type: 'punc', value: '[', offset: 27 },
      { type: 'string', value: 'a', offset: 28 },
      { type: 'space', value: ' ', offset: 30 },
      { type: 'punc', value: ']', offset: 31 },
      { type: 'comment', value: ' 123', offset: 32 },
      { type: 'token', value: '123', offset: 39 },
      { type: 'comment', value: ' \n123\r ', offset: 44 },
      { type: 'punc', value: '[', offset: 55 },
      { type: 'string', value: '123', offset: 56 },
      { type: 'space', value: ' ', offset: 60 },
      { type: 'number', value: '123', offset: 61 },
      { type: 'punc', value: ']', offset: 64 }
    ], common.lexems('abc `abc \'"a""\\\'\' "abc" ' +
                     '{} [#a ]// 123\n"123"' +
                     '/* \n123\r */[#123 123]'));
  });

});
