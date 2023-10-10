const Instruccion = require('../Instruccion.js')

class Dato extends Instruccion{
    constructor(tipo,valor){
        super();
        this.valor = valor;
        this.tipo = tipo;
    }

    interpretar(entorno){
        switch(this.tipo){
            case 'INT':
                if (this.valor==null){
                    return new Number("0");
                }else{
                    return new Number(this.valor);
                }
            case 'DOUBLE':
                if (this.valor==null){
                    return new Number(0.0);
                }else{
                    return new Number(this.valor);
                }
            case 'VARCHAR':
                if (this.valor==null){
                    return Null;
                }else{
                    return new String(this.valor);
                }
            case 'DATE':
                if (this.valor==null){
                    return Null;
                }else{
                    return new String(this.valor);
                }
            case 'TRUE':
                if (this.valor==null){
                    return Null;
                }else{
                    return new String(this.valor);
                }
            case 'FALSE':
                if (this.valor==null){
                    return Null;
                }else{
                    return new String(this.valor);
                }
            case 'NULL':
                if (this.valor==null){
                    return Null;
                }else{
                    return new String(this.valor);
                }
        }
    }

    getArbol(){

    }
}

module.exports = Dato;