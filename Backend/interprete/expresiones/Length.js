const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Length extends Instruccion{

    constructor(variable, linea,columna){
        super();
        this.variable = variable;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.variable.valor,"Funcion Nativa","Length",entorno.nombre,this.linea,this.columna));
        let expresion = this.variable.ejecutar(entorno);
        console.log(expresion.valor)
        expresion.valor = expresion.valor.length;
        console.log(expresion.valor);
        //s.agregarSalida(expresion.valor);
        return expresion.valor;
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodolength"+aleatorio.toString();

        nodo.cadena =` 
        ${nodo.padre}[label ="LENGTH"];
        nodotipo${nodo.padre}[label="${this.variable.valor}"];
        ${nodo.padre} -> nodotipo${nodo.padre} ;
        `;
        
        return nodo;
    }
}

module.exports = Length;