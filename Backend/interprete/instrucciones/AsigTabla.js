const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class AsigTabla extends Instruccion{

    constructor(id, colum,linea,columna){
        super();
        this.id = id;
        this.colum = colum;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        entorno.agregarTabla(this.id, this.colum);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id.nombre,"Crear Tabla",this.colum.id,entorno.nombre,this.linea,this.columna));
        console.log("Se agrego correctamentela la tabla "+this.id.nombre);
        s.agregarSalida("Se agrego correctamentela la tabla "+this.id.nombre);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoasignaciont"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="AsignarTabla"];
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

module.exports = AsigTabla;