var common = require('../fixtures/common'),
    assert = require('assert');

exports['`any`: number in string'] = function(test) {
  function check(source, value) {
    var g = common.ag(source);

    assert.ok(g.enter('rule', 0, function() {
      return this.any(function() {
        return this.enter('rule', 1, function() {
          return this.range('0', '9')
        })
      });
    }));

    assert.deepEqual(g.intermediate, value);
  };

  check('123a', '123');
  check('1', '1');
  check('abc', '');

  test.done();
};

exports['`many` : number in string'] = function(test) {
  function check(source, value, fail) {
    var g = common.ag(source),
        start = g.enter('rule', 0, function() {
          return this.many(function() {
            return this.enter('rule', 1, function() {
              return this.range('0', '9');
            });
          });
        });

    if (fail) {
      assert.ok(!start);
    } else {
      assert.ok(start);
      assert.deepEqual(g.intermediate, value);
    }
  };

  check('123a', '123');
  check('1', '1');
  check('abc', null, true);

  test.done();
};

exports['`optional`: $ in string'] = function(test) {
  function check(source, value, fail) {
    var g = common.ag(source);

    assert.ok(
      g.enter('rule', 0, function() {
        return this.optional(function() {
          return this.enter('rule', 1, function() {
            return this.match('$');
          });
        })
      })
    );
    assert.deepEqual(g.intermediate, value);
  };

  check('$a', '$');
  check('a', '');

  test.done();
};

exports['token rule'] = function(test) {
  var g = common.ag('token1     token2');

  assert.ok(
    g.enter('rule', 0, function() {
      return this.simulate([function() { return 'token1' }], []) &&
             this._rule_token() &&
             this.simulate([function() { return 'token2' }], []) &&
             this._rule_token();
    })
  );

  test.done();
};

exports['fromTo rule'] = function(test) {
  var g = common.ag('a/* xyz */b');

  assert.ok(
    g.enter('rule', 0, function() {
      return this.match('a') &&
             this.simulate([
               function() { return '/*' },
               function() { return '*/' }
             ], []) &&
             this._rule_fromTo() &&
             this.match('b');
    })
  );

  test.done();
};