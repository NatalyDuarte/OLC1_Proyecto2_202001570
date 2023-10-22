const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class CambiarNC extends Instruccion{

    constructor(id, colum,columno,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.columno = columno;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Cambia Nombre Columna",this.colum,entorno.nombre,this.linea,this.columna));
        entorno.CambiarTablaNC(this.id, this.colum,this.columno);
        console.log("Se cambio correctamente el nombre de la columna "+ this.colum+ " al nombre "+this.columno)
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.colum}"]\n`+
        `${nodoPadre}[label="CambiarNombreColumna"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = CambiarNC;