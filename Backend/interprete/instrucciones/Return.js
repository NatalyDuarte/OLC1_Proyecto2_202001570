const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Return extends Instruccion {

    constructor(expresion,linea,columna){
        super();
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion.nombre,"Parametro","Variable",entorno.nombre,this.linea,this.columna));
        return this;
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoreturn"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Return"];
        nodoid${nodo.padre}[label="${this.expresion.nombre}"];
        ${nodo.padre} ->nodoid${nodo.padre};
        `;
        
        return nodo;
    }
}

module.exports = Return;