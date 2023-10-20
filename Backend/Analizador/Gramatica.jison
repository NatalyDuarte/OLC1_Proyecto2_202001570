// ========================= ANALIZADOR LEXICO =================================
%lex
%options case-insensitive 

// Expresiones Regulares
real [0-9]+("."[0-9]+)?\b ;
entero  [0-9]+;

%%
// Reglas Lexicas
'.'          			{return 'PUNTO'}
'@'          			{return 'ARROBA'}
'('          			{return 'PARENABRE'}
')'          			{return 'PARENCIE'}
';'          			{return 'PUNTOYCOMA'}
','          			{return 'COMA'}
'+'          			{return 'MAS'}
'-'          			{return 'MENOS'}
'*'          			{return 'POR'}
'/'          			{return 'DIVI'} 
'%'          			{return 'MODULO'} 
'='          			{return 'IGUAL'} 
'!='          			{return 'DIFERENTE'} 
'<'          			{return 'MENOR'} 
'>'          			{return 'MAYOR'} 
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
columna\d+              { return 'COLUM'; } 
[a-zA-z][a-zA-z0-9_]*   { return 'VARI'; }
@[a-zA-z][a-zA-z0-9_]*   { return 'VARIABLE'; }

\"(\\.|[^\"\\])*\"   	{ return 'CADENA'; }
\'(\\.|[^\"\\])*\'   	{ return 'CADPR'; }



// Espacios en Blanco
"--".*					{}
\/\*[\s\S]*?\*\/  		{} 
[ \s\r\n\t]             {/* Comentarios se ignoran */}
[ \\]             		{/* Espacios se ignoran */}
[ \“\’\"\']             {/* Espacios se ignoran */}
// FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { 
    console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); 
    let s = Informacion.getInstance();
    s.add_Error(new Errores("Léxico"," El carácter "+yytext+" no pertenece al lenguaje", yylloc.first_line, yylloc.first_column));
    }


/lex
// ============================ ANALIZADOR SINTACTICO ===============================
%{
    const Dato = require("../interprete/expresiones/Dato.js");
    const Mostrar = require('../interprete/instrucciones/Mostrar.js');
    const Aritmetica = require('../interprete/expresiones/Aritmetica.js')
    const Asignar  = require('../interprete/instrucciones/Asignar')
    const Id = require('../interprete/expresiones/Id')
    const Errores = require('../interprete/instrucciones/Errores.js');
    const Informacion = require('../interprete/instrucciones/Informacion.js');
%}


//Precedencia

