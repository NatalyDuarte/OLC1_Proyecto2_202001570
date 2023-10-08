// =================================== ANALIZADOR LEXICO ===============================================
%lex
%options case-insensitive 
%%
//Base del lexer https://github.com/AlexIngGuerra/OLC1-2S2023
// ------------  Reglas Lexicas -------------------
"--".*					{}
\/\*[\s\S]*?\*\/  		{}  

'('          			return 'PARENABRE';
')'          			return 'PARENCIE';
';'          			return 'PUNTOYCOMA';
','          			return 'COMA';
'+'          			return 'MAS';
'-'          			return 'RESTA';
'*'          			return 'MULTI';
'/'          			return 'DIVI';
'+'          			return 'MODULO';
'='          			return 'IGUAL';
'=='          			return 'IGUALIGUAL';
'!='          			return 'DIFERENTE';
'<'          			return 'MENOR';
'>'          			return 'MAYOR';
'>='          			return 'MAYORIGUAL';
'<='          			return 'MENORIGUAL';
'int'    	 			return 'INT';
'double'    			return 'DOUBLE';
'date'    				return 'DATE';
'varchar'    			return 'VARCHAR';
'true'    				return 'TRUE';
'false'    				return 'FALSE';
'null'    				return 'NULL';
'and'    				return 'AND';
'or'    				return 'OR';
'not'    				return 'NOT';
'begin'    				return 'BEGIN';
'end'    				return 'END';
'declare'    			return 'DECLARE';
'default'    			return 'DEFAULT';
'set'    				return 'SET';
'create'    			return 'CREATE';
'table'    				return 'TABLE';
'alter'    				return 'ALTER';
'add'    				return 'ADD';
'drop'    				return 'DROP';
'column'    			return 'COLUMN';
'rename'    			return 'RENAME';
'to'    				return 'TO';
'insert'    			return 'INSERT';
'into'    				return 'INTO';
'values'    			return 'VALUES';
'select'    			return 'SELECT';
'from'    				return 'FROM';
'where'   			 	return 'WHERE';
'update'    			return 'UPDATE';
'truncate'    			return 'TRUNCATE';
'delete'    			return 'DELETE';
'cast'    				return 'CAST';
'if'    				return 'IF';
'then'    				return 'THEN';
'else'    				return 'ELSE';
'when'    				return 'WHEN';
'case'    				return 'CASE';
'while'    				return 'WHILE';
'for'    				return 'FOR';
'in'    				return 'IN';
'break'    				return 'BREAK';
'continue'    			return 'CONTINUE';
'print'    				return 'PRINT';
'funcion'    			return 'FUNCION';
'returns'    			return 'RETURNS';
'procedure'    			return 'PROCEDURE';
'as'    				return 'AS';
'lower'    				return 'LOWER';
'upper'    				return 'UPPER';
'round'    				return 'ROUND';
'len'    				return 'LEN';
'typeof'    			return 'TYPEOF';
// La expresion regular del formato de fecha http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=fechas
^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$  return 'DATEN';
[0-9]+("."[0-9]+)?\b          								return 'REALES'; 
[0-9]+                        								return 'ENTERO'; 
^@[^ ]+$                                                    return 'VARIABLE';

\"(\\.|[^\"\\])*\"   	return 'CADENA';
			 

// ------------- Espacios en Blanco ------------------
[ \s\r\n\t]             {/* Espacios se ignoran */}
[ \\]             		{/* Espacios se ignoran */}
[ \“\’\"\']             {/* Espacios se ignoran */}

//------------- Errores Léxicos y fin cadena ------------------
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// =================================== ANALIZADOR SINTACTICO ===============================================
%{
    const { Declaracion } = require('../Interprete/Declaracion.ts');
    const { Instruccion } = require('../Interprete/Instruccion.ts');
%}
// ----------  Precedencia------------------------

//%left 'MAS' 'MENOS'


// -------- Simbolo Inicial ------------------------
%start inicio


%% // -------- Gramatica ----------------------------
//Base de la gramatica https://github.com/AlexIngGuerra/OLC1-2S2023
inicio
	: lista_instrucciones EOF { return $1; }
;

lista_instrucciones
    : lista_instrucciones instruccion  { $1.push($2); $$ =$1; }
    | instruccion  { $$ = [$1] }
;

instruccion
    : declaracion               { $$ = $1; }
	| error PYC	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;

declaracion
    : DECLARE VARIABLE tipovari PUNTOYCOMA           { $$ = new Declaracion($1,$2,@1.first_line,@1.first_column);}
;

tipovari
    : INT                   { $$ = $1; }
    | DOUBLE                { $$ = $1; }
    | DATE                  { $$ = $1; }
    | VARCHAR               { $$ = $1; }
    | TRUE                  { $$ = $1; }
    | FALSE                 { $$ = $1; }
    | NULL                  { $$ = $1; }
;

