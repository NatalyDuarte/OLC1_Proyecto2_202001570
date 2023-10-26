const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Truncate extends Instruccion {

    constructor(tabla,linea,columna){
        super();
        this.tabla = tabla;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        entorno.EliminarTF(this.tabla);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.tabla,"Eliminar","Filas",entorno.nombre,this.linea,this.columna));
        console.log("Se elimino los registros correctamente de la tabla "+ this.tabla);
        s.agregarSalida("Se elimino los registros correctamente de la tabla "+ this.tabla);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoinsertarf"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Truncate"];
        nodoIDS${nodo.padre}[label="Tabla"];
        nodoid${nodo.padre}[label="${this.tabla}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;
    }
}

module.exports = Truncate;