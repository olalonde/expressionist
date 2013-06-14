var util = require('util'),
  should = require('should'),
  WhereExpression = require('../')([
    'or', 'and', 'eql', 'notEql', 'in'
  ]);

var expr, pretty;

describe('generate expression tree', function () {
  before(function () {

    _ = WhereExpression.start;

    expr = 
      _('country')
      .eql('Canada')
      .or(
        _('country').eql('USA')
        .and(_('job').notEql('spy'))
        .and(_('company').notEql('nsa'))
      );

      pretty = expr.pretty();

      console.log(util.inspect(pretty, null, 10));

  });

  it('should output the correct string representation', function () {
    should.exist(pretty.or);
    should.exist(pretty.or[0].eql);
    should.ok(pretty.or[0].eql.length === 2);
    should.exist(pretty.or[1].and[0].eql);
    should.exist(pretty.or[1].and[1].notEql);
    should.exist(pretty.or[1].and[2].notEql);
  });
});

describe('evaluating tree against map', function () {
  var res, map;

  before(function () {
    map = {
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
    res = expr.evaluate(map);
  });

  it('should return the right value', function () {
    res.should.equal(' (country = "Canada" OR  (country = "USA" AND job != "spy" AND company != "nsa") ) ');
    console.log(res);
  });
});
