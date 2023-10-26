const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class CambiarN extends Instruccion{

    constructor(id, colum,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Cambia Nombre",this.colum.id,entorno.nombre,this.linea,this.columna));
        entorno.CambiarTablaN(this.id, this.colum);
        s.agregarSalida("Se cambio correctamente el nombre de la tabla de  "+ this.id +" a "+this.colum.nombre);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodocambiarn"+aleatorio.toString();
        const val =this.colum.getAst();
        nodo.cadena =` 
        ${nodo.padre}[label ="CambiarNombre"];
        nodoIDS${nodo.padre}[label="Tabla"];
        nodoid${nodo.padre}[label="${this.id}"];
        ${val.cadena}
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        ${nodo.padre}->${val.padre};
        `;
        
        return nodo;
    }
}

module.exports = CambiarN;