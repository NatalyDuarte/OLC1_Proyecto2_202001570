const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class For extends Instruccion{
    constructor(condicion, inicio, fin, instrucciones,linea,columna){
        super();
        this.condicion = condicion;
        this.inicio = inicio;
        this.fin = fin;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornowh = new Entorno("For", entorno);
        let limit = 0;
        var consta ;
        for (let i = Number(this.inicio.valor); i < Number(this.fin.valor); i++) {
            this.instrucciones.forEach(element => {
                consta = element.ejecutar(entornowh);
            });
            if(consta === "Break") {
                console.log("Llego")
                break;
                
            } else if(consta === "Continue") {
                continue;
            }
            if(limit == 10000) {
                let er = console.log("Limite de iteraciones For");
                break;
            }
          }
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.condicion.valor,"For","For",entorno.nombre,this.linea,this.columna)); 
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodofor"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="FOR"];
        nodoIDS${nodo.padre}[label="Inicio"];
        nodoid${nodo.padre}[label="${this.inicio.valor}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        nodoI${nodo.padre}[label="Fin"];
        nodoi${nodo.padre}[label="${this.fin.valor}"];
        ${nodo.padre} ->nodoI${nodo.padre} ->nodoi${nodo.padre};
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
module.exports = For;