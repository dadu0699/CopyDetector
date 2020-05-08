%{
    const { Type } = require('../models/Type');
    const { Error } = require('../models/Error');

    const { Assignment } = require('../controllers/Assignment');
    const { BreakS } = require('../controllers/BreakS');
    const { CaseS } = require('../controllers/CaseS');
    const { ClassS } = require('../controllers/ClassS');
    const { Condition } = require('../controllers/Condition');
    const { ContinueS } = require('../controllers/ContinueS');
    const { Declaration } = require('../controllers/Declaration');
    const { DefaultS } = require('../controllers/DefaultS');
    const { DoWhile } = require('../controllers/DoWhile');
    const { ForS } = require('../controllers/ForS');
    const { IfS } = require('../controllers/IfS');
    const { ImportS } = require('../controllers/ImportS');
    const { InvokeMethod } = require('../controllers/InvokeMethod');
    const { IterationS } = require('../controllers/IterationS');
    const { MethodS } = require('../controllers/MethodS');
    const { Param } = require('../controllers/Param');
    const { Primitive } = require('../controllers/Primitive');
    const { Print } = require('../controllers/Print');
    const { ReturnS } = require('../controllers/ReturnS');
    const { SwitchS } = require('../controllers/SwitchS');
    const { WhileS } = require('../controllers/WhileS');

    var errorList = [];
    var idError = 1;
%}

/* lexical grammar */
%lex
%options case-sensitive
commentMultiline        (\/\*[\s\S]*?\*\/|\/\/.*)
identifier              (([a-zA-Z_])[a-zA-Z0-9_]*)
digit                   ([0-9]+)
decimal                 ({digit}("."{digit})?)
character               (("\'")((?:\\("n"|"t"|"r"|"\\"|"\""|"\'")|(?:(?!\1).))?)\1)
stringLiteral           (("\"")((?:\\\1|(?:(?!\1).))*)\1)

%%
\s+                     /* skip whitespace */
{commentMultiline}      /* skip Single Line Comment AND Multiline Comment */

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
"print"                 return 'print'
"println"               return 'println'
"return"                return 'return'
"String"                return 'String'
"switch"                return 'switch'
"System"                return 'System'
"true"                  return 'true'
"void"                  return 'void'
"while"                 return 'while'
"{"                     return '{'
"}"                     return '}'
"("                     return '('
")"                     return ')'
","                     return '"'
"."                     return '.'
":"                     return ':'
";"                     return ';'
"="                     return '='
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"^"                     return '^'
"%"                     return '%'
"++"                    return '++'
"--"                    return '--'
"=="                    return '=='
"!="                    return '!='
">"                     return '>'
">="                    return '>='
"<"                     return '<'
"<="                    return '<='
"&&"                    return '&&'
"||"                    return '||'
"!"                     return '!'
{identifier}            return 'identifier'
{decimal}               return 'decimal'
{character}             return 'character'
{stringLiteral}         return 'stringLiteral'
<<EOF>>                 return 'EOF';

.                       { /*this.errorList.push(new Error(idError,  yylloc.first_line, yylloc.first_column, yytext, 'Unknown pattern', 'Lexical Error'));*/ console.error('Lexical Error: ' + yytext + ', in the line ' + yylloc.first_line + ' and column ' + yylloc.first_column); this.idError++; }
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

%start START
%% /* language grammar */

START : IMPORT CLASS 'EOF' { return $2 }
      | CLASS 'EOF' { return $1 }
      | 'EOF'
      | error { /*this.errorList.push(new Error(idError, this._$.first_line, this._$.first_column, yytext, '', 'Syntactic error')); */console.error('Syntactic error: ' + yytext + ', in the line ' + this._$.first_line + ' and column ' + this._$.first_column); this.idError++; }
      ;

IMPORTS : IMPORTS IMPORT { $1.push($2); $$ = $1; }
        | IMPORT { $$ = [$1]; }
        ;

IMPORT : 'import' 'identifier' ';' { $$ = new ImportS($2, this._$.first_line, this._$.first_column); }
       ;

CLASS : 'class' 'identifier' '{' BODYCLASS '}' { $$ = new ClassS($2, $4, this._$.first_line, this._$.first_column); }
      | 'class' 'identifier' '{' '}' { $$ = new ClassS($2, null, this._$.first_line, this._$.first_column); }
      ;

BODYCLASS : BODYCLASS METHOD { $1.push($2); $$ = $1; }
          | BODYCLASS DECLARATION { $1.push($2); $$ = $1; }
          | METHOD { $$ = [$1]; }
          | DECLARATION { $$ = [$1]; }
          ;

METHOD : 'void' 'identifier' '(' PARAMS ')' BODY { $$ = new MethodS(Type.void, $2, $4, $6, this._$.first_line, this._$.first_column); }
       | TYPE 'identifier' '(' PARAMS ')' BODY { $$ = new MethodS($1, $2, $4, $6, this._$.first_line, this._$.first_column); }
       | 'void' 'identifier' '(' ')' BODY { $$ = new MethodS(Type.void, $2, [], $6, this._$.first_line, this._$.first_column); }
       | TYPE 'identifier' '(' ')' BODY { $$ = new MethodS($1, $2, [], $6, this._$.first_line, this._$.first_column); }
       ;

TYPE : 'int' { $$ = Type.int; }
     | 'double' { $$ = Type.double; }
     | 'boolean' { $$ = Type.boolean; }
     | 'char' { $$ = Type.char; }
     | 'String' { $$ = Type.String; }
     ;

