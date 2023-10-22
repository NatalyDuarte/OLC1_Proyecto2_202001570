const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class ColumnaE extends Instruccion{

    constructor(id, tipo,linea,columna){
        super();
        this.id = id;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;

    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Columna",this.tipo,entorno.nombre,this.linea,this.columna));
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
        `${nodoDato}[label="${this.id}"]\n`+
        `${nodoPadre}[label="Columna"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = ColumnaE;