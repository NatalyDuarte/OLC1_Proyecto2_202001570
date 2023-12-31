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
        let limit = 0;
        var consta ;
        while(condicion.valor) {
            this.instrucciones.forEach(element => {
                consta = element.ejecutar(entornowh);
            });
            if(consta === "Break") {
                console.log("Llego")
                break;
                
            } else if(consta === "Continue") {
                continue;
            }
            condicion = this.condicion.ejecutar(entornowh);
            if(limit == 10000) {
                let er = console.log("Limite de iteraciones While");
                break;
            }
        }
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
        nodo.cadena =` 
        ${nodo.padre}[label ="While"];
        nodoIDS${nodo.padre}[label="Condicion"];
        nodoid${nodo.padre}[label="${this.condicion.valor}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;
        for (let i = 0; i < this.instrucciones.length; i++) {
            const val =this.instrucciones[i].getAst();
            nodo.cadena += ` 
            ${val.cadena}
            ${nodo.padre}->${val.padre};
            `;
        }
        
        return nodo;
    }
}
module.exports = While;