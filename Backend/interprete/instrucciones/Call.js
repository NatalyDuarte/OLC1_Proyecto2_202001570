const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Call extends Instruccion {

    constructor(nombre,parametros,linea,columna){
        super();
        this.nombre = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.nombre.nombre,"Llamado","Funcion",entorno.nombre,this.linea,this.columna));
        var val = entorno.obtenerFuncion(this.nombre.nombre);
        console.log(val)
    }
    getAst(){
        let nodo = {
            padre: "",
            cadena: ""
        }

        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        nodo.padre = "nodopcall"+aleatorio.toString();
        nodo.cadena =` 
        ${nodo.padre}[label ="LLAMADOFUNCION"];
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
        
        return nodo;
    }
}

module.exports = Call;