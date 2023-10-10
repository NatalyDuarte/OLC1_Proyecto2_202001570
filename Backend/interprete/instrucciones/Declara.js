const Instruccion = require("../Instruccion");

class Declara extends Instruccion{

    constructor(id, expresion){
        super();
        this.id = id;
        this.expresion = expresion;
    }

    ejecutar(entorno){
        let expresion = this.expresion.ejecutar(entorno).valor;
        entorno.agregarSimbolo(this.id, expresion)
    }

    /*getVariable(nombre){

    }*/
}

module.exports = Declara;