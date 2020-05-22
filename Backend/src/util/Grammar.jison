%{
    const { Error } = require('../models/Error');

    var idError = 1;
    var errorLine = 0;
    var errorcolumn = 0;
    var errorList = [];

    var returnExpression = false;
    var returnSentence = false;

    var breakCounter = 0;
    var continueCounter = 0;
%}

/* lexical grammar */
%lex
%options case-sensitive
commentMultiline        (\/\*[\s\S]*?\*\/|\/\/.*)
identifier              (([a-zA-Z_])[a-zA-Z0-9_]*)
digit                   ([0-9]+)
decimal                 ({digit}("."{digit})?)
singleQuote             ("'")
doubleQuote             ("\"")
character               ({singleQuote}((?:\\("n"|"t"|"r"|"\\"|"\""|"\'")|(?:(?!{singleQuote}).))?){singleQuote})
stringLiteral           ({doubleQuote}((?:\\{doubleQuote}|(?:(?!{doubleQuote}).))*){doubleQuote})

%%
\s+                     /* skip whitespace */
{commentMultiline}      /* skip Single Line Comment AND Multiline Comment */

"{"                     return '{'
"}"                     return '}'
"("                     return '('
")"                     return ')'
","                     return ','
"."                     return '.'
":"                     return ':'
";"                     return ';'

"boolean"               return 'boolean'
"break"                 return 'break'
"case"                  return 'case'
"char"                  return 'char'
"class"                 return 'class'
"continue"              return 'continue'
"default"               return 'default'
"do"                    return 'do'
"double"                return 'double'
"else"                  return 'else'
"false"                 return 'false'
"for"                   return 'for'
"if"                    return 'if'
"import"                return 'import'
"int"                   return 'int'
"out"                   return 'out'
"System.out.print"      return 'print'
"System.out.println"    return 'println'
"return"                return 'return'
"String"                return 'String'
"switch"                return 'switch'
"System"                return 'System'
"true"                  return 'true'
"void"                  return 'void'
"while"                 return 'while'

"<="                    return '<='
"<"                     return '<'
"=="                    return '=='
">="                    return '>='
">"                     return '>'
"!="                    return '!='
"||"                    return '||'
"&&"                    return '&&'
"!"                     return '!'
"="                     return '='
"++"                    return '++'
"+"                     return '+'
"--"                    return '--'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"^"                     return '^'
"%"                     return '%'
{identifier}            return 'identifier'
{decimal}               return 'decimal'
{character}             { yytext = yytext.substr(1,yyleng-2); return 'character'; }
{stringLiteral}         { yytext = yytext.substr(1,yyleng-2); return 'stringLiteral'; }
<<EOF>>                 return 'EOF';

.                       { errorList.push(new Error(idError, 'Lexical Error', yylloc.first_line, yylloc.first_column, 'Unknown pattern: ' + yytext)); console.error('Lexical Error: ' + yytext + ' in the line ' + yylloc.first_line + ' and column ' + yylloc.first_column); idError++; }
/lex

/* operator associations and precedence */
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/' '%'
%left '^'
%right '!'
%left UMINUS
%right '++' '--'

%start START
%% /* language grammar */

