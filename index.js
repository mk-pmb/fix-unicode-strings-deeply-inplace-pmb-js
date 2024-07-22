/* -*- coding: UTF-8, tab-width: 2 -*- */
/* eslint-disable
  no-empty,
  no-param-reassign,
  no-var,
  one-var,
  one-var-declaration-per-line,
  prefer-object-spread,
  spaced-comment,
  strict,
*/
/*jslint indent: 2, maxlen: 80, browser: true */
/*global define: true */
(function namespace() {
  'use strict';
  var EX;

  EX = function fixStringsDeeplyInplace(x, opt) {
    var o = Object.assign({}, opt), keyStack = [], ctnrStack = [];
    if (o.normCC === true) { o.normCC = undefined; }
    if (o.eol === true) { o.eol = '\n'; }
    try {
      return EX.core(x, o, ctnrStack, keyStack);
    } catch (e) {
      try {
        e.fixStringsDeeplyInplace = {
          getKeyStack: Object.bind(null, keyStack),
          getContainerStack: Object.bind(null, ctnrStack),
        };
      } catch (ignore) {
      }
      throw e;
    }
  };


  EX.core = function fixStringsDeeplyInplaceCore(x, opt, ctnrStack, keyStack) {
    var t = String(x && typeof x), f, i;
    if (t === 'object') {
      f = function ifInso(C) { return (x instanceof C) && C; };
      f = (f(String) || f(Boolean) || f(Number));
      if (f) {
        x = f(x.valueOf());
        t = (x && typeof x);
      }
    }

    f = opt['pre-fix:' + t];
    if (f) {
      x = f(x, opt, t, ctnrStack, keyStack);
      t = (x && typeof x);
    }

    if (t === 'string') {
      if (opt.normCC !== false) { x = x.normalize(opt.normCC); }
      if (opt.trim) { x = x.trim(); }
      if (opt.eol) { x = x.replace(/\s*[\r\n]/g, opt.eol); }
    }

    if (t === 'object') {
      if (ctnrStack.indexOf(x) >= 0) { return x; } // avoid recursion
      i = ctnrStack.length;
      ctnrStack[i] = x;
      Object.entries(x).forEach(function each(e) {
        var k = e[0], v = e[1];
        keyStack[i] = k;
        x[k] = EX.core(v, opt, ctnrStack, keyStack);
      });
      keyStack.pop();
      ctnrStack.pop();
    }

    if (f) {
      x = f(x, opt, t, ctnrStack, keyStack);
      t = (x && typeof x);
    }

    return x;
  };





















  (function unifiedExport(e) {
    var d = ((typeof define === 'function') && define),
      m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function f() { return e; }); }
    if (m && m.exports) { m.exports = e; }
  }(EX));

  return EX;
}());
