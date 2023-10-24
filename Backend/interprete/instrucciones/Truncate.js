const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Truncate extends Instruccion {

    constructor(tabla,linea,columna){
        super();
        this.tabla = tabla;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        entorno.EliminarTF(this.tabla);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.tabla,"Eliminar","Filas",entorno.nombre,this.linea,this.columna));
        console.log("Se elimino los registros correctamente de la tabla "+ this.tabla)
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.tabla}"]\n`+
        `${nodoPadre}[label="Eliminar"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);

        return nodo;
    }
}

module.exports = Truncate;