START : IMPORTS CLASS 'EOF'     { if (errorList.length > 0) { let eL = []; eL = eL.concat(errorList); errorList = []; idError = 0; return { 'error': eL }; } return { 'imports': $1, 'class': $2 } }
      | CLASS 'EOF'             { if (errorList.length > 0) { let eL = []; eL = eL.concat(errorList); errorList = []; idError = 0; return { 'error': eL }; } return { 'class': $1 } }
      | 'EOF'
      | error                   { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
      ;

IMPORTS : IMPORTS IMPORT    { $1.push($2); $$ = $1; }
        | IMPORT            { $$ = [$1]; }
        ;

IMPORT : 'import' 'identifier' ';'       { $$ = { 'import': $2 }; }
       | 'import' error                  { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
       ;

CLASS : 'class' 'identifier' '{' BODYCLASS '}'      { $$ = { 'class_name': $2, 'class_content': $4 }; }
      | 'class' 'identifier' '{' '}'                { $$ = { 'class_name': $2, 'class_content': [] }; }
      | 'class' error '{' BODYCLASS '}'             { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
      | 'class' error '{' '}'                       { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
      | error ERROR                                 { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
      ;

BODYCLASS : BODYCLASS METHOD            { $1.push($2); $$ = $1; }
          | BODYCLASS DECLARATION       { $1.push($2); $$ = $1; }
          | METHOD                      { $$ = [$1]; }
          | DECLARATION                 { $$ = [$1]; }
          | error ERROR                 { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
          ;

METHOD : 'void' 'identifier' '(' ')' BODY           { $$ = {'method_name': $2, 'type': $1, 'method_params': [], 'method_content': $5 }; if(returnSentence && returnExpression) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'Unexpected return value')); console.error('Syntactic error: Unexpected return value in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } returnSentence = false; if(breakCounter>0 || continueCounter>0) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'No enclosing loop out of which to break or continue')); console.error('Syntactic error: No enclosing loop out of which to break or continue in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } breakCounter = 0; continueCounter = 0; }
       | TYPE 'identifier' '(' ')' BODY             { $$ = {'method_name': $2, 'type': $1, 'method_params': [], 'method_content': $5 }; if(returnSentence && !returnExpression) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'Missing return value')); console.error('Syntactic error: Missing return value in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } returnSentence = false; if(breakCounter> 0 || continueCounter>0) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'No enclosing loop out of which to break or continue')); console.error('Syntactic error: No enclosing loop out of which to break or continue in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } breakCounter = 0; continueCounter = 0; }
       | 'void' 'identifier' '(' PARAMS ')' BODY    { $$ = {'method_name': $2, 'type': $1, 'method_params': $4, 'method_content': $6 }; if(returnSentence && returnExpression) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'Unexpected return value')); console.error('Syntactic error: Unexpected return value in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } returnSentence = false; if(breakCounter>0 || continueCounter>0) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'No enclosing loop out of which to break or continue')); console.error('Syntactic error: No enclosing loop out of which to break or continue in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } breakCounter = 0; continueCounter = 0; }
       | TYPE 'identifier' '(' PARAMS ')' BODY      { $$ = {'method_name': $2, 'type': $1, 'method_params': $4, 'method_content': $6 }; if(returnSentence && !returnExpression) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'Missing return value')); console.error('Syntactic error: Missing return value in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } returnSentence = false; if(breakCounter>0 || continueCounter>0) { errorList.push(new Error(idError, 'Syntactic error', errorLine, errorcolumn, 'No enclosing loop out of which to break or continue')); console.error('Syntactic error: No enclosing loop out of which to break or continue in the line ' + errorLine + ' and column ' + errorcolumn); idError++; } breakCounter = 0; continueCounter = 0; }
       | 'void' error                               { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
       ;

TYPE : 'int'        { $$ = 'int'; }
     | 'double'     { $$ = 'double'; }
     | 'boolean'    { $$ = 'boolean'; }
     | 'char'       { $$ = 'char'; }
     | 'String'     { $$ = 'String'; }
     ;

PARAMS : PARAMS ',' PARAM   { $1.push($3); $$ = $1; }
       | PARAM              { $$ = [$1]; }
       ;

PARAM : TYPE 'identifier'   { $$ = { 'type': $1, 'identifier' : $2 }; }
      | error               { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
      ;

BODY : '{' '}'              { $$ = []; }
     | '{' SENTENCES '}'    { $$ = $2; }
     | error               { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
     ;

SENTENCES : SENTENCES SENTENCE  { $1.push($2); $$ = $1; }
          | SENTENCE            { $$ = [$1]; }
          ;

SENTENCE : DECLARATION          { $$ = { 'declaration' : $1 }; }
         | ASSIGNMENT           { $$ = { 'assignment' : $1 }; }
         | INVOKEMETHOD ';'     { $$ = { 'method_invocation' : $1 }; }
         | SOUT                 { $$ = $1; }
         | IF                   { $$ = $1; }
         | SWITCH               { $$ = { 'switch' : $1 }; breakCounter--; continueCounter--; }
         | FOR                  { $$ = { 'for' : $1 }; breakCounter--; continueCounter--; }
         | WHILE                { $$ = { 'while' : $1 }; breakCounter--; continueCounter--; }
         | DOWHILE              { $$ = { 'do' : $1 }; breakCounter--; continueCounter--; }
         | RETURN               { $$ = { 'return' : $1 }; }
         | BREAK                { $$ = 'break'; }
         | CONTINUE             { $$ = 'continue'; }
         | error                { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
         ;

DECLARATION : TYPE IDLIST ';'     { $$ = { 'type' : $1, identifiers: $2 }; }
            ;

IDLIST : IDLIST ',' ID      { $1.push($3); $$ = $1; }
       | ID                 { $$ = [$1]; }
       ;

ID : 'identifier'                           { $$ = {'identifier': $1 }; }
   | 'identifier' ASSIGNMENT_EXPRESSION     { $$ = {'identifier': $1, 'value' : $2 }; }
   ;

ASSIGNMENT : 'identifier' ASSIGNMENT_EXPRESSION ';'     { $$ = {'identifier': $1, 'value' : $2 }; }
           | 'identifier' '++' ';'                      { $$ = {'identifier': $1, 'value' : $1 + ' + 1' }; }
           | 'identifier' '--' ';'                      { $$ = {'identifier': $1, 'value' : $1 + ' - 1' }; }
           ;

ASSIGNMENT_EXPRESSION : '=' EXPRESSION      { $$ = $2; }
                      ;

EXPRESSION : EXPRESSION '+' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '-' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '*' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '/' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '^' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '%' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '<' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '>' EXPRESSION      { $$ = $1 + $2 + $3; }
           | EXPRESSION '<=' EXPRESSION     { $$ = $1 + $2 + $3; }
           | EXPRESSION '>=' EXPRESSION     { $$ = $1 + $2 + $3; }
           | EXPRESSION '==' EXPRESSION     { $$ = $1 + $2 + $3; }
           | EXPRESSION '!=' EXPRESSION     { $$ = $1 + $2 + $3; }
           | EXPRESSION '||' EXPRESSION     { $$ = $1 + $2 + $3; }
           | EXPRESSION '&&' EXPRESSION     { $$ = $1 + $2 + $3; }
           | '(' EXPRESSION ')'             { $$ = $1 + $2 + $3; }
           | '-' EXPRESSION %prec UMINUS    { $$ = $1 + $2; }
           | '!' EXPRESSION                 { $$ = $1 + $2; }
           | 'identifier'                   { $$ = $1; }
           | 'stringLiteral'                { $$ = $1; }
           | 'character'                    { $$ = $1; }
           | 'decimal'                      { $$ = $1; }
           | 'true'                         { $$ = $1; }
           | 'false'                        { $$ = $1; }
           | INVOKEMETHOD                   { $$ = $1; }
           ;

INVOKEMETHOD : 'identifier' '(' ')'                         { $$ = { 'method_identifier' : $1, 'params' : [] }; }
             | 'identifier' '(' INVOKEMETHODPARAMS ')'      { $$ = { 'method_identifier' : $1, 'params' : $3 }; }
             ;

INVOKEMETHODPARAMS : INVOKEMETHODPARAMS ',' EXPRESSION      { $1.push($3); $$ = $1; }
                   | EXPRESSION                             { $$ = [$1]; }
                   ;

SOUT : 'print' '(' ')' ';'          { $$ = { 'print' : [] }; }
     | 'println' '(' ')' ';'        { $$ = { 'println' : [] }; }
     | 'print' CONDITION ';'        { $$ = { 'print' : $2 }; }
     | 'println' CONDITION ';'      { $$ = { 'println' : $2 }; }
     ;

CONDITION : '(' EXPRESSION ')'      { $$ = $2; }
          | error                   { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
          ;

IF : 'if' CONDITION BODY                    { $$ = { 'if' : { 'condition' : $2, 'sentences' : $3 } }; }
   | 'if' CONDITION BODY 'else' IF          { $$ = { 'if' : { 'condition' : $2, 'sentences' : $3 }, 'else': $5 }; }
   | 'if' CONDITION BODY 'else' BODY        { $$ = { 'if' : { 'condition' : $2, 'sentences' : $3 }, 'else': $5 }; }
   ;

SWITCH : 'switch' CONDITION '{' CASES DEFAULT '}'         { $$ = { 'condition' : $2, 'case_sentences' : $4, 'default': $5 }; }
       | 'switch' CONDITION '{' CASES '}'                 { $$ = { 'condition' : $2, 'case_sentences' : $4 }; }
       | 'switch' CONDITION '{' DEFAULT '}'               { $$ = { 'condition' : $2, 'default' : $4 }; }
       | 'switch' CONDITION '{' '}'                       { $$ = { 'condition' : $2 }; }
       | 'switch' CONDITION '{' error ERROR '}'           { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
       ;

CASES : CASES CASE      { $1.push($2); $$ = $1; }
      | CASE            { $$ = [$1]; }
      ;

CASE : 'case' EXPRESSION ':'                { $$ = { 'expression' : $2, 'sentences' : [] }; }
     | 'case' EXPRESSION ':' SENTENCES      { $$ = { 'expression' : $2, 'sentences' : $4 }; }
     | 'case' error                         { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
     ;

DEFAULT : 'default' ':'                 { $$ = { 'sentences' : [] }; }
        | 'default' ':' SENTENCES       { $$ = { 'sentences' : $3 }; }
        | 'default' error               { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
        ;

FOR : 'for' '(' TYPE 'identifier' ASSIGNMENT_EXPRESSION ';' EXPRESSION ';' ITERATOR ')' BODY    { $$ = { 'initializer' : { 'type' : $3, identifier: $4, 'value' : $5 }, 'condition' : $7, 'iterator' : $9, 'sentences' : $11 }; }
    | 'for' '(' 'identifier' ASSIGNMENT_EXPRESSION ';' EXPRESSION ';' ITERATOR ')' BODY         { $$ = { 'initializer' : { identifier: $3, 'value' : $4 }, 'condition' : $6, 'iterator' : $7, 'sentences' : $10 }; }
    | 'for' error                                                                               { errorList.push(new Error(idError, 'Syntactic error', this._$.first_line, this._$.first_column, yytext + ' Was expected ' + yy.parser.hash.expected)); console.error('Syntactic error: ' + yytext + ' Was expected ' + yy.parser.hash.expected + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
    ;

ITERATOR : 'identifier' '++'    { $$ = {'identifier': $1, 'value' : $1 + ' + 1' }; }
         | 'identifier' '--'    { $$ = {'identifier': $1, 'value' : $1 + ' - 1' }; }
         ;

WHILE : 'while' CONDITION BODY      { $$ = { 'condition' : $2, 'sentences' : $3 }; }
      ;

DOWHILE : 'do' BODY 'while' CONDITION ';'  { $$ = { 'sentences' : $2, 'while' : $4 }; }
        ;

RETURN : 'return' ';'               { $$ = ''; returnExpression = false; returnSentence = true; errorLine = this._$.first_line; errorcolumn = this._$.first_column; }
	   | 'return' EXPRESSION ';'    { $$ = $2; returnExpression = true; returnSentence = true; errorLine = this._$.first_line; errorcolumn = this._$.first_column; }
	   ;

BREAK : 'break' ';' { breakCounter++; errorLine = this._$.first_line; errorcolumn = this._$.first_column; }
	  ;

CONTINUE : 'continue' ';' { continueCounter++; errorLine = this._$.first_line; errorcolumn = this._$.first_column; }
	     ;

ERROR : '{'
      | '}'
      | '('
      | ')'
      | ':'
      ;
