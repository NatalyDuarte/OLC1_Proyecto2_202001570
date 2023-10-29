// ========================= ANALIZADOR LEXICO =================================
%lex
%options case-insensitive 
// Base https://github.com/AlexIngGuerra/OLC1-2S2023
// Expresiones Regulares
real [0-9]+("."[0-9]+)?\b ;
entero  [0-9]+;

%%
// Reglas Lexicas
'.'          			{let sa = Informacion.getInstance();
                        sa.add_Token(new Token(yytext,"Punto", yylloc.first_line, yylloc.first_column));
                        return 'PUNTO'}
'@'          			{let sb = Informacion.getInstance();
                        sb.add_Token(new Token(yytext,"Arroba", yylloc.first_line, yylloc.first_column));
                        return 'ARROBA'}
'('          			{let sf = Informacion.getInstance();
                        sf.add_Token(new Token(yytext,"Parentesis abre", yylloc.first_line, yylloc.first_column));
                        return 'PARENABRE'}
')'          			{let sg = Informacion.getInstance();
                        sg.add_Token(new Token(yytext,"Parentesis cierra", yylloc.first_line, yylloc.first_column));
                        return 'PARENCIE'}
';'          			{let se = Informacion.getInstance();
                        se.add_Token(new Token(yytext,"Punto y coma", yylloc.first_line, yylloc.first_column));
                        return 'PUNTOYCOMA'}
','          			{let sh = Informacion.getInstance();
                        sh.add_Token(new Token(yytext,"Coma", yylloc.first_line, yylloc.first_column));
                        return 'COMA'}
'+'          			{let si = Informacion.getInstance();
                        si.add_Token(new Token(yytext,"Mas", yylloc.first_line, yylloc.first_column));
                        return 'MAS'}
'-'          			{let sj = Informacion.getInstance();
                        sj.add_Token(new Token(yytext,"Menos", yylloc.first_line, yylloc.first_column));
                        return 'MENOS'}
'*'          			{let sk = Informacion.getInstance();
                        sk.add_Token(new Token(yytext,"Por", yylloc.first_line, yylloc.first_column));
                        return 'POR'}
'/'          			{let sl = Informacion.getInstance();
                        sl.add_Token(new Token(yytext,"Division", yylloc.first_line, yylloc.first_column));
                        return 'DIVI'} 
'%'          			{let sm = Informacion.getInstance();
                        sm.add_Token(new Token(yytext,"Modulo", yylloc.first_line, yylloc.first_column));
                        return 'MODULO'} 
'='          			{let sn = Informacion.getInstance();
                        sn.add_Token(new Token(yytext,"Igual", yylloc.first_line, yylloc.first_column));
                        return 'IGUAL'} 
'!='          			{let so = Informacion.getInstance();
                        so.add_Token(new Token(yytext,"Diferente", yylloc.first_line, yylloc.first_column));
                        return 'DIFERENTE'} 
'<'          			{let sp = Informacion.getInstance();
                        sp.add_Token(new Token(yytext,"Menor", yylloc.first_line, yylloc.first_column));
                        return 'MENOR'} 
'>'          			{let sq = Informacion.getInstance();
                        sq.add_Token(new Token(yytext,"Mayor", yylloc.first_line, yylloc.first_column));
                        return 'MAYOR'} 
'int'    	 			{let sr = Informacion.getInstance();
                        sr.add_Token(new Token(yytext,"Int", yylloc.first_line, yylloc.first_column));
                        return 'INT'} 
'double'    			{let ss = Informacion.getInstance();
                        ss.add_Token(new Token(yytext,"Double", yylloc.first_line, yylloc.first_column));
                        return 'DOUBLE'} 
'date'    				{let st = Informacion.getInstance();
                        st.add_Token(new Token(yytext,"Date", yylloc.first_line, yylloc.first_column));
                        return 'DATE'} 
'varchar'    			{let sd = Informacion.getInstance();
                        sd.add_Token(new Token(yytext,"Varchar", yylloc.first_line, yylloc.first_column));
                        return 'VARCHAR'} 
'true'    				{let su = Informacion.getInstance();
                        su.add_Token(new Token(yytext,"True", yylloc.first_line, yylloc.first_column));
                        return 'TRUE'} 
