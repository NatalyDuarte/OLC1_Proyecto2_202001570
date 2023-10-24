const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Select extends Instruccion {

    constructor(expresion,lugar,linea,columna){
        super();
        this.expresion = expresion;
        this.lugar = lugar;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        entorno.obtenerColumna(this.lugar,this.expresion);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion,"Print","Columna",entorno.nombre,this.linea,this.columna));
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.expresion}"]\n`+
        `${nodoPadre}[label="Imprimir"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = Select;