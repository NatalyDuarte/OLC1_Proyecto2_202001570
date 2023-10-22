const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class AsigTabla extends Instruccion{

    constructor(id, colum,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        entorno.agregarTabla(this.id, this.colum);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id.nombre,"Crear Tabla",this.colum.id,entorno.nombre,this.linea,this.columna));
        console.log("Se agrego correctamentela la tabla "+this.id.nombre);
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
        `${nodoPadre}[label="AsignarTabla"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = AsigTabla;