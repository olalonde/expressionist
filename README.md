# Expressionist

[![Build Status](https://travis-ci.org/olalonde/expressionist.png)](https://travis-ci.org/olalonde/expressionist) [![NPM version](https://badge.fury.io/js/expressionist.png)](http://badge.fury.io/js/expressionist)

Programmatically generate expression trees in Node.js or plain browser Javascript.

## Install

    npm install expressionist

## Usage

```javascript
WhereExpression = require('expressionist')([
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