'false'    				{let sv = Informacion.getInstance();
                        sv.add_Token(new Token(yytext,"False", yylloc.first_line, yylloc.first_column));
                        return 'FALSE'} 
'null'    				{let sw = Informacion.getInstance();
                        sw.add_Token(new Token(yytext,"Null", yylloc.first_line, yylloc.first_column));
                        return 'NULL'} 
'and'    				{let sx = Informacion.getInstance();
                        sx.add_Token(new Token(yytext,"And", yylloc.first_line, yylloc.first_column));
                        return 'AND'} 
'or'    				{let sy = Informacion.getInstance();
                        sy.add_Token(new Token(yytext,"Or", yylloc.first_line, yylloc.first_column));
                        return 'OR'} 
'not'    				{let sz = Informacion.getInstance();
                        sz.add_Token(new Token(yytext,"Not", yylloc.first_line, yylloc.first_column));
                        return 'NOT'} 
'begin'    				{let a = Informacion.getInstance();
                        a.add_Token(new Token(yytext,"Begin", yylloc.first_line, yylloc.first_column));
                        return 'BEGIN'} 
'end'    				{let ab = Informacion.getInstance();
                        ab.add_Token(new Token(yytext,"End", yylloc.first_line, yylloc.first_column));
                        return 'END'} 
'declare'    			{let ac = Informacion.getInstance();
                        ac.add_Token(new Token(yytext,"Declare", yylloc.first_line, yylloc.first_column));
                        return 'DECLARE'} 
'default'    			{let ad = Informacion.getInstance();
                        ad.add_Token(new Token(yytext,"Default", yylloc.first_line, yylloc.first_column));
                        return 'DEFAULT'} 
'set'    				{let ae = Informacion.getInstance();
                        ae.add_Token(new Token(yytext,"Set", yylloc.first_line, yylloc.first_column));
                        return 'SET'} 
'create'    			{let af = Informacion.getInstance();
                        af.add_Token(new Token(yytext,"Create", yylloc.first_line, yylloc.first_column));
                        return 'CREATE'} 
'table'    				{let ag = Informacion.getInstance();
                        ag.add_Token(new Token(yytext,"Table", yylloc.first_line, yylloc.first_column));
                        return 'TABLE'} 
'alter'    				{let ah = Informacion.getInstance();
                        ah.add_Token(new Token(yytext,"Alter", yylloc.first_line, yylloc.first_column));
                        return 'ALTER'} 
'add'    				{let ai = Informacion.getInstance();
                        ai.add_Token(new Token(yytext,"Add", yylloc.first_line, yylloc.first_column));
                        return 'ADD'} 
'drop'    				{let aj = Informacion.getInstance();
                        aj.add_Token(new Token(yytext,"Drop", yylloc.first_line, yylloc.first_column));
                        return 'DROP'} 
'column'    			{let ak = Informacion.getInstance();
                        ak.add_Token(new Token(yytext,"Column", yylloc.first_line, yylloc.first_column));
                        return 'COLUMN'} 
'rename'    			{let al = Informacion.getInstance();
                        al.add_Token(new Token(yytext,"Rename", yylloc.first_line, yylloc.first_column));
                        return 'RENAME'} 
'to'    				{let am = Informacion.getInstance();
                        am.add_Token(new Token(yytext,"To", yylloc.first_line, yylloc.first_column));
                        return 'TO'} 
'insert'    			{let an = Informacion.getInstance();
                        an.add_Token(new Token(yytext,"Insert", yylloc.first_line, yylloc.first_column));
                        return 'INSERT'} 
'into'    				{let ao = Informacion.getInstance();
                        ao.add_Token(new Token(yytext,"Into", yylloc.first_line, yylloc.first_column));
                        return 'INTO'} 
'values'    			{let ap = Informacion.getInstance();
                        ap.add_Token(new Token(yytext,"Values", yylloc.first_line, yylloc.first_column));
                        return 'VALUES'} 
'select'    			{let aq = Informacion.getInstance();
                        aq.add_Token(new Token(yytext,"Select", yylloc.first_line, yylloc.first_column));
                        return 'SELECT'} 
