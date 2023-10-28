const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Typeof extends Instruccion{

    constructor(cadena, linea,columna){
        super();
        this.cadena = cadena;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.cadena.valor,"Funcion Nativa","Typeof",entorno.nombre,this.linea,this.columna));
        var tipo = "String" ;
        if (!isNaN(parseInt(this.cadena.valor)) && Number.isInteger(Number(this.cadena.valor))){
            tipo = "Integer";
        }else if (!isNaN(parseFloat(this.cadena.valor))===true){
            tipo = "Double";
        }else if (this.cadena.valor === "true" || this.cadena.valor === "false"){
            tipo = "Boolean";
        }else if (this.cadena.valor === "null"){
            tipo = "Null";
        }else{
            tipo = "String";
        }
        console.log(tipo);
        //s.agregarSalida(expresion.valor);
        return tipo;
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodotypeof"+aleatorio.toString();

        nodo.cadena =` 
        ${nodo.padre}[label ="Typeof"];
        nodotipo${nodo.padre}[label="${this.cadena.valor}"];
        ${nodo.padre} -> nodotipo${nodo.padre} ;
        `;
        
        return nodo;
    }
}

module.exports = Typeof;