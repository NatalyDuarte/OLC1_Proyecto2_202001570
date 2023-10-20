const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
class Dato extends Instruccion{

    constructor(valor, tipo){
        super();
        this.valor = valor;
        this.tipo = tipo;
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
        `${nodoDato}[label="${this.valor}"]\n`+
        `${nodoPadre}[label="dato"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = Dato;