const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class CambiarNC extends Instruccion{

    constructor(id, colum,columno,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.columno = columno;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Cambia Nombre Columna",this.colum,entorno.nombre,this.linea,this.columna));
        entorno.CambiarTablaNC(this.id, this.colum,this.columno);
        console.log("Se cambio correctamente el nombre de la columna "+ this.colum+ " al nombre "+this.columno)
        s.agregarSalida("Se cambio correctamente el nombre de la columna "+ this.colum+ " al nombre "+this.columno);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodocambiarnc"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="CambiarNombreColumna"];
        nodoIDS${nodo.padre}[label="Columna"];
        nodoid${nodo.padre}[label="${this.id}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;
        
        return nodo;
    }
}

module.exports = CambiarNC;