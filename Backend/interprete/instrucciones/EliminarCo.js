const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class EliminarCo extends Instruccion{

    constructor(id, colum,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Eliminar Columna",this.colum,entorno.nombre,this.linea,this.columna));
        entorno.EliminarTablaC(this.id, this.colum);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoaeliminar"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="EliminarColumna"];
        nodoIDS${nodo.padre}[label="Tabla"];
        nodoid${nodo.padre}[label="${this.id}"];
        nodoI${nodo.padre}[label="Columna"];
        nodoi${nodo.padre}[label="${this.colum}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        ${nodo.padre}->nodoI${nodo.padre} ->nodoi${nodo.padre};
        `;
        
        return nodo;
    }
}

module.exports = EliminarCo;