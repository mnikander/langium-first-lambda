grammar FirstLambda

entry Model:
    (variables+=Variable)*;

Variable:
    'let' name=ID '=' (Expression);

Literal:
    value=(INT | STRING);

Lambda:
    'lambda' (parameters+=ID)* '->' value=Expression;

Expression:
    value=Literal | reference=ID
    | '(' lambda=Lambda ')'
    | ('(' call=ID arguments+=Expression* ')');

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal SL_COMMENT: /\#[^\n\r]*/;
