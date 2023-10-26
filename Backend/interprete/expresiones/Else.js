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
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoelse"+aleatorio.toString();

        nodo.cadena =` 
        ${nodo.padre}[label ="Else"];
        `;
        for (let i = 0; i < this.Instruccion.length; i++) {
            const val =this.Instruccion[i].getAst();
            nodo.cadena += ` 
            ${val.cadena.replace(/['" ]/g, '')}
            ${nodo.padre}->${val.padre};
            `;
        }
        
        return nodo;
    }
}

module.exports = Else;