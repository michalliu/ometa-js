var translateCode = exports.translateCode = function (code) {
  var fail = { toString: function(){ return "match failed" } },
      translationError = function(m, i) { throw fail },
      tree = BSOMetaJSParser.matchAll(code, "topLevel", undefined, function (m, i) { throw objectThatDelegatesTo(fail, {errorPos: i}) });
  return BSOMetaJSTranslator.match(tree, "trans", undefined, translationError);
};

var evalCode = exports.evalCode = function (code) { return eval(translateCode(code)) };

require.extensions['.ometajs'] = function(module, filename) {
  var code = translateCode(require('fs').readFileSync(filename).toString());

  return module._compile(code, filename);
};
