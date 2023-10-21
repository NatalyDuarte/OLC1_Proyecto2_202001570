const Instruccion = require("../Instruccion");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Relacional extends Instruccion{
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
        let s = Informacion.getInstance();
        switch(this.op){
            case '=':
                if (izq.valor ===  der.valor ){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
            case '!=':
                if (izq.valor !== der.valor){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
            case '<':
                if (parseInt(izq.valor) < parseInt(der.valor)){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
            case '<=':
                if (parseInt(izq.valor) <= parseInt(der.valor)){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
            case '>':
                if (parseInt(izq.valor) > parseInt(der.valor)){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
            case '>=':
                if (parseInt(izq.valor) >=  parseInt(der.valor)){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
        }
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

module.exports = Relacional;