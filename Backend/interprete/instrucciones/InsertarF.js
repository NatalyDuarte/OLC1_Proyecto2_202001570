const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class InsertarF extends Instruccion{

    constructor(id, colum, filas,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.filas = filas;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Agregar Fila",this.filas.id,entorno.nombre,this.linea,this.columna));
        entorno.agregarTablaF(this.id, this.colum ,this.filas);
        console.log("Se agrego correctamentela la fila "+ this.filas.id +" a la tabla "+this.id);
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.filas.id}"]\n`+
        `${nodoPadre}[label="AgregarFila"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = InsertarF;