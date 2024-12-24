grammar FirstLambda

entry Model:
    (variables+=Variable)*;

Literal:
    value=(INT | STRING);

Variable:
    'let' name=ID '=' (Expression | Lambda);

Parameter:
    name=ID;

type VariableOrParameter = Variable | Parameter;

Expression:
    Literal | function=[VariableOrParameter:ID] (arguments+=ParenthesizedExpression)*;

ParenthesizedExpression:
    '(' Expression ')' | Expression;

Lambda:
    'lambda' (parameters+=Parameter)* '->' ParenthesizedExpression;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal SL_COMMENT: /\#[^\n\r]*/;
