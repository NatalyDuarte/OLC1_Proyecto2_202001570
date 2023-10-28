const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Call extends Instruccion {

    constructor(nombre,parametros,linea,columna){
        super();
        this.nombre = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let expresion = this.expresion.ejecutar(entorno);
        console.log(expresion.valor);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.expresion.valor,"Print",expresion.tipo,entorno.nombre,this.linea,this.columna));
        s.agregarSalida(expresion.valor);
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoprint"+aleatorio.toString();
        const val =this.expresion.getAst();
        nodo.cadena =` 
        ${nodo.padre}[label ="Imprimir"];
        ${val.cadena}
        ${nodo.padre}->${val.padre};
        `;
        
        return nodo;
    }
}

module.exports = Call;