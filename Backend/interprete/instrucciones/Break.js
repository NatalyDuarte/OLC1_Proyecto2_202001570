const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Break extends Instruccion{

    constructor(linea,columna){
        super();
        this.tipo = "Break";
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb("Break","Break","Sentencia de Transferencia",entorno.nombre,this.linea,this.columna));
        return this.tipo;
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodobreak"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="BREAK"];
        `;
        
        return nodo;
    }
}

module.exports = Break;