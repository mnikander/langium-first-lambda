grammar FirstLambda

entry Model:
    (variables+=Variable)*;

Variable:
    'let' name=ID '=' Expression;

Parameter:
    name=ID;

Literal:
    value=(INT | STRING);

type Ref = Variable | Parameter;

Lambda:
    'lambda' (arguments+=Parameter)* '->' '{' value=Expression '}';

Expression:
    UnaryExpression | Lambda | FunctionCall;

UnaryExpression:
    value=Literal | reference=[Ref:ID];

FunctionCall:
    '(' ((lambda=Lambda arguments+=Expression*) | (call=[Ref:ID] arguments+=Expression*)) ')';

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal SL_COMMENT: /\#[^\n\r]*/;
