const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class Case extends Instruccion{
    constructor(dato, instrucciones,linea,columna){
        super();
        this.dato = dato;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornoif = new Entorno("Case Simple", entorno);
        let dato = this.dato.ejecutar(entornoif);
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
        var encon = -1;
        if(datos1.length>0){
            for (let i = 0; i < datos1.length; i++) {
                if ( datos1[i] === dato.valor){
                    encon = i;
                }
            }
        }
        if(encon === -1){
           console.log(defau[0][0].expresion.valor.replace(/"/g, ''));
        }else{
            console.log(datos2[encon][0].expresion.valor.replace(/"/g, ''))
        }
    
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(dato.valor,"Case","Simple",entorno.nombre,this.linea,this.columna)); 
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.dato.valor}"]\n`+
        `${nodoPadre}[label="Case"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}
module.exports = Case;