const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
class Id extends Instruccion{

    constructor(nombre,linea,columna){
        super();
        this.nombre = nombre;
        this.valor = null;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let simbolo = entorno.obtenerSimbolo(this.nombre);
        this.valor = simbolo.valor;
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.nombre,"Id","--",entorno.nombre,this.linea,this.columna));
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
        `${nodoPadre}[label="id"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = Id;