'from'    				{let ar = Informacion.getInstance();
                        ar.add_Token(new Token(yytext,"From", yylloc.first_line, yylloc.first_column));
                        return 'FROM'} 
'where'   			 	{let as = Informacion.getInstance();
                        as.add_Token(new Token(yytext,"Where", yylloc.first_line, yylloc.first_column));
                        return 'WHERE'} 
'update'    			{let at = Informacion.getInstance();
                        at.add_Token(new Token(yytext,"Update", yylloc.first_line, yylloc.first_column));
                        return 'UPDATE'} 
'truncate'    			{let au = Informacion.getInstance();
                        au.add_Token(new Token(yytext,"Truncate", yylloc.first_line, yylloc.first_column));
                        return 'TRUNCATE'} 
'delete'    			{let av = Informacion.getInstance();
                        av.add_Token(new Token(yytext,"Delete", yylloc.first_line, yylloc.first_column));
                        return 'DELETE'} 
'cast'    				{let aw = Informacion.getInstance();
                        aw.add_Token(new Token(yytext,"Cast", yylloc.first_line, yylloc.first_column));
                        return 'CAST'} 
'if'    				{let ax = Informacion.getInstance();
                        ax.add_Token(new Token(yytext,"If", yylloc.first_line, yylloc.first_column));
                        return 'IF'} 
'then'    				{let ay = Informacion.getInstance();
                        ay.add_Token(new Token(yytext,"Then", yylloc.first_line, yylloc.first_column));
                        return 'THEN'} 
'else'    				{let az = Informacion.getInstance();
                        az.add_Token(new Token(yytext,"Else", yylloc.first_line, yylloc.first_column));
                        return 'ELSE'} 
'when'    				{let b = Informacion.getInstance();
                        b.add_Token(new Token(yytext,"When", yylloc.first_line, yylloc.first_column));
                        return 'WHEN'} 
'case'    				{let ba = Informacion.getInstance();
                        ba.add_Token(new Token(yytext,"Case", yylloc.first_line, yylloc.first_column));
                        return 'CASE'} 
'while'    				{let bb = Informacion.getInstance();
                        bb.add_Token(new Token(yytext,"While", yylloc.first_line, yylloc.first_column));
                        return 'WHILE'} 
'for'    				{let bc = Informacion.getInstance();
                        bc.add_Token(new Token(yytext,"For", yylloc.first_line, yylloc.first_column));
                        return 'FOR'} 
'in'    				{let bd = Informacion.getInstance();
                        bd.add_Token(new Token(yytext,"In", yylloc.first_line, yylloc.first_column));
                        return 'IN'} 
'break'    				{let be = Informacion.getInstance();
                        be.add_Token(new Token(yytext,"Break", yylloc.first_line, yylloc.first_column));
                        return 'BREAK'} 
'continue'    			{let bf = Informacion.getInstance();
                        bf.add_Token(new Token(yytext,"Continue", yylloc.first_line, yylloc.first_column));
                        return 'CONTINUE'} 
'print'    				{let bg = Informacion.getInstance();
                        bg.add_Token(new Token(yytext,"Print", yylloc.first_line, yylloc.first_column));
                        return 'PRINT'} 
'function'    			{let bh = Informacion.getInstance();
                        bh.add_Token(new Token(yytext,"Function", yylloc.first_line, yylloc.first_column));
                        return 'FUNCTION'} 
'returns'    			{let bi = Informacion.getInstance();
                        bi.add_Token(new Token(yytext,"Returns", yylloc.first_line, yylloc.first_column));
                        return 'RETURNS'} 
'procedure'    			{let bj = Informacion.getInstance();
                        bj.add_Token(new Token(yytext,"Procedure", yylloc.first_line, yylloc.first_column));
                        return 'PROCEDURE'} 
'as'    				{let bk = Informacion.getInstance();
                        bk.add_Token(new Token(yytext,"As", yylloc.first_line, yylloc.first_column));
                        return 'AS'} 
'lower'    				{let bl = Informacion.getInstance();
                        bl.add_Token(new Token(yytext,"Lower", yylloc.first_line, yylloc.first_column));
                        return 'LOWER'} 
