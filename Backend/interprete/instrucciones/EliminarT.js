const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class EliminarT extends Instruccion{

    constructor(id,linea,columna){
        super();
        this.id = id;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Cambia Nombre","Tabla",entorno.nombre,this.linea,this.columna));
        entorno.EliminarT(this.id);
        console.log("Se elimino correctamente la tabla "+ this.id)
        s.agregarSalida("Se elimino correctamente la tabla "+ this.id);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoeliminart"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="EliminarTabla"];
        nodoIDS${nodo.padre}[label="Tabla"];
        nodoid${nodo.padre}[label="${this.id}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;
        
        return nodo;
    }
}

module.exports = EliminarT;