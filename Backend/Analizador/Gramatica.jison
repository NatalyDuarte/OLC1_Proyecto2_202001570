// ========================= ANALIZADOR LEXICO =================================
%lex
%options case-insensitive 

// Expresiones Regulares
real [0-9]+("."[0-9]+)?\b ;
entero  [0-9]+;

%%
// Reglas Lexicas
'('          			{return 'PARENABRE'}
')'          			{return 'PARENCIE'}
';'          			{return 'PUNTOYCOMA'}
','          			{return 'COMA'}
'+'          			{return 'MAS'}
'-'          			{return 'RESTA'}
'*'          			{return 'MULTI'}
'/'          			{return 'DIVI'} 
'+'          			{return 'MODULO'} 
'='          			{return 'IGUAL'} 
'=='          			{return 'IGUALIGUAL'} 
'!='          			{return 'DIFERENTE'} 
'<'          			{return 'MENOR'} 
'>'          			{return 'MAYOR'} 
'>='          			{return 'MAYORIGUAL'} 
'<='          			{return 'MENORIGUAL'} 
'int'    	 			{return 'INT'} 
'double'    			{return 'DOUBLE'} 
'date'    				{return 'DATE'} 
'varchar'    			{return 'VARCHAR'} 
'true'    				{return 'TRUE'} 
'false'    				{return 'FALSE'} 
'null'    				{return 'NULL'} 
'and'    				{return 'AND'} 
'or'    				{return 'OR'} 
'not'    				{return 'NOT'} 
'begin'    				{return 'BEGIN'} 
'end'    				{return 'END'} 
'declare'    			{return 'DECLARE'} 
'default'    			{return 'DEFAULT'} 
'set'    				{return 'SET'} 
'create'    			{return 'CREATE'} 
'table'    				{return 'TABLE'} 
'alter'    				{return 'ALTER'} 
'add'    				{return 'ADD'} 
'drop'    				{return 'DROP'} 
'column'    			{return 'COLUMN'} 
'rename'    			{return 'RENAME'} 
'to'    				{return 'TO'} 
'insert'    			{return 'INSERT'} 
'into'    				{return 'INTO'} 
'values'    			{return 'VALUES'} 
'select'    			{return 'SELECT'} 
'from'    				{return 'FROM'} 
'where'   			 	{return 'WHERE'} 
'update'    			{return 'UPDATE'} 
'truncate'    			{return 'TRUNCATE'} 
'delete'    			{return 'DELETE'} 
'cast'    				{return 'CAST'} 
'if'    				{return 'IF'} 
'then'    				{return 'THEN'} 
'else'    				{return 'ELSE'} 
'when'    				{return 'WHEN'} 
'case'    				{return 'CASE'} 
'while'    				{return 'WHILE'} 
'for'    				{return 'FOR'} 
'in'    				{return 'IN'} 
'break'    				{return 'BREAK'} 
'continue'    			{return 'CONTINUE'} 
'print'    				{return 'PRINT'} 
'funcion'    			{return 'FUNCION'} 
'returns'    			{return 'RETURNS'} 
'procedure'    			{return 'PROCEDURE'} 
'as'    				{return 'AS'} 
'lower'    				{return 'LOWER'} 
'upper'    				{return 'UPPER'} 
'round'    				{return 'ROUND'} 
'len'    				{return 'LEN'} 
'typeof'    			{return 'TYPEOF'} 

// La expresion regular del formato de fecha http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=fechas
\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])  {return 'DATEN';}
{real}                  { return 'REALES'; }
{entero}                { return 'ENTERO'; } 
@[a-zA-z][a-zA-z0-9_]*                { return 'VARIABLE'; }
\"(\\.|[^\"\\])*\"   	{ return 'CADENA'; }



// Espacios en Blanco
"--".*					{}
\/\*[\s\S]*?\*\/  		{} 
[ \s\r\n\t]             {/* Comentarios se ignoran */}
[ \\]             		{/* Espacios se ignoran */}
[ \“\’\"\']             {/* Espacios se ignoran */}
// FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ============================ ANALIZADOR SINTACTICO ===============================
%{
    const Dato = require('../interprete/expresiones/Dato.js');
    const Variable = require('../interprete/expresiones/Variable.js');
    const Mostrar = require('../interprete/instrucciones/Mostrar.js');
    const Declara = require('../interprete/instrucciones/Declara.js');
%}


//Precedencia

//%left 'MAS' 'MENOS'


// Simbolo Inicial
//Base de la Gramatica(inicio,lista_instrucciones,instruccion,expresion) https://github.com/AlexIngGuerra/OLC1-2S2023
%start inicio


%% //  Gramatica

inicio
	: lista_instrucciones EOF {$$ = $1; return $$;}
;

lista_instrucciones
    : lista_instrucciones instruccion  {$$ = $1; $$.push($2);}
    | instruccion  {$$ = []; $$.push($1)}
;

instruccion
	: DECLARE var tipo PUNTOYCOMA   {$$ = new Declara($2, $3);}
    | SET var IGUAL valor PUNTOYCOMA           {$$ = new Declara($2, $4);}
    | multiple { $$ = $1; }
	| error PYC	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;

multiple
    : multiple COMA  decVar { $$ = $1; }
    | decVar { $$ = $1; }
;

decVar
    : DECLARE var tipo  {$$ = new Declara($2, $3);}
    | var tipo          {$$ = new Declara($1, $2);}
;

var 
    : VARIABLE          {$$ = new Variable($1);}
;

valor
    : REALES       {$$ = new Dato('INT',$1);}
    | DATEN       {$$ = new Dato('DATE',$1);}
    | CADENA       {$$ = new Dato('VARCHAR',$1);}
    | TRUE       {$$ = new Dato('TRUE',$1);}
    | FALSE       {$$ = new Dato('FALSE',$1);}
    | NULL       {$$ = new Dato('NULL',$1);}
;

tipo
    : INT        {$$ = new  Dato('INT',null);}
    | DOUBLE        {$$ = new  Dato('DOUBLE',null);}
    | DATE        {$$ = new  Dato('DATE',null);}
    | VARCHAR        {$$ = new  Dato('VARCHAR',null);}
    | TRUE        {$$ = new  Dato('TRUE',null);}
    | FALSE        {$$ = new  Dato('FALSE',null);}
    | NULL        {$$ = new  Dato('NULL',null);}
    | INT DEFAULT REALES       {$$ = new Dato('INT',$3);}
    | DATE DEFAULT DATEN       {$$ = new Dato('DATE',$3);}
    | DOUBLE DEFAULT REALES       {$$ = new Dato('DOUBLE',$3);}
    | VARCHAR DEFAULT CADENA       {$$ = new Dato('VARCHAR',$3);}
    | TRUE DEFAULT TRUE       {$$ = new Dato('TRUE',$3);}
    | FALSE DEFAULT FALSE       {$$ = new Dato('FALSE',$3);}
    | NULL DEFAULT NULL       {$$ = new Dato('NULL',$3);}
;