'upper'    				{let bm = Informacion.getInstance();
                        bm.add_Token(new Token(yytext,"Upper", yylloc.first_line, yylloc.first_column));
                        return 'UPPER'} 
'round'    				{let bn = Informacion.getInstance();
                        bn.add_Token(new Token(yytext,"Round", yylloc.first_line, yylloc.first_column));
                        return 'ROUND'} 
'len'    				{let bo = Informacion.getInstance();
                        bo.add_Token(new Token(yytext,"Len", yylloc.first_line, yylloc.first_column));
                        return 'LEN'} 
'typeof'    			{let bq = Informacion.getInstance();
                        bq.add_Token(new Token(yytext,"Typeof", yylloc.first_line, yylloc.first_column));
                        return 'TYPEOF'} 
'return'    			{let bza = Informacion.getInstance();
                        bza.add_Token(new Token(yytext,"Return", yylloc.first_line, yylloc.first_column));
                        return 'RETURN'} 
'call'    			    {let bze = Informacion.getInstance();
                        bze.add_Token(new Token(yytext,"Call", yylloc.first_line, yylloc.first_column));
                        return 'CALL'} 
// La expresion regular del formato de fecha http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=fechas
\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])  {let br = Informacion.getInstance();
                        br.add_Token(new Token(yytext,"Fecha", yylloc.first_line, yylloc.first_column));
                        return 'DATEN';}
{real}                  {let bs = Informacion.getInstance();
                        bs.add_Token(new Token(yytext,"Numero Real", yylloc.first_line, yylloc.first_column));
                        return 'REALES'; }
{entero}                {let bt = Informacion.getInstance();
                        bt.add_Token(new Token(yytext,"Numero Entero", yylloc.first_line, yylloc.first_column));
                         return 'ENTERO'; } 
columna\d+              { let bu = Informacion.getInstance();
                        bu.add_Token(new Token(yytext,"Columna", yylloc.first_line, yylloc.first_column));
                        return 'COLUM'; } 
[a-zA-z][a-zA-z0-9_]*   { let sc = Informacion.getInstance();
                        sc.add_Token(new Token(yytext,"Nombre Variable", yylloc.first_line, yylloc.first_column));
                        return 'VARI'; }
@[a-zA-z][a-zA-z0-9_]*   {let bv = Informacion.getInstance();
                        bv.add_Token(new Token(yytext,"Variable", yylloc.first_line, yylloc.first_column));
                         return 'VARIABLE'; }

\"(\\.|[^\"\\])*\"   	{ let bw = Informacion.getInstance();
                        bw.add_Token(new Token(yytext,"Cadena", yylloc.first_line, yylloc.first_column));
                        return 'CADENA'; }
