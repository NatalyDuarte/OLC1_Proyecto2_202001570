const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
const Entorno = require("../tablasimbolos/Entorno");
const e = require("cors");

class Funciones extends Instruccion{
    constructor(nombre, parametros, tipo, instrucciones,linea,columna){
        super();
        this.nombre = nombre;
        this.parametros = parametros; 
        this.tipo = tipo;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let entornoif = new Entorno("Funcion", entorno);
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.nombre.nombre,"Funcion",this.tipo.tipo,entornoif.nombre,this.linea,this.columna)); 
        entornoif.agregarFuncion(this.nombre.nombre, this.parametros, this.instrucciones);
        
    }
    getAst(){
        //Base de getast de https://github.com/Mocta-996/Laboratorio-OLC1-C-1S2023 y https://github.com/AlexIngGuerra/OLC1-2S2023
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodofuncion"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="FUNCION"];
        nodoIDS${nodo.padre}[label="Nombre"];
        nodoid${nodo.padre}[label="${this.nombre.nombre}"];
        ${nodo.padre} ->nodoIDS${nodo.padre} ->nodoid${nodo.padre};
        `;

        for (let i = 0; i < this.parametros.length; i++) {
            const val =this.parametros[i].getAst();
            nodo.cadena += ` 
            ${val.cadena}
            ${nodo.padre}->${val.padre};
            `;
        }

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
module.exports = Funciones;