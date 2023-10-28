const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class Encapsula extends Instruccion{
    constructor(instrucciones, linea, columna){
        super();
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornoen = new Entorno("Encapsulacion", entorno);
        let s = Informacion.getInstance();
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar(entornoen);
        });
        s.add_Simbolo(new Simb("Begin","Encapsular","---",entorno.nombre,this.linea,this.columna)); 

    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoencapsula"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Encapsular"];
        `;
        for (let i = 0; i < this.instrucciones.length; i++) {
            const val =this.instrucciones[i].getAst();
            nodo.cadena += ` 
            ${val.cadena}
            ${nodo.padre}->${val.padre};
            `;
        }
        
        return nodo;
    }
}

module.exports = Encapsula;