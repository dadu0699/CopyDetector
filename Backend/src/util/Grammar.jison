%{
    const { Error } = require('../models/Error');

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
","                     return ','
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

.                       { errorList.push(new Error(idError, yylloc.first_line, yylloc.first_column, yytext, 'Unknown pattern', 'Lexical Error')); console.error('Lexical Error: ' + yytext + ' in the line ' + yylloc.first_line + ' and column ' + yylloc.first_column); idError++; }
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
%left '++' '--'

%start START
%% /* language grammar */

START : IMPORT CLASS 'EOF' { return $2 }
      | CLASS 'EOF' { return $1 }
      | 'EOF'
      | error { errorList.push(new Error(idError, this._$.first_line, this._$.first_column, yytext, '', 'Syntactic error')); console.error('Syntactic error: ' + yytext + ' in the line ' + this._$.first_line + ' and column ' + this._$.first_column); idError++; }
      ;

IMPORTS : IMPORTS IMPORT { $1.push($2); $$ = $1; }
        | IMPORT { $$ = [$1]; }
        ;

IMPORT : 'import' 'identifier' ';'
       ;

CLASS : 'class' 'identifier' '{' BODYCLASS '}' { $$ = { 'class': $2, 'class_content': $4 }; }
      | 'class' 'identifier' '{' '}' { $$ = { 'class': $2, 'class_content': [] }; }
      ;

BODYCLASS : BODYCLASS METHOD { $1.push($2); $$ = $1; }
          | BODYCLASS DECLARATION { $1.push($2); $$ = $1; }
          | METHOD { $$ = [$1]; }
          | DECLARATION { $$ = [$1]; }
          ;

METHOD : 'void' 'identifier' '(' ')' BODY { $$ = {'method': $2, 'type': $1, 'method_params': [], 'method_content': $5 }; }
       | TYPE 'identifier' '(' ')' BODY { $$ = {'method': $2, 'type': $1, 'method_params': [], 'method_content': $5 }; }
       | 'void' 'identifier' '(' PARAMS ')' BODY { $$ = {'method': $2, 'type': $1, 'method_params': $4, 'method_content': $6 }; }
       | TYPE 'identifier' '(' PARAMS ')' BODY { $$ = {'method': $2, 'type': $1, 'method_params': $4, 'method_content': $6 }; }
       ;

TYPE : 'int' { $$ = 'int'; }
     | 'double' { $$ = 'double'; }
     | 'boolean' { $$ = 'boolean'; }
     | 'char' { $$ = 'char'; }
     | 'String' { $$ = 'String'; }
     ;

PARAMS : PARAMS ',' PARAM { $1.push($3); $$ = $1; }
       | PARAM { $$ = [$1]; }
       ;

PARAM : TYPE 'identifier' { $$ = { 'type': $1, 'identifier' : $2, 'range' : @$.range }; }
      ;

BODY : '{' '}' { $$ = []; }
     | '{' SENTENCES '}' { $$ = $2; }
     ;

SENTENCES : SENTENCES SENTENCE { $1.push($2); $$ = $1; }
          | SENTENCE { $$ = [$1]; }
          ;

SENTENCE : DECLARATION { $$ = {'declaration' : $1}; }
         | ASSIGNMENT { $$ = {'assignment' : $1}; }
         | INVOKEMETHOD ';'
         | SOUT
         | IF
         | SWITCH
         | FOR
         | WHILE
         | DOWHILE
         | RETURN
         | BREAK
         | CONTINUE
         ;

DECLARATION : TYPE IDLIST ASSIGNMENT_EXPRESSION ';'  { $$ = { 'type' : $1, identifiers: $2, 'value' : $3 }; }
            | TYPE IDLIST ';' { $$ = { 'type' : $1, 'id_list': $2 }; }
            ;

IDLIST : IDLIST ',' ID { $1.push($3); $$ = $1; }
       | ID { $$ = [$1]; }
       ;

ID : 'identifier' { $$ = [{'identifier': $1, 'range' : @$.range }]; }
   ;

ASSIGNMENT : 'identifier' ASSIGNMENT_EXPRESSION ';' { $$ = {'identifier': $1, 'value' : $2 }; }
           | ITERATOR ';' { $$ = $1; }
           ;

ITERATOR : 'identifier' '++' { $$ = {'identifier': $1, 'value' : identifier + '+ 1' }; }
         | 'identifier' '--' { $$ = {'identifier': $1, 'value' : identifier + '- 1' }; }
         ;

ASSIGNMENT_EXPRESSION : '=' EXPRESSION
                      ;

EXPRESSION : EXPRESSION '+' EXPRESSION
           | EXPRESSION '-' EXPRESSION
           | EXPRESSION '*' EXPRESSION
           | EXPRESSION '/' EXPRESSION
           | EXPRESSION '^' EXPRESSION
           | EXPRESSION '%' EXPRESSION
           | EXPRESSION '<' EXPRESSION
           | EXPRESSION '>' EXPRESSION
           | EXPRESSION '<=' EXPRESSION
           | EXPRESSION '>=' EXPRESSION
           | EXPRESSION '==' EXPRESSION
           | EXPRESSION '!=' EXPRESSION
           | EXPRESSION '||' EXPRESSION
           | EXPRESSION '&&' EXPRESSION
           | '(' EXPRESSION ')'
           | '-' EXPRESSION %prec UMINUS
           | '!' EXPRESSION
           | 'identifier'
           | 'stringLiteral'
           | 'character'
           | 'decimal'
           | 'true'
           | 'false'
           | INVOKEMETHOD
           ;

INVOKEMETHOD : 'identifier' '(' INVOKEMETHODPARAMS ')'
             | 'identifier' '(' ')'
             ;

INVOKEMETHODPARAMS : INVOKEMETHODPARAMS ',' EXPRESSION
                   | EXPRESSION
                   ;

SOUT : 'System' '.' 'out' 'println' '(' ')' ';'
     | 'System' '.' 'out' 'println' CONDITION ';'
     | 'System' '.' 'out' 'print' '(' ')' ';'
     | 'System' '.' 'out' 'print' CONDITION ';'
     ;

CONDITION : '(' EXPRESSION ')'
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