PARAMS : PARAMS ',' PARAM { $1.push($3); $$ = $1; }
       | PARAM { $$ = [$1]; }
       ;

PARAM : TYPE 'identifier' { $$ = new Param($1, $2, this._$.first_line, this._$.first_column) }
      ;

BODY : '{' SENTENCES '}' { $$ = [$1]; }
     | '{' '}' { $$ = []; }
     ;

SENTENCES : SENTENCES SENTENCE { $1.push($2); $$ = $1; }
          | SENTENCE { $$ = [$1]; }
          ;

SENTENCE : DECLARATION { $$ = $1; }
         | ASSIGNMENT { $$ = $1; }
         | INVOKEMETHOD ';' { $$ = $1; }
         | SOUT { $$ = $1; }
         | IF { $$ = $1; }
         | SWITCH { $$ = $1; }
         | FOR { $$ = $1; }
         | WHILE { $$ = $1; }
         | DOWHILE { $$ = $1; }
         | RETURN { $$ = $1; }
         | BREAK { $$ = $1; }
         | CONTINUE { $$ = $1; }
         ;

DECLARATION : TYPE IDLIST ASSIGNMENT_EXPRESSION ';' { $$ = new Declaration($1, $2, $3, this._$.first_line, this._$.first_column); }
            | TYPE IDLIST ';' { $$ = new Declaration($1, $2, null, this._$.first_line, this._$.first_column); }
            ;

IDLIST : IDLIST ',' 'identifier' { $1.push($2); $$ = $1; }
       | 'identifier' { $$ = [$1]; }
       ;

ASSIGNMENT : 'identifier' ASSIGNMENT_EXPRESSION ';'  {$$ = new Assignment($1, $2, this._$.first_line, this._$.first_column); }
           | ITERATOR ';' {$$ = $1;}
           ;

ITERATOR : 'identifier' '++' {$$ = new Assignment($1, $2, this._$.first_line, this._$.first_column); }
         | 'identifier' '--' {$$ = new Assignment($1, $2, this._$.first_line, this._$.first_column); }
         ;

ASSIGNMENT_EXPRESSION : '=' EXPRESSION { $$ = $1; }
                      ;

EXPRESSION : EXPRESSION '+' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '-' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '*' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '/' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '^' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '%' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '<' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '>' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '<=' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '>=' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '==' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '!=' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '||' EXPRESSION { $$ = ($1 + $2 + $3); }
           | EXPRESSION '&&' EXPRESSION { $$ = ($1 + $2 + $3); }
           | '(' EXPRESSION ')'  { $$ = ($1 + $2 + $3); }
           | '-' EXPRESSION %prec UMINUS  { $$ = ($1 + $2); }
           | '!' EXPRESSION  { $$ = ($1 + $2); }
           | 'identifier' { $$ = $1; }
           | 'stringLiteral' { $$ = $1; }
           | 'character' { $$ = $1; }
           | 'decimal' { $$ = $1; }
           | 'true' { $$ = $1; }
           | 'false' { $$ = $1; }
           | INVOKEMETHOD { $$ = $1; }
           ;

INVOKEMETHOD : 'identifier' '(' INVOKEMETHODPARAMS ')' { $$ = new InvokeMethod($1, $3); }
             | 'identifier' '(' ')' { $$ = new InvokeMethod($1, null); }
             ;

INVOKEMETHODPARAMS : INVOKEMETHODPARAMS ',' EXPRESSION { $1.push($3); $$ = $1; }
                   | EXPRESSION { $$ = $1; }
                   ;

SOUT : 'System' '.' 'out' 'println' '(' ')' ';' { $$ = new Print(Type.println, null, this._$.first_line, this._$.first_column); }
     | 'System' '.' 'out' 'println' CONDITION ';'  { $$ = new Print(Type.println, $5, this._$.first_line, this._$.first_column); }
     | 'System' '.' 'out' 'print' '(' ')' ';' { $$ = new Print(Type.print, null, this._$.first_line, this._$.first_column); }
     | 'System' '.' 'out' 'print' CONDITION ';' { $$ = new Print(Type.print, $5, this._$.first_line, this._$.first_column); }
     ;

CONDITION : '(' EXPRESSION ')' { $$ = $2; }
          ;

IF : 'if' CONDITION BODY
   | 'if' CONDITION BODY 'else' IF
   | 'if' CONDITION BODY 'else' BODY
   ;

SWITCH : 'switch' CONDITION '{' CASE DEFAULT '}'
       | 'switch' CONDITION '{' CASE '}'
       | 'switch' CONDITION '{' DEFAULT '}'
       | 'switch' CONDITION '{' '}'
       ;

CASE : CASE 'case' EXPRESSION ':' SENTENCES
     | CASE 'case' EXPRESSION ':'
     | 'case' EXPRESSION ':' SENTENCES
     | 'case' EXPRESSION ':'
     ;

DEFAULT : 'default' ':' SENTENCES
        | 'default' ':'
        ;

FOR : 'for' '(' TYPE 'identifier' ASSIGNMENT_EXPRESSION ';' EXPRESSION ';' ITERATOR ')' BODY
    | 'for' '(' 'identifier' ASSIGNMENT_EXPRESSION ';' EXPRESSION ';' ITERATOR ')' BODY
    ;

WHILE : 'while' CONDITION BODY
      ;

DO : 'do' BODY WHILE CONDITION ';'
   ;

RETURN : 'return' EXPRESSION ';'
	   | 'return' ';'
	   ;

BREAK : 'break' ';'
	  ;

CONTINUE : 'continue' ';'
	     ;