%left 'MAS'
%left 'POR'
%left 'MENOS'
%left 'DIVI'
%left 'MODULO'
%left 'IGUAL'
%left 'DIFERENTE'
%left 'MENOR'
%left 'MAYOR'
%left 'AND'
%left 'OR'
%left 'NOT'

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
   // : DECLARE asignacion                              { $$ = $1; }
    : declaracion                                       { $$ = $1; }
    | SELECT ARROBA tipo PUNTOYCOMA                   { $$ = new Mostrar($3,@3.first_line,@3.first_column); }
    | tipo                                              { $$ = $1; }
    /*| SET tipo PUNTOYCOMA
    | multiple { $$ = $1; }
    | PRINT tipo PUNTOYCOMA {$$ = new Print($2);}
    | PRINT lista_instrucciones PUNTOYCOMA {$$ = new Print($2);}
    | SELECT POR FROM VARI WHERE tipo PUNTOYCOMA  {$$ = new Select($4,$6);}
    | BEGIN lista_instrucciones END PUNTOYCOMA   {$$ = new Encapsula($2);}
    | CREATE TABLE VARI PARENABRE lista_instrucciones PARENCIE PUNTOYCOMA  {$$ = new Tabla($3,$5);}
    //Para crear tablas 
    | VARI INT COMA {$$ = new Columna($1,"int")}
    | VARI DOUBLE COMA {$$ = new Columna($1,"double")}
    | VARI DATE COMA {$$ = new Columna($1,"date")}
    | VARI VARCHAR COMA {$$ = new Columna($1,"string")}
    | VARI TRUE COMA {$$ = new Columna($1,"true")}
    | VARI FALSE COMA {$$ = new Columna($1,"false")}
    | VARI NULL COMA {$$ = new Columna($1,"null")}
    | VARI INT  {$$ = new Columna($1,"int")}
    | VARI DOUBLE {$$ = new Columna($1,"double")}
    | VARI DATE {$$ = new Columna($1,"date")}
    | VARI VARCHAR {$$ = new Columna($1,"string")}
    | VARI TRUE {$$ = new Columna($1,"true")}
    | VARI FALSE {$$ = new Columna($1,"false")}
    | VARI NULL {$$ = new Columna($1,"null")}*/
  /*  | VARI COMA 
    | ALTER TABLE VARI tipo PUNTOYCOMA
    | DROP TABLE VARI PUNTOYCOMA
    | INSERT INTO VARI PARENABRE lista_instrucciones PARENCIE VALUES PARENABRE tipo PARENCIE PUNTOYCOMA
    | SELECT tipo FROM VARI PUNTOYCOMA
    | SELECT POR FROM VARI PUNTOYCOMA
    | SELECT tipo FROM VARI WHERE tipo PUNTOYCOMA
    | SELECT tipo
    | SELECT VARI AS VARI PUNTOYCOMA
    | UPDATE VARI SET tipo WHERE tipo PUNTOYCOMA
    | TRUNCATE TABLE VARI PUNTOYCOMA
    | DELETE FROM VARI WHERE tipo PUNTOYCOMA
    | CAST PARENABRE tipo AS tipo PARENCIE
    | IF tipo THEN lista_instrucciones
    | IF tipo THEN lista_instrucciones ELSE lista_instrucciones END IF PUNTOYCOMA
    | ELSE tipo
    | CASE tipo lista_instrucciones END PUNTOYCOMA 
    | CASE tipo lista_instrucciones END AS tipo PUNTOYCOMA
    | WHEN tipo THEN tipo
    | WHILE tipo lista_instrucciones
    | FOR tipo IN tipo PUNTO PUNTO tipo lista_instrucciones*/
	| error	{
                console.log('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);
                let s = Informacion.getInstance();
                s.add_Error(new Errores("Sintáctico","No se esperaba en caracter "+ yytext,this._$.first_line,this._$.first_column));
                //ListaError.push(err);
                }
;

declaracion
    :SET ARROBA VARI IGUAL tipo PUNTOYCOMA           {$$ = new Asignar($3,$5,@3.first_line,@3.first_column);}
;


/*asignacion 
    : ARROBA VARI tipo COMA asignacion                                      {$$ = new Declara($2,null,$3.tipo,@2.first_line,@2.first_column);}
    | ARROBA VARI tipo PUNTOYCOMA                                           {$$ = new Declara($2,null,$3.tipo,@2.first_line,@2.first_column);}
    | ARROBA VARI INT DEFAULT REALES PUNTOYCOMA                             {$$ = new Declara($2,$5,$3,@2.first_line,@2.first_column);}
    | ARROBA VARI DATE DEFAULT DATEN PUNTOYCOMA                             {$$ = new Declara($2,$5,$3,@2.first_line,@2.first_column);}
    | ARROBA VARI DOUBLE DEFAULT REALES PUNTOYCOMA                          {$$ = new Declara($2,$5,$3,@2.first_line,@2.first_column);}
    | ARROBA VARI VARCHAR DEFAULT CADENA PUNTOYCOMA                         {$$ = new Declara($2,$5,$3,@2.first_line,@2.first_column);}
    | ARROBA VARI TRUE DEFAULT TRUE PUNTOYCOMA                              {$$ = new Declara($2,$5,$3,@2.first_line,@2.first_column);}
    | ARROBA VARI FALSE DEFAULT FALSE PUNTOYCOMA                            {$$ = new Declara($2,$5,$3,@2.first_line,@2.first_column);}
    | ARROBA VARI NULL DEFAULT NULL PUNTOYCOMA                              {$$ = new Declara($2,$5,$3,@2.first_line,@2.first_column);}
;*/
/*
multiple
    : multiple COMA  decVar { $$ = $1; }
    | decVar { $$ = $1; }
;

decVar
    : DECLARE var tipo  {$$ = new Declara($2, $3);}
    | var tipo          {$$ = new Declara($1, $2);}


var 
    : VARIABLE          {$$ = new Variable($1);}
;
*/
tipo
    : INT           {$$ = new Dato(null, 'int');}
    | DOUBLE        {$$ = new Dato(null, 'double');}
    | DATE          {$$ = new Dato(null, 'date');}
    | VARCHAR       {$$ = new Dato(null, 'varchar');}
    | TRUE          {$$ = new Dato(null, 'true');}
    | FALSE         {$$ = new Dato(null, 'false');}
    | NULL          {$$ = new Dato(null, 'null');}
    //Datos
    | REALES       {$$ = new Dato($1, 'int');}
    | DATEN        {$$ = new Dato($1, 'date');}
    | CADENA       {$$ = new Dato($1, 'varchar');}
    | CADPR        {$$ = new Dato($1, 'varchar');}
    | VARI         {$$ = new Id($1);}
    
    //| CADPR COMA  {$$ = new Dato('VARCHAR',$1);}
    //| VARI COMA  {$$ = new Dato('VARCHAR',$1);}
    //Operaciones Aritmeticas
    | tipo MAS tipo     {$$ = new Aritmetica($1, '+', $3,@3.first_line,@3.first_column)}
    | tipo POR tipo     {$$ = new Aritmetica($1, '*', $3,@3.first_line,@3.first_column)} 
    | tipo MENOS tipo   {$$ = new Aritmetica($1, '-', $3,@3.first_line,@3.first_column)} 
    | tipo DIVI tipo    {$$ = new Aritmetica($1, '/', $3,@3.first_line,@3.first_column)} 
    | tipo MODULO tipo  {$$ = new Aritmetica($1, '%', $3,@3.first_line,@3.first_column)} 
    //| MENOS tipo {$$ = new Aritmetica("Menos", 'Nega', $2)} 
    //| MAS tipo {$$ = new Aritmetica("Mas", 'Nega', $2)} 
    //Operaciones Relacionales
    /*| tipo IGUAL tipo {$$ = new Relacional($1, '=', $3)}
    | tipo DIFERENTE tipo {$$ = new Relacional($1, '!=', $3)}
    | tipo MENOR tipo {$$ = new Relacional($1, '<', $3)}
    | tipo MENOR IGUAL tipo {$$ = new Relacional($1, '<=', $3)}
    | tipo MAYOR tipo {$$ = new Relacional($1, '>', $3)}
    | tipo MAYOR IGUAL tipo {$$ = new Relacional($1, '>=', $3)}
    //Operadores Logicos
    | tipo AND tipo {$$ = new Logico($1, 'and', $3)}
    | tipo OR tipo {$$ = new Logico($1, 'or', $3)}
    | NOT tipo {$$ = new Logico(null, 'not', $2)}*/
    //Tablas
   /* | ADD VARI tipo 
    | DROP COLUMN VARI
    | RENAME TO VARI
    | RENAME COLUMN VARI TO VARI*/
;
