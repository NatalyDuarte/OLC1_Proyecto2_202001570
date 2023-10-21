const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
class Dato extends Instruccion{

    constructor(valor, tipo,linea,columna){
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;

    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.valor,"Dato",this.tipo,entorno.nombre,this.linea,this.columna));
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