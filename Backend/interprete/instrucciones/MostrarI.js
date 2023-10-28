const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Mostrar extends Instruccion {

    constructor(expresion,linea,columna){
        super();
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        for (let i = 0; i < this.expresion.length; i++) {
            let expresion = this.expresion[i].ejecutar(entorno);
            s.agregarSalida(expresion);
        }
        s.add_Simbolo(new Simb(this.expresion.valor,"Print",this.expresion.tipo,entorno.nombre,this.linea,this.columna));
        
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoprint"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Imprimir"];
        `;
        for (let i = 0; i < this.expresion.length; i++) {
            const val =this.expresion[i].getAst();
            nodo.cadena += ` 
            ${val.cadena.replace(/['" ]/g, '')}
            ${nodo.padre}->${val.padre};
            `;
        }
        return nodo;
    }
}

module.exports = Mostrar;