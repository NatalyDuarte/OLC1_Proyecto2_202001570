const Instruccion = require('../Instruccion.js')

class Tabla extends Instruccion{
    constructor(nombre,columnas){
        super();
        this.nombre = nombre;
        this.columnas = columnas;
    }

    interpretar(entorno){
        let valor = this.columnas.interpretar(null);
        console.log(valor);
        return this;
    }

    getArbol(){

    }
}

module.exports = Tabla;