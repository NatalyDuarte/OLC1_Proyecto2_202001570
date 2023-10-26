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
                datos1.push(this.instrucciones[i].dato1.valor);
                datos2.push(this.instrucciones[i].dato2);
            }else if ( this.instrucciones[i].Instruccion != undefined){
                defau.push(this.instrucciones[i].Instruccion)
            }
        }
        if(datos1.length>0){
            for (let i = 0; i < datos1.length; i++) {
                console.log(datos1[i])
            }
        }
       
    
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(dato.valor,"Case","Buscado",entorno.nombre,this.linea,this.columna)); 
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodocaseb"+aleatorio.toString();
        const val =this.instrucciones.getAst();
        nodo.cadena =` 
        ${nodo.padre}[label ="CaseB"];
        ${val.cadena}
        ${nodo.padre}->${val.padre};
        `;
        
        return nodo;
    }
}
module.exports = CaseB;