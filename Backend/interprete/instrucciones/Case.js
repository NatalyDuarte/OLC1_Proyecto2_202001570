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
        let s = Informacion.getInstance();
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
           s.agregarSalida(defau[0][0].expresion.valor);
        }else{
            console.log(datos2[encon][0].expresion.valor.replace(/"/g, ''));
            s.agregarSalida(datos2[encon][0].expresion.valor);
        }
    
        s.add_Simbolo(new Simb(dato.valor,"Case","Simple",entornoif.nombre,this.linea,this.columna)); 
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodocase"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Case"];
        nodoIDS${nodo.padre}[label="Dato"];
        nodoid${nodo.padre}[label="${this.dato.valor}"];
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
module.exports = Case;