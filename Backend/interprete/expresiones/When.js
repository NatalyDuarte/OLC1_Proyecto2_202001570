const Instruccion = require("../Instruccion");
var contador = require("../arbol/Contador");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
class When extends Instruccion{

    constructor(dato1,dato2,linea,columna){
        super();
        this.dato1 = dato1;
        this.dato2 = dato2;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        return this;
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodowhen"+aleatorio.toString();

        nodo.cadena =` 
        ${nodo.padre}[label ="When"];
        nodotipo${nodo.padre}[label="${this.dato1.valor}"];
        ${nodo.padre} -> nodotipo${nodo.padre};
        `;
        for (let i = 0; i < this.dato2.length; i++) {
            const val =this.dato2[i].getAst();
            nodo.cadena += ` 
            ${val.cadena.replace(/['" ]/g, '')}
            ${nodo.padre}->${val.padre};
            `;
        }
        
        return nodo;
    }
}

module.exports = When;