const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class SelectVari extends Instruccion {
    constructor(expresion,colu,linea,columna){
        super();
        this.expresion = expresion ;
        this.colu = colu ;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let expresion = entorno.obtenerSimbolo(this.expresion);
        console.log(expresion);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion.valor,"Select","Variable",entorno.nombre,this.linea,this.columna));
        s.agregarSalida(expresion.valor);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodosel"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="SELECT"];
        nodoIDS${nodo.padre}[label="Variable"];
        nodoid${nodo.padre}[label="${this.expresion}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;
        
        return nodo;
    }
}

module.exports = SelectVari ;