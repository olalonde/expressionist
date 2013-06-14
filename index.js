var inherits = require('util').inherits; //@TODO browser compatibility

var Expression = function (operators) {
  this.operands = [];
};

// nice visual representation
Expression.prototype.pretty = function () {
  var obj = {};
  var operands = this.operands.slice();
  operands.forEach(function (operand, k) {
    if (operand.pretty) {
      operands[k] = operand.pretty();
    }
  });
  obj[this.operator] = operands;
  return obj;
};

// @TODO: allow this kind of syntatx
// Expression({
// and: function (l,r) { return l && r; }
// or: function (l,r) { return l || r; }
// eql: function (l,r) { return l === r; }
// })
// and make it possible to evaluate the expression with .eval
module.exports = function (operators) {
  function CustomExpression () {
    Expression.call(this);
  }

  inherits(CustomExpression, Expression);

  operators.forEach(function (operator) {
    CustomExpression.prototype[operator] = function (something) {
      if (!this.operator || this.operator === operator) {
        this.operator = operator;
        this.operands.push(something);
        return this;
      }
      else {
        var expr = new CustomExpression();
        expr.operator = operator;
        expr.operands.push(this);
        expr.operands.push(something);
        return expr;
      }
    };
  });

  CustomExpression.start = function (something) {
    var expr = new CustomExpression();
    expr.operands.push(something);
    return expr;
  };

  return CustomExpression;
};
