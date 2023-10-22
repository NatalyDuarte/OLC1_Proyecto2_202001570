const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class AgregarCo extends Instruccion{

    constructor(id, colum,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Agregar Columna",this.colum.id,entorno.nombre,this.linea,this.columna));
        entorno.agregarTablaC(this.id, this.colum);
        console.log("Se agrego correctamentela la columna "+ this.colum.id +" a la tabla "+this.id);
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
        `${nodoPadre}[label="AgregarColumna"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = AgregarCo;