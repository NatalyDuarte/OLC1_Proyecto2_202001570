const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Fila extends Instruccion{

    constructor(id,linea,columna){
        super();
        this.id = id;
        this.linea = linea;
        this.columna = columna;

    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Fila","--",entorno.nombre,this.linea,this.columna));
        return this;   
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodofila"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Fila"];
        nodoval${nodo.padre}[label="${this.id}"];
        ${nodo.padre} -> nodoval${nodo.padre};
        `;

        return nodo;
    }
}

module.exports = Fila;