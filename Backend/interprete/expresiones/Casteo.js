const Instruccion = require("../Instruccion");
const Informacion = require("../instrucciones/Informacion");
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Casteo extends Instruccion{

    constructor(id, tipo,linea,columna){
        super();
        this.id = id;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let s = Informacion.getInstance();
        s.add_Simbolo(new Simb(this.id,"Casteo",this.tipo,entorno.nombre,this.linea,this.columna));
        switch(this.tipo.tipo){
            case 'int':
                this.id.valor = parseInt(this.id.valor);
                return this; 
            case 'double': 
                this.id.valor = parseFloat(this.id.valor);
                return this; 
            case 'date':
                this.id.valor = String(this.id.valor);
                return this;
            case 'varchar':  
                this.id.valor = String(this.id.valor);
                return this;
            case 'true':
                this.id.valor = Boolean(true);
                return this;
            case 'false':
                this.id.valor = Boolean(false);
                return this;
            case 'null':
                this.id.valor = String("null");
                return this;
        }
        return this;
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = contador.get();
        let nodoPadre = contador.get();

        let cadena = 
        `${nodoDato}[label="${this.id.valor}"]\n`+
        `${nodoPadre}[label="Casteo"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        let s = Informacion.getInstance();
        s.add_AST(cadena);
        
        return nodo;
    }
}

module.exports = Casteo;