const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Select extends Instruccion {

    constructor(expresion,lugar,linea,columna){
        super();
        this.expresion = expresion;
        this.lugar = lugar;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        entorno.obtenerColumna(this.lugar,this.expresion);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion,"Print","Columna",entorno.nombre,this.linea,this.columna));
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoif"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Select"];
        nodoIDS${nodo.padre}[label="Tabla"];
        nodoid${nodo.padre}[label="${this.lugar}"];
        nodoI${nodo.padre}[label="Columna"];
        nodoi${nodo.padre}[label="${this.expresion}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        ${nodo.padre}->nodoI${nodo.padre} ->nodoi${nodo.padre};
        `;
        
        return nodo;
    }
}

module.exports = Select;