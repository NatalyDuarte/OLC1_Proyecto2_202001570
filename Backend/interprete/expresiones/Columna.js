const Instruccion = require("../Instruccion");

class Columna extends Instruccion{

    constructor(nombre,tipo){
        super();
        this.nombre = nombre;
        this.tipo = tipo;
    }

    ejecutar(entorno){
        let simbolo = entorno.obtenerSimbolo(this.nombre);
        this.valor = simbolo.valor;
        return this;
    }

}

module.exports = Columna;