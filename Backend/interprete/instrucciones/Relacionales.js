const Instruccion = require("../Instruccion");

class Relacionales extends Instruccion{
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
        switch(this.op){
            case '=':
                return this;
        }
        return this
    }
}

module.exports = Relacionales;