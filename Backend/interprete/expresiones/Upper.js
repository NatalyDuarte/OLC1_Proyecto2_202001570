const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Upper extends Instruccion{

    constructor(id, linea,columna){
        super();
        this.id = id;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Funcion Nativa","Upper",entorno.nombre,this.linea,this.columna));
        let expresion = this.id.ejecutar(entorno);
        expresion.valor = expresion.valor.toUpperCase(); 
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
        nodo.padre = "nodoupper"+aleatorio.toString();

        nodo.cadena =` 
        ${nodo.padre}[label ="UPPER"];
        nodotipo${nodo.padre}[label="${this.id.valor}"];
        ${nodo.padre} -> nodotipo${nodo.padre} ;
        `;
        
        return nodo;
    }
}

module.exports = Upper;