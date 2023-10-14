const Instruccion = require("../Instruccion");

class Aritmetica extends Instruccion{
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
            case '+':
                if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number' && Number.isInteger(der.valor)) {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                } else if (Number.isInteger(der.valor) &&  typeof izq.valor === 'number') {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' &&  typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                }else if (typeof izq.valor === 'boolean' || typeof der.valor ==='boolean' ) {
                    console.log('miVariable es un valor booleano.');
                    this.valor = String("No se puede realizar la suma");
                } else if (typeof izq.valor === 'string' &&  typeof der.valor === 'number' && Number.isInteger(der.valor)) {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es varchar y la segunda int.');
                    console.log(this.valor)
                } else if (typeof der.valor === 'string' &&  typeof izq.valor === 'number' && Number.isInteger(izq.valor)) {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es int y la segunda varchar.');
                    console.log(this.valor)
                } else if (typeof izq.valor === 'number' &&  typeof der.valor === 'string' ) {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es float y la segunda varchar.');
                    console.log(this.valor)
                } else if (typeof der.valor === 'number' &&  typeof izq.valor === 'string' ) {
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es varchar y la segunda float.');
                    console.log(this.valor)
                } else if (typeof der.valor === 'string' &&  typeof izq.valor === 'string' ) {
                    this.valor = String(izq.valor) + String(der.valor)
                    this.valor = String(this.valor);
                    console.log('Las dos variables son string.');
                    console.log(this.valor)
                } else {
                    console.log('El tipo de miVariable no es una cadena, número ni valor booleano.');
                    this.valor = String("null")
                }
                return this
            case '*':
                if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number' && Number.isInteger(der.valor)) {
                    this.valor = Number(izq.valor) * Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) * Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                } else if (Number.isInteger(der.valor) &&  typeof izq.valor === 'number') {
                    this.valor = Number(izq.valor) * Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' &&  typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) * Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                } else {
                    console.log('Por el tipo de dato no se puede resolver la multiplicacion');
                    this.valor = String("null")
                }
                return this
            case '-':
                if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number' && Number.isInteger(der.valor)) {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                } else if (Number.isInteger(der.valor) &&  typeof izq.valor === 'number') {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' &&  typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                }else if (typeof izq.valor === 'boolean' || typeof der.valor ==='boolean' ) {
                    console.log('miVariable es un valor booleano.');
                    this.valor = String("No se puede realizar la resta");
                } else if (typeof izq.valor === 'string' &&  typeof der.valor === 'number' && Number.isInteger(der.valor)) {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es varchar y la segunda int.');
                    console.log(this.valor)
                } else if (typeof der.valor === 'string' &&  typeof izq.valor === 'number' && Number.isInteger(izq.valor)) {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es int y la segunda varchar.');
                    console.log(this.valor)
                } else if (typeof izq.valor === 'number' &&  typeof der.valor === 'string' ) {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es float y la segunda varchar.');
                    console.log(this.valor)
                } else if (typeof der.valor === 'number' &&  typeof izq.valor === 'string' ) {
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es varchar y la segunda float.');
                    console.log(this.valor)
                } else if (typeof der.valor === 'string' &&  typeof izq.valor === 'string' ) {
                    this.valor = String(izq.valor) - String(der.valor)
                    this.valor = String(this.valor);
                    console.log('Las dos variables son string.');
                    console.log(this.valor)
                } else {
                    console.log('El tipo de miVariable no es una cadena, número ni valor booleano.');
                    this.valor = String("null")
                }
                return this
            case '/':
                if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number' && Number.isInteger(der.valor)) {
                    this.valor = Number(izq.valor) / Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) / Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                } else if (Number.isInteger(der.valor) &&  typeof izq.valor === 'number') {
                    this.valor = Number(izq.valor) / Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' &&  typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) / Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                } else {
                    console.log('Por el tipo de dato no se puede resolver la division');
                    this.valor = String("null")
                }
                return this
            case '%':
                if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number' && Number.isInteger(der.valor)) {
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' && Number.isInteger(izq.valor) && typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                } else if (Number.isInteger(der.valor) &&  typeof izq.valor === 'number') {
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                } else if (typeof izq.valor === 'number' &&  typeof der.valor === 'number') {
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                } else {
                    console.log('Por el tipo de dato no se puede resolver la division');
                    this.valor = String("null")
                }
                return this
            //case 'Nega':
        }
        
        return this
    }
}

module.exports = Aritmetica;