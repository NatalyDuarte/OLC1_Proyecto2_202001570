const Instruccion = require("../Instruccion");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Aritmetica extends Instruccion{
    constructor(izq, op, der,linea,columna){
        super();
        this.izq = izq;
        this.der = der;
        this.op = op;
        this.linea = linea;
        this.columna = columna;
        this.valor = null;
    }

    ejecutar(entorno){
        let izq = this.izq.ejecutar(entorno);
        let der = this.der.ejecutar(entorno);

        switch(this.op){
            case '+':
                this.valor = Number(izq.valor) + Number(der.valor);
                return this
            case '*':
                this.valor = Number(izq.valor) * Number(der.valor);
                return this
        }
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(izq.valor+" , "+der.valor,"Aritmetica",this.op,entorno,this.linea,this.columna));
        s.add_AST(cadena);
        return this
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let izq = this.izq.getAst();
        let der = this.der.getAst();
        
        let op = contador.get();
        let padre = contador.get();

        nodo.padre = padre;
        nodo.cadena =
            izq.cadena+
            der.cadena+
            `${op}[label="${this.op}"]\n`+
            `${padre}[label="expresion"]\n`+
            `${padre}--${izq.padre}\n`+
            `${padre}--${op}\n`+
            `${padre}--${der.padre}\n`
            ;
        let s = Informacion.getInstance();
        s.add_AST(nodo.cadena);

        return nodo;

    }
}

module.exports = Aritmetica;