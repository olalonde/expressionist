var util = require('util'),
  should = require('should'),
  WhereExpression = require('../')([
    'or', 'and', 'eql', 'notEql', 'in'
  ]);

describe('simple expression', function () {
  var expr, res, pretty;
  before(function () {

    _ = WhereExpression.start;

    res = 
      _('country')
      .eql('Canada')
      .or(
        _('country').eql('USA')
        .and(_('job').notEql('spy'))
        .and(_('company').notEql('nsa'))
      );

      pretty = res.pretty();

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
