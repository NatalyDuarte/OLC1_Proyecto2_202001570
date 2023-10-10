const Instruccion = require("../Instruccion");

class Variable extends Instruccion{

    constructor(nombre){
        super();
        this.nombre = nombre;
        this.valor = null;
    }

    ejecutar(entorno){
        let simbolo = entorno.obtenerSimbolo(this.nombre);
        this.valor = simbolo.valor;
        return this;
    }

}

module.exports = Variable;