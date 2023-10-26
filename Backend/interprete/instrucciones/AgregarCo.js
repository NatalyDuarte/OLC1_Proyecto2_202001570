const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class AgregarCo extends Instruccion{

    constructor(id, colum,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Agregar Columna",this.colum.id,entorno.nombre,this.linea,this.columna));
        entorno.agregarTablaC(this.id, this.colum);
        console.log("Se agrego correctamente la columna "+ this.colum.id +" a la tabla "+this.id);
        for (let i = 0; i < this.colum.length; i++) {
            s.agregarSalida("Se agrego correctamente la columna "+ this.colum[i].id +" a la tabla "+this.id);
        }
        
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoagregarc"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="AgregarColumna"];
        nodoIDS${nodo.padre}[label="Tabla"];
        nodoid${nodo.padre}[label="${this.id}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;
        for (let i = 0; i < this.colum.length; i++) {
            const val =this.colum[i].getAst();
            nodo.cadena += ` 
            ${val.cadena}
            ${nodo.padre}->${val.padre};
            `;
        }
        
        return nodo;
    }
}

module.exports = AgregarCo;