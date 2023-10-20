const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Mostrar extends Instruccion {

    constructor(expresion,linea,columna){
        super();
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let expresion = this.expresion.ejecutar(entorno);
        console.log(expresion.valor);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion.valor,"Print",expresion.tipo,entorno.nombre,this.linea,this.columna));
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.expresion.valor}"]\n`+
        `${nodoPadre}[label="Imprimir"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = Mostrar;