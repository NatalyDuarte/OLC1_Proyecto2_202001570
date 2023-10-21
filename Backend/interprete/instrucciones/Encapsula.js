const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class Encapsula extends Instruccion{
    constructor(instrucciones, linea, columna){
        super();
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornoen = new Entorno("Encapsulacion", entorno);
        let s = Informacion.getInstance();
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar(entornoen);
        });
        s.add_Simbolo(new Simb("Begin","Encapsular","---",entorno.nombre,this.linea,this.columna)); 

    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.instrucciones}"]\n`+
        `${nodoPadre}[label="Encapsular"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = Encapsula;