const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
class When extends Instruccion{

    constructor(dato1,dato2,linea,columna){
        super();
        this.dato1 = dato1;
        this.dato2 = dato2;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        return this;
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.dato1}"]\n`+
        `${nodoPadre}[label="When"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = When;