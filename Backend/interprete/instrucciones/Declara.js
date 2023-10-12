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
        if (nombre = this.id.ejecutar(entorno).valor){
            return nombre;
        }else{
            return "null";
        }
    }*/
}

module.exports = Declara;