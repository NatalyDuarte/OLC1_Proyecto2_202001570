const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
class Id extends Instruccion{

    constructor(nombre,linea,columna){
        super();
        this.nombre = nombre;
        this.valor = null;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let simbolo = entorno.obtenerSimbolo(this.nombre);
        this.valor = simbolo.valor;
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.nombre,"Id","--",entorno.nombre,this.linea,this.columna));
        return this;
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoid"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Id"];
        nodoval${nodo.padre}[label="${this.nombre}"];
        ${nodo.padre} -> nodoval${nodo.padre};
        `;

        return nodo;
    }
}

module.exports = Id;