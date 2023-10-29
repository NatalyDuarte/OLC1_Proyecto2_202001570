const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class CaseB extends Instruccion{
    constructor(instrucciones,linea,columna){
        super();
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornoif = new Entorno("Case Buscado", entorno);
        var datos1 = [];
        var datos2 = [];
        var defau = [];
        for (let i = 0; i < this.instrucciones.length; i++) {
            if (this.instrucciones[i].dato1!= undefined){
                var resu = this.instrucciones[i].dato1.ejecutar(entornoif);
                if(resu.valor === true){
                    for (let u = 0; u < this.instrucciones[i].dato2.length; u++) {
                       this.instrucciones[i].dato2[u].ejecutar(entornoif);
                    }
                }
            }else if ( this.instrucciones[i].Instruccion != undefined){
                for (let o = 0; o < this.instrucciones[i].Instruccion.length; o++) {
                    this.instrucciones[i].Instruccion[o].ejecutar(entornoif);
                }
                
            }
        }
        


        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb("Case","Case","Buscado",entornoif.nombre,this.linea,this.columna)); 
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodocaseb"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="CASEBUSCADO"];
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
module.exports = CaseB;