const Instruccion = require("../Instruccion");

class Relacionales extends Instruccion{
    constructor(izq,der){
        super();
        this.izq = izq;
        this.der = der;
        this.valor = null;
    }

    ejecutar(entorno){
        let izq = this.izq.ejecutar(entorno);
        let der = this.der.ejecutar(entorno);
        switch(this.op){
            case '=':
                if (izq.valor === der.valor){
                    return true;
                }else{
                    return false;
                }
            case '!=':
                if (izq.valor !== der.valor){
                    return true;
                }else{
                    return false;
                }
            case '<':
                if (izq.valor < der.valor){
                    return true;
                }else{
                    return false;
                }
            case '<=':
                if (izq.valor <= der.valor){
                    return true;
                }else{
                    return false;
                }
            case '>':
                if (izq.valor > der.valor){
                    return true;
                }else{
                    return false;
                }
            case '>=':
                if (izq.valor >= der.valor){
                    return true;
                }else{
                    return false;
                }
        }
        return this
    }
}

module.exports = Relacionales;