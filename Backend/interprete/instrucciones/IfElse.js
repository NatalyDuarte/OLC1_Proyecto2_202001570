const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class IfElse extends Instruccion{
    constructor(condicion, instrucciones, instrucciones_else,linea,columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.instrucciones_else = instrucciones_else;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornoif = new Entorno("If Compuesto", entorno);
        let condicion = this.condicion.ejecutar(entornoif);

        if (condicion.valor){
            this.instrucciones.forEach(instruccion => {
                instruccion.ejecutar(entornoif);
            });
        }else{
            this.instrucciones_else.forEach(instruccion => {
                instruccion.ejecutar(entornoif);
            });
        }
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(condicion.valor,"If Compuesto",condicion.tipo,entorno.nombre,this.linea,this.columna));

    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.condicion.valor}"]\n`+
        `${nodoPadre}[label="If Compuesto"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}
module.exports = IfElse;