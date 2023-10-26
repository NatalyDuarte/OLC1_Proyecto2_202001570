const Instruccion = require("../Instruccion");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Logico extends Instruccion{
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
            case 'and':
                if (izq.valor=== "true" && der.valor === "true"){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
            case 'or':
                if (izq.valor=== "true" || der.valor === "true"){
                    this.valor = Boolean(true);
                    console.log(this.valor);
                }else{
                    this.valor = Boolean(false);
                    console.log(this.valor);
                }
                return this;
            case 'not':
                if (!(izq.valor && der.valor)){
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
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre= "nodologico"+aleatorio.toString();
        const exiz = this.izq.getAst();
        const exder = this.der.getAst();
        nodo.cadena =` 
        ${nodo.padre}[label ="Logico"];
        nodooperacion${nodo.padre}[label="${this.op}"];
        ${exiz.cadena}
        ${exder.cadena}
        ${nodo.padre} ->${exiz.padre};
        ${nodo.padre} -> nodooperacion${nodo.padre};
        ${nodo.padre} ->${exder.padre};
        `;
        return nodo;

    }
}

module.exports = Logico;