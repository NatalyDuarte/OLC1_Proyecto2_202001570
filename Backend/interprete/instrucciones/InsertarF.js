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
        for (let i = 0; i < this.filas.length; i++) {
            console.log("Se agrego correctamentela la fila "+ this.filas[i].id +" a la tabla "+this.id);
            s.agregarSalida("Se agrego correctamente la la fila "+ this.filas[i].id +" a la tabla "+this.id);
        }
        
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoinsertarf"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="InsertarF"];
        `;
        for (let i = 0; i < this.colum.length; i++) {
            const val =this.colum[i].getAst();
            nodo.cadena += ` 
            ${val.cadena}
            ${nodo.padre}->${val.padre};
            `;
        }
        for (let i = 0; i < this.filas.length; i++) {
            const val =this.filas[i].getAst();
            nodo.cadena += ` 
            ${val.cadena}
            ${nodo.padre}->${val.padre};
            `;
        }
        
        
        return nodo;
    }
}

module.exports = InsertarF;