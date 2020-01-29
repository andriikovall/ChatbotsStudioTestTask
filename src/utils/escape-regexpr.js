/**
 * Important for possibly invalid reqexpr in search query.
 *
 * For example ```"[\d+"``` is invalid regexpr and new ```RegExpr(str)```
 * can throw an exception
 */
module.exports = function (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
