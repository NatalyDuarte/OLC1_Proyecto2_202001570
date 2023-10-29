const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class SelectT extends Instruccion {

    constructor(lugar,linea,columna){
        super();
        this.lugar = lugar;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        entorno.obtenerTabla(this.lugar);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.lugar,"Print","Columna",entorno.nombre,this.linea,this.columna));
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodosel"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="SelectT"];
        nodoSA${nodo.padre}[label="Tabla"];
        nodoAS${nodo.padre}[label="${this.lugar}"];
        ${nodo.padre} ->nodoSA${nodo.padre} ->nodoAS${nodo.padre};
        `;
        return nodo;
    }
}

module.exports = SelectT;