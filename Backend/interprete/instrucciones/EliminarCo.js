const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class EliminarCo extends Instruccion{

    constructor(id, colum,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Eliminar Columna",this.colum,entorno.nombre,this.linea,this.columna));
        entorno.EliminarTablaC(this.id, this.colum);
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.id.nombre}"]\n`+
        `${nodoPadre}[label="EliminarColumna"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = EliminarCo;