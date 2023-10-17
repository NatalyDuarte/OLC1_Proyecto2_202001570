const Instruccion = require("../Instruccion");

class Logico extends Instruccion{
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
            case 'and':
                if (izq.valor=== true && der.valor === true){
                    return true;
                }else{
                    return false;
                }
            case 'or':
                if (izq.valor=== true || der.valor === true){
                    return true;
                }else{
                    return false;
                }
            case 'not':
                if (!izq.valor=== true || !der.valor === true){
                    return true;
                }else{
                    return false;
                }
        }
        return this
    }
}

module.exports = Logico;