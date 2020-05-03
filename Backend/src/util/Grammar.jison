%{
%}

/* lexical grammar */
%lex
%options case-sensitive
commentMultiline        (\/\*[\s\S]*?\*\/|\/\/.*)
identifier              (([a-zA-Z_])[a-zA-Z0-9_]*)
digit                   ([0-9]+)
decimal                 ({digit}("."{digit})?)
character               (')((?:\\(n|t|r|\\|"|')|(?:(?!\1).))?)\1
stringLiteral           (")((?:\\\1|(?:(?!\1).))*)\1

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
{digit}                 return 'digit'
{decimal}               return 'decimal'
{character}             return 'character'
{stringLiteral}         return 'stringLiteral'
<<EOF>>                 return 'EOF';
/lex

/* operator associations and precedence */
%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start START
%% /* language grammar */

START : IMPORT CLASS EOF
      | CLASS EOF
      | EOF
      ;

IMPORTS : IMPORTS IMPORT
        | IMPORT
        ;

IMPORT : 'import' 'identifier' ';'
       ;

CLASS : 'class' 'identifier' '{' BODYCLASS '}'
      | 'class' 'identifier' '{' '}'
      ;

BODYCLASS : BODYCLASS METHOD
          | BODYCLASS DECLARATION
          | METHOD
          | DECLARATION
          ;

METHOD : METHODTYPE 'identifier' '(' PARAMS ')' BODY
       | METHODTYPE 'identifier' '(' ')' BODY
       ;

METHODTYPE : TYPE
           | 'void'
           ;

TYPE : 'int'
     | 'double'
     | 'boolean'
     | 'char'
     | 'String'
     ;

PARAMS : PARAMS ',' PARAM
       | PARAM
       ;

PARAM : TYPE 'identifier'

BODY : '{' SENTENCES '}'
     | '{' '}'
     ;

SENTENCES : SENTENCES SENTENCE
          | SENTENCE
          ;

SENTENCE : DECLARATION
         |
