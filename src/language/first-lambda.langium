grammar FirstLambda

entry Model:
    (variables+=Variable)*;

Variable:
    'let' name=ID '=' (Expression | OutermostApplication);

Parameter:
    name=ID;

Literal:
    value=(INT | STRING);

type Ref = Variable | Parameter;

Expression:
    UnaryExpression | Lambda | Application;

UnaryExpression:
    value=Literal | reference=[Ref:ID];

Lambda:
    '(' 'lambda' (arguments+=Parameter)* '->' value=Expression ')';

Application:
    '(' (lambda=Lambda | call=[Ref:ID]) argument_values+=Expression* ')';

OutermostApplication:
    call=[Ref:ID] argument_values+=Expression+;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal SL_COMMENT: /\#[^\n\r]*/;
