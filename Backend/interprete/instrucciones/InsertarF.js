const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class InsertarF extends Instruccion{

    constructor(id, colum, filas,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.filas = filas;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Agregar Fila",this.filas.id,entorno.nombre,this.linea,this.columna));
        entorno.agregarTablaF(this.id, this.colum ,this.filas);
        console.log("Se agrego correctamentela la fila "+ this.filas.id +" a la tabla "+this.id);
        s.agregarSalida("Se agrego correctamentela la fila "+ this.filas.id +" a la tabla "+this.id);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoinsertarf"+aleatorio.toString();
        const val =this.colum.getAst();
        const valf =this.filas.getAst();
        nodo.cadena =` 
        ${nodo.padre}[label ="InsertarF"];
        nodoIDS${nodo.padre}[label="Columna"];
        nodoid${nodo.padre}[label="${this.colum.id}"];
        ${valf.cadena}
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        ${nodo.padre}->${valf.padre};
        `;
        
        return nodo;
    }
}

module.exports = InsertarF;