\'(\\.|[^\"\\])*\'   	{let bx = Informacion.getInstance();
                        bx.add_Token(new Token(yytext,"Cadena", yylloc.first_line, yylloc.first_column));
                         return 'CADPR'; }



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
    const ColumnaE = require("../interprete/expresiones/ColumnaE.js");
    const When = require("../interprete/expresiones/When.js");
    const Fila = require("../interprete/expresiones/Fila.js");
    const Parametros = require("../interprete/expresiones/Parametros.js");
    const Mostrar = require('../interprete/instrucciones/Mostrar.js');
    const MostrarI = require('../interprete/instrucciones/MostrarI.js');
    const Select = require('../interprete/instrucciones/Select.js');
    const SelectT = require('../interprete/instrucciones/SelectT.js');
    const Case = require('../interprete/instrucciones/Case.js');
    const CaseB = require('../interprete/instrucciones/CaseB.js');
    const Aritmetica = require('../interprete/expresiones/Aritmetica.js');
    const Casteo = require('../interprete/expresiones/Casteo.js');
    const Logico = require('../interprete/expresiones/Logico.js');
    const Else = require('../interprete/expresiones/Else.js');
    const Relacional = require('../interprete/expresiones/Relacional.js');
    const Lower = require('../interprete/expresiones/Lower.js');
    const Upper = require('../interprete/expresiones/Upper.js');
    const Round = require('../interprete/expresiones/Round.js');
    const Length = require('../interprete/expresiones/Length.js');
    const Truncate = require('../interprete/expresiones/Truncate.js');
    const Typeof = require('../interprete/expresiones/Typeof.js');
    const AsigTabla  = require('../interprete/instrucciones/AsigTabla');
    const AgregarCo  = require('../interprete/instrucciones/AgregarCo');
    const InsertarF  = require('../interprete/instrucciones/InsertarF');
    const EliminarCo  = require('../interprete/instrucciones/EliminarCo');
    const CambiarN  = require('../interprete/instrucciones/CambiarN');
    const CambiarNC  = require('../interprete/instrucciones/CambiarNC');
    const EliminarT  = require('../interprete/instrucciones/EliminarT');
    const Asignar  = require('../interprete/instrucciones/Asignar');
    const Id = require('../interprete/expresiones/Id');
    const Errores = require('../interprete/instrucciones/Errores.js');
    const Token = require('../interprete/instrucciones/Token.js');
    const Informacion = require('../interprete/instrucciones/Informacion.js');
    const Encapsula  = require('../interprete/instrucciones/Encapsula.js');
    const IfElse  = require('../interprete/instrucciones/IfElse.js');
    const Declare  = require('../interprete/instrucciones/Declare.js');
    const If  = require('../interprete/instrucciones/If.js');
    const While  = require('../interprete/instrucciones/While.js');
    const Break  = require('../interprete/instrucciones/Break.js');
    const Continue  = require('../interprete/instrucciones/Continue.js');
    const For  = require('../interprete/instrucciones/For.js');
    const Return = require('../interprete/instrucciones/Return.js');
    const Funciones = require('../interprete/instrucciones/Funciones.js');
    const Metodo = require('../interprete/instrucciones/Metodo.js');
    const Call = require('../interprete/instrucciones/Call.js');
    const SelectVari = require('../interprete/instrucciones/SelectVari.js');
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
    : DECLARE asignacion                                               { $$ = $1; }
    | declaracion                                                      { $$ = $1; }
    | SELECT ARROBA tipo PUNTOYCOMA                                    { $$ = new Mostrar($3,@3.first_line,@3.first_column); }
    | PRINT tipo PUNTOYCOMA                                            { $$ = new Mostrar($2,@2.first_line,@2.first_column); }
    | PRINT lista_instrucciones PUNTOYCOMA                             { $$ = new MostrarI($2,@2.first_line,@2.first_column); }
    | BEGIN lista_instrucciones END PUNTOYCOMA                         { $$ = new Encapsula($2,@2.first_line,@2.first_column);} 
    | IF tipo THEN lista_instrucciones END IF PUNTOYCOMA                { $$ = new If($2,$4,@2.first_line,@2.first_column);}                       
    | WHILE tipo lista_instrucciones END WHILE PUNTOYCOMA               { $$ = new While($2,$3,@2.first_line,@2.first_column);}
    //Para crear tablas DDL
    | CREATE TABLE tipo PARENABRE lista_instrucciones PARENCIE PUNTOYCOMA  {$$ = new AsigTabla($3,$5,@3.first_line,@3.first_column);}
    | VARI INT COMA             {$$ = new ColumnaE($1,"int",@1.first_line,@1.first_column);}
    | VARI DOUBLE COMA          {$$ = new ColumnaE($1,"double",@1.first_line,@1.first_column);}
    | VARI DATE COMA            {$$ = new ColumnaE($1,"date",@1.first_line,@1.first_column);}
    | VARI VARCHAR COMA         {$$ = new ColumnaE($1,"varchar",@1.first_line,@1.first_column);}
    | VARI TRUE COMA            {$$ = new ColumnaE($1,"true",@1.first_line,@1.first_column);}
    | VARI FALSE COMA           {$$ = new ColumnaE($1,"false",@1.first_line,@1.first_column);}
    | VARI NULL COMA            {$$ = new ColumnaE($1,"null",@1.first_line,@1.first_column);}
    | VARI INT                  {$$ = new ColumnaE($1,"int",@1.first_line,@1.first_column);}
    | VARI DOUBLE               {$$ = new ColumnaE($1,"double",@1.first_line,@1.first_column);}
    | VARI DATE                 {$$ = new ColumnaE($1,"date",@1.first_line,@1.first_column);}
    | VARI VARCHAR              {$$ = new ColumnaE($1,"varchar",@1.first_line,@1.first_column);}
    | VARI TRUE                 {$$ = new ColumnaE($1,"true",@1.first_line,@1.first_column);}
    | VARI FALSE                {$$ = new ColumnaE($1,"false",@1.first_line,@1.first_column);}
    | VARI NULL                 {$$ = new ColumnaE($1,"null",@1.first_line,@1.first_column);}
    | REALES COMA               {$$ = new Fila($1,@1.first_line,@1.first_column);}
    | DATEN COMA                {$$ = new Fila($1,@1.first_line,@1.first_column);}
    | CADENA COMA               {$$ = new Fila($1,@1.first_line,@1.first_column);}
    | CADPR COMA                {$$ = new Fila($1,@1.first_line,@1.first_column);}
    | VARI COMA                 {$$ = new Fila($1,@1.first_line,@1.first_column);}
    | ARROBA VARI COMA          {$$ = new Fila($2,@2.first_line,@2.first_column);}
    | ALTER TABLE VARI ADD lista_instrucciones PUNTOYCOMA          {$$ = new AgregarCo($3,$5,@3.first_line,@3.first_column);}
    | ALTER TABLE VARI DROP COLUMN VARI PUNTOYCOMA                 {$$ = new EliminarCo($3,$6,@3.first_line,@3.first_column);}
    | ALTER TABLE VARI RENAME TO tipo PUNTOYCOMA                   {$$ = new CambiarN($3,$6,@3.first_line,@3.first_column);}
    | ALTER TABLE VARI RENAME COLUMN VARI TO VARI PUNTOYCOMA       {$$ = new CambiarNC($3,$6,$8,@3.first_line,@3.first_column);}
    | DROP TABLE VARI PUNTOYCOMA                                   {$$ = new EliminarT($3,@3.first_line,@3.first_column);}
    //Casteos
    | CAST PARENABRE tipo AS tipo PARENCIE                         {$$ = new Casteo($3,$5,@3.first_line,@3.first_column);}
    // Tabla DML
    | INSERT INTO VARI PARENABRE lista_instrucciones PARENCIE VALUES PARENABRE lista_instrucciones PARENCIE PUNTOYCOMA  {$$= new InsertarF($3,$5,$9,@3.first_line,@3.first_column);}  
    | SELECT VARI FROM VARI PUNTOYCOMA                             { $$ = new Select($2,$4,@2.first_line,@2.first_column);}  
    | SELECT POR FROM VARI PUNTOYCOMA                              { $$ = new SelectT($4,@2.first_line,@2.first_column);}  
    | CASE lista_instrucciones END PUNTOYCOMA                      { $$ = new CaseB($2,@2.first_line,@2.first_column);}
    | CASE tipo lista_instrucciones END PUNTOYCOMA                 { $$ = new Case($2,$3,@2.first_line,@2.first_column);}
    | WHEN tipo THEN lista_instrucciones PUNTOYCOMA                { $$ = new When($2,$4,@2.first_line,@2.first_column);}
    | ELSE lista_instrucciones PUNTOYCOMA                          { $$ = new Else($2,@2.first_line,@2.first_column);}
    | TRUNCATE TABLE VARI PUNTOYCOMA                               { $$ = new Truncate($3,@3.first_line,@3.first_column);}
    | SELECT LOWER PARENABRE tipo PARENCIE PUNTOYCOMA              { $$ = new Lower($4,@4.first_line,@4.first_column);}
    | SELECT UPPER PARENABRE tipo PARENCIE PUNTOYCOMA              { $$ = new Upper($4,@4.first_line,@4.first_column);}
    | SELECT ROUND PARENABRE tipo COMA tipo PARENCIE PUNTOYCOMA    { $$ = new Round($4,$6,@4.first_line,@4.first_column);}
    | SELECT TRUNCATE PARENABRE tipo COMA tipo PARENCIE PUNTOYCOMA { $$ = new Truncate($4,$6,@4.first_line,@4.first_column);}
    | SELECT TYPEOF PARENABRE tipo PARENCIE PUNTOYCOMA             { $$ = new Typeof($4,@4.first_line,@4.first_column);}
    | SELECT LEN PARENABRE tipo PARENCIE PUNTOYCOMA                { $$ = new Length($4,@4.first_line,@4.first_column);}
    | BREAK PUNTOYCOMA                                             { $$ = new Break(@1.first_line,@1.first_column);}
    | CONTINUE PUNTOYCOMA                                          { $$ = new Continue(@1.first_line,@1.first_column);}
    | FOR tipo IN tipo PUNTO PUNTO tipo lista_instrucciones END FOR PUNTOYCOMA   {$$ = new For($2,$4,$7,$8,@1.first_line,@1.first_column);}      
    | CREATE FUNCTION tipo PARENABRE lista_instrucciones PARENCIE RETURNS tipo lista_instrucciones END PUNTOYCOMA  { $$ = new Funciones ($3,$5,$8,$9,@1.first_line,@1.first_column);}
    | ARROBA VARI INT COMA             {$$ = new Parametros($2,"int",@1.first_line,@1.first_column);}
    | ARROBA VARI DOUBLE COMA          {$$ = new Parametros($2,"double",@1.first_line,@1.first_column);}
    | ARROBA VARI DATE COMA            {$$ = new Parametros($2,"date",@1.first_line,@1.first_column);}
    | ARROBA VARI VARCHAR COMA         {$$ = new Parametros($2,"varchar",@1.first_line,@1.first_column);}
    | ARROBA VARI TRUE COMA            {$$ = new Parametros($2,"true",@1.first_line,@1.first_column);}
    | ARROBA VARI FALSE COMA           {$$ = new Parametros($2,"false",@1.first_line,@1.first_column);}
    | ARROBA VARI NULL COMA            {$$ = new Parametros($2,"null",@1.first_line,@1.first_column);}
    | ARROBA VARI INT                  {$$ = new Parametros($2,"int",@1.first_line,@1.first_column);}
    | ARROBA VARI DOUBLE               {$$ = new Parametros($2,"double",@1.first_line,@1.first_column);}
    | ARROBA VARI DATE                 {$$ = new Parametros($2,"date",@1.first_line,@1.first_column);}
    | ARROBA VARI VARCHAR              {$$ = new Parametros($2,"varchar",@1.first_line,@1.first_column);}
    | ARROBA VARI TRUE                 {$$ = new Parametros($2,"true",@1.first_line,@1.first_column);}
    | ARROBA VARI FALSE                {$$ = new Parametros($2,"false",@1.first_line,@1.first_column);}
    | ARROBA VARI NULL                 {$$ = new Parametros($2,"null",@1.first_line,@1.first_column);}
    | RETURN tipo PUNTOYCOMA           {$$ = new Return($1,@1.first_line,@1.first_column);}
    | CREATE PROCEDURE tipo lista_instrucciones AS BEGIN lista_instrucciones END PUNTOYCOMA  { $$ = new Metodo($3,$4,$7,@1.first_line,@1.first_column);}
    | CALL tipo PARENABRE lista_instrucciones PARENCIE PUNTOYCOMA               {$$ = new Call($2,$4,@1.first_line,@1.first_column);}
    | SELECT ARROBA VARI AS VARI PUNTOYCOMA                             { $$ = new SelectVari($3,$5,@1.first_line,@1.first_column);}
   // | SELECT POR FROM VARI WHERE tipo PUNTOYCOMA  {$$ = new Select($4,$6);}
    //| SELECT lista_instrucciones FROM VARI WHERE tipo PUNTOYCOMA
    /*| SET tipo PUNTOYCOMA
    | SELECT tipo
    | UPDATE VARI SET tipo WHERE tipo PUNTOYCOMA
    | DELETE FROM VARI WHERE tipo PUNTOYCOMA
    | CASE tipo lista_instrucciones END AS tipo PUNTOYCOMA*/
	| error	{
                console.log('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);
                let s = Informacion.getInstance();
                s.add_Error(new Errores("Sintáctico","No se esperaba en caracter "+ yytext,this._$.first_line,this._$.first_column));
                //ListaError.push(err);
                }
;


declaracion
    : SET ARROBA VARI IGUAL tipo PUNTOYCOMA                     {$$ = new Asignar($3,$5,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI tipo PUNTOYCOMA                       {$$ = new Declare($3,$4,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI INT DEFAULT tipo PUNTOYCOMA           {$$ = new Declare($3,$6,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI DATE DEFAULT tipo PUNTOYCOMA          {$$ = new Declare($3,$6,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI DOUBLE DEFAULT tipo PUNTOYCOMA        {$$ = new Declare($3,$6,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI VARCHAR DEFAULT tipo PUNTOYCOMA       {$$ = new Declare($3,$6,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI TRUE DEFAULT tipo PUNTOYCOMA          {$$ = new Declare($3,$6,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI FALSE DEFAULT tipo PUNTOYCOMA         {$$ = new Declare($3,$6,@3.first_line,@3.first_column);}
    | DECLARE ARROBA VARI NULL DEFAULT tipo PUNTOYCOMA          {$$ = new Declare($3,$6,@3.first_line,@3.first_column);}
;
tipo
    : INT           {$$ = new Dato($1, 'int',@1.first_line,@1.first_column);}
    | DOUBLE        {$$ = new Dato($1, 'double',@1.first_line,@1.first_column);}
    | DATE          {$$ = new Dato($1, 'date',@1.first_line,@1.first_column);}
    | VARCHAR       {$$ = new Dato($1, 'varchar',@1.first_line,@1.first_column);}
    | TRUE          {$$ = new Dato($1, 'true',@1.first_line,@1.first_column);}
    | FALSE         {$$ = new Dato($1, 'false',@1.first_line,@1.first_column);}
    | NULL          {$$ = new Dato($1, 'null',@1.first_line,@1.first_column);}
    //Datos
    | REALES       {$$ = new Dato($1, 'int',@1.first_line,@1.first_column);}
    | DATEN        {$$ = new Dato($1, 'date',@1.first_line,@1.first_column);}
    | CADENA       {$$ = new Dato($1, 'varchar',@1.first_line,@1.first_column);}
    | CADPR        {$$ = new Dato($1, 'varchar',@1.first_line,@1.first_column);}
    | VARI         {$$ = new Id($1,@1.first_line,@1.first_column);}
    | ARROBA VARI  {$$ = new Id($2,@2.first_line,@2.first_column);}
    //Operaciones Aritmeticas
    | tipo MAS tipo     {$$ = new Aritmetica($1, '+', $3,@3.first_line,@3.first_column);}
    | tipo POR tipo     {$$ = new Aritmetica($1, '*', $3,@3.first_line,@3.first_column);} 
    | tipo MENOS tipo   {$$ = new Aritmetica($1, '-', $3,@3.first_line,@3.first_column);} 
    | tipo DIVI tipo    {$$ = new Aritmetica($1, '/', $3,@3.first_line,@3.first_column);} 
    | tipo MODULO tipo  {$$ = new Aritmetica($1, '%', $3,@3.first_line,@3.first_column);} 
    //| MENOS tipo {$$ = new Aritmetica("Menos", 'Nega', $2)} 
    //| MAS tipo {$$ = new Aritmetica("Mas", 'Nega', $2)} 
    //Operaciones Relacionales
    | tipo IGUAL tipo       {$$ = new Relacional($1, '=', $3,@3.first_line,@3.first_column);}
    | tipo DIFERENTE tipo   {$$ = new Relacional($1, '!=', $3,@3.first_line,@3.first_column);}
    | tipo MENOR tipo       {$$ = new Relacional($1, '<', $3,@3.first_line,@3.first_column);}
    | tipo MENOR IGUAL tipo {$$ = new Relacional($1, '<=', $4,@4.first_line,@4.first_column);}
    | tipo MAYOR tipo       {$$ = new Relacional($1, '>', $3,@3.first_line,@3.first_column);}
    | tipo MAYOR IGUAL tipo {$$ = new Relacional($1, '>=', $4,@4.first_line,@4.first_column);}
    //Operadores Logicos
    | tipo AND tipo         {$$ = new Logico($1, 'and', $3,@3.first_line,@3.first_column);}
    | tipo OR tipo          {$$ = new Logico($1, 'or', $3,@3.first_line,@3.first_column);}
    | tipo NOT tipo         {$$ = new Logico($1, 'not', $3,@3.first_line,@3.first_column);}
;
