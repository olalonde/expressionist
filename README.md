# Expressionist

[![Build Status](https://travis-ci.org/olalonde/expressionist.png)](https://travis-ci.org/olalonde/expressionist) [![NPM version](https://badge.fury.io/js/expressionist.png)](http://badge.fury.io/js/expressionist)

Generate your own DSLs using native Javascript syntax. Work in progress.

Expressionist lets you programmatically generate expression trees in
Node.js and then evaluate it after you have defined operation mapppings. 

## Install

    npm install expressionist

## Usage

```javascript
var WhereExpression = require('expressionist')([
  'or', 'and', 'eql', 'notEql', 'in'
]);

var _ = WhereExpression.start;

var res = 
  _('country')
  .eql('Canada')
  .or(
    _('country').eql('USA')
    .and(_('job').notEql('spy'))
    .and(_('company').notEql('nsa'))
  );

var pretty = res.pretty();

console.log(util.inspect(pretty, null, 10));

/* 
Outputs:

  { or:
   [ { eql: [ 'country', 'Canada' ] },
     { and:
        [ { eql: [ 'country', 'USA' ] },
          { notEql: [ 'job', 'spy' ] },
          { notEql: [ 'company', 'nsa' ] } ] } ] }

*/


var map = {
  or: function (operands) {
    return ' (' + operands.join(' OR ') + ') ';
  },
  and: function (operands) {
    return ' (' + operands.join(' AND ') + ') ';
  },
  eql: function (operands) {
    return operands[0] + ' = "' + operands[1] + '"';
  },
  notEql: function (operands) {
    return operands[0] + ' != "' + operands[1] + '"';
  }
};

var res = expr.evaluate(map);

console.log(res);

/*
Outpus:

 (country = "Canada" OR  (country = "USA" AND job != "spy" AND company != "nsa") )
*/
```

## Roadmap

- Syntax sugar. 
- Operator precedence.
- Browser friendly build.
- Support this: 

```javascript
var MathExpr = require('expressionist')({
  eql: function (l, r) { return l === right; },
  gt: function (l, r) { return l > r; }
});
// build expression (...) and then
var result = expr.eval();
```

- Nicer stringified representations and ability to transform to
different representations.

## License

MIT: [http://olalonde.mit-license.org](http://olalonde.mit-license.org)
