const Instruccion = require("../Instruccion");

class Encapsula extends Instruccion{

    constructor(expresion){
        super();
        this.expresion = expresion;
    }

    ejecutar(entorno){
        let expresion = this.expresion.ejecutar(entorno).valor;
        entorno.agregarSimbolo("Encapsulamiento", expresion)
    }

    /*getVariable(nombre){
        if (nombre = this.id.ejecutar(entorno).valor){
            return nombre;
        }else{
            return "null";
        }
    }*/
}

module.exports = Encapsula;