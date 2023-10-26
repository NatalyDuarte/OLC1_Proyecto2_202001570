const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno")

class If extends Instruccion{
    constructor(condicion, instrucciones,linea,columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornoif = new Entorno("If Simple", entorno);
        let condicion = this.condicion.ejecutar(entornoif);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(condicion.valor,"If",condicion.tipo,entorno.nombre,this.linea,this.columna)); 
        var datos = [];
        var defau = [];
        for (let i = 0; i < this.instrucciones.length; i++) {
            if (this.instrucciones[i].expresion != undefined){
                datos.push(this.instrucciones[i].expresion.valor);
            }else if ( this.instrucciones[i].Instruccion != undefined){
                defau.push(this.instrucciones[i].Instruccion)
            }
        }
        if(condicion.valor){
            console.log(datos[0].replace(/"/g, ''));
            s.agregarSalida(datos[0]);
        }else{
            console.log(defau[0][0].expresion.valor.replace(/"/g, ''));
            s.agregarSalida(defau[0][0].expresion.valor);
        }
        
    }
    getAst(){
        //Base de getast de https://github.com/Mocta-996/Laboratorio-OLC1-C-1S2023 y https://github.com/AlexIngGuerra/OLC1-2S2023
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodoif"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="Case"];
        nodoIDS${nodo.padre}[label="Condicion"];
        nodoid${nodo.padre}[label="${this.condicion.valor}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;

        for (let i = 0; i < this.instrucciones.length; i++) {
            const val =this.instrucciones[i].getAst();
            nodo.cadena += ` 
            ${val.cadena.replace(/['" ]/g, '')}
            ${nodo.padre}->${val.padre};
            `;
        }
        
        return nodo;
    }
}
module.exports = If;