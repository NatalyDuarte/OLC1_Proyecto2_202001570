const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Round extends Instruccion{

    constructor(numero, decimales, linea,columna){
        super();
        this.numero = numero;
        this.decimales = decimales;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.numero.valor,"Funcion Nativa","Round",entorno.nombre,this.linea,this.columna));
        var valor = Number(this.numero.valor);
        this.numero.valor = valor.toFixed(this.decimales.valor);
        console.log(this.numero.valor);
        //s.agregarSalida(expresion.valor);
        return this.numero.valor;
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoround"+aleatorio.toString();

        nodo.cadena =` 
        ${nodo.padre}[label ="ROUND"];
        nodotipo${nodo.padre}[label="${this.numero.valor}"];
        ${nodo.padre} -> nodotipo${nodo.padre} ;
        `;
        
        return nodo;
    }
}

module.exports = Round;