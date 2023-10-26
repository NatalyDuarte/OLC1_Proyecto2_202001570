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
            this.instrucciones.forEach(instruccion => {
                instruccion.ejecutar(entornowh);
            }); 
        }while (condicion.valor);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(condicion.valor,"While",condicion.tipo,entorno.nombre,this.linea,this.columna)); 
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoif"+aleatorio.toString();
        const val =this.instrucciones.getAst();
        nodo.cadena =` 
        ${nodo.padre}[label ="While"];
        nodoIDS${nodo.padre}[label="Condicion"];
        nodoid${nodo.padre}[label="${this.condicion.valor}"];
        ${val.cadena}
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        ${nodo.padre}->${val.padre};
        `;
        
        return nodo;
    }
}
module.exports = While;