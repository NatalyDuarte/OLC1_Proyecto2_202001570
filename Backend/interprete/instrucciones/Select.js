const Instruccion = require("../Instruccion");

class Select extends Instruccion{
    constructor(izq, op, der){
        super();
        this.izq = izq;
        this.der = der;
        this.op = op;
        this.valor = null;
    }

    ejecutar(entorno){
        let izq = this.izq.ejecutar(entorno);
        let der = this.der.ejecutar(entorno);
        console.log(der.valor)
        return der.valor
    }
}

module.exports = Select;