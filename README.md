
<!--#echo json="package.json" key="name" underline="=" -->
fix-unicode-strings-deeply-inplace-pmb
======================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Normalize/fix various common headaches with user-provided string inputs,
deeply if given an object (including array).
<!--/#echo -->



API
---

This module exports one function:

### fixStringsDeeplyInplace(input[, opt])

`opt` is an optional options object that supports these optional keys:

* `normCC`: Whether to normalize composing characters, and how.
  * `true`/`undefined`/omitted: Normalize with default setting
    [as defined by `String#normalize`][mdn-normstr].
  * `false`: Leave as is.
  * anything else: … is assumed to be one of the valid modes for
    [`String#normalize`][mdn-normstr].
* `trim`: Whether to discard whitespace at the start and end of strings.
  * `false`/`undefined`/omitted: Leave as is.
  * `true`: Discard.
    This may mess with the indentation of the first non-blank line.
* `eol`: Whether to normalize end-of-line symbols (CR, LF,
  and potential preceeding whitespace).
  * `false`/`undefined`/omitted: Leave as is.
  * `true`: Alias for `'\n'`.
  * any string: Replace with this string.
* `pre-fix:…` and `fix:…`: Custom callbacks to transform values before/after
  the default normalizations. This is meant as an easy way to add simple
  optimizations, in cases where you'd otherwise have to replicate
  this module's object-diving code. See the code for how it works.




Usage
-----

see [test/usage.mjs](test/usage.mjs).



<!--#toc stop="scan" -->

  [mdn-normstr]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
