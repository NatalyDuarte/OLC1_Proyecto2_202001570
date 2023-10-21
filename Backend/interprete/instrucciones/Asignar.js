const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Asignar extends Instruccion{

    constructor(id, expresion,linea,columna){
        super();
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let expresion = this.expresion.ejecutar(entorno);
        entorno.agregarSimbolo(this.id, expresion.valor);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion.valor,"Asignar",expresion.tipo,entorno.nombre,this.linea,this.columna));
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
        `${nodoPadre}[label="Asignar"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = Asignar