const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Asignar extends Instruccion{

    constructor(id, expresion,linea,columna){
        super();
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let expresion = this.expresion.ejecutar(entorno);
        entorno.agregarSimbolo(this.id, expresion.valor);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion.valor,"Asignar",expresion.tipo,entorno.nombre,this.linea,this.columna));
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoasignacion"+aleatorio.toString();
        const val =this.expresion.getAst();
        nodo.cadena =` 
        ${nodo.padre}[label ="ASIGNAR"];
        nodoIDS${nodo.padre}[label="ID"];
        nodoid${nodo.padre}[label="${this.id}"];
        ${val.cadena}
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        ${nodo.padre}->${val.padre};
        `;
        
        return nodo;
    }
}

module.exports = Asignar