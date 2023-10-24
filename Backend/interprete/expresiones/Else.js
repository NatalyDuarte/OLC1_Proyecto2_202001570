const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
class Else extends Instruccion{

    constructor(instruccion,linea,columna){
        super();
        this.Instruccion = instruccion;
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
        `${nodoDato}[label="${this.instruccion}"]\n`+
        `${nodoPadre}[label="Else"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = Else;