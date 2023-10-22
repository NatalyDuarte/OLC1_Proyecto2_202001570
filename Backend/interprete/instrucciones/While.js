const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class While extends Instruccion{
    constructor(condicion, instrucciones,linea,columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornowh = new Entorno("While", entorno);
        let condicion = this.condicion.ejecutar(entornowh);
        do{
            console.log( "Aqui");
            console.log (condicion.valor);
            this.instrucciones.forEach(instruccion => {
                instruccion.ejecutar(entornowh);
            }); 
        }while (condicion.valor);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(condicion.valor,"While",condicion.tipo,entorno.nombre,this.linea,this.columna)); 
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.condicion.valor}"]\n`+
        `${nodoPadre}[label="While"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}
module.exports = While;