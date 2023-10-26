const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
class Dato extends Instruccion{

    constructor(valor, tipo,linea,columna){
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;

    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        this.valor = this.valor.replace(/['"]/g, '');
        s.add_Simbolo(new Simb(this.valor,"Dato",this.tipo,entorno.nombre,this.linea,this.columna));
        return this;   
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nododato"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Dato"];
        nodoval${nodo.padre}[label="${this.valor}"];
        ${nodo.padre} -> nodoval${nodo.padre};
        `;

        return nodo;
    }
}

module.exports = Dato;