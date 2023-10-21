const Instruccion = require("../Instruccion");
const Informacion = require ("../instrucciones/Informacion.js")
const Simb = require("../tablasimbolos/TablaSimbolos.js")
var contador = require("../arbol/Contador");
class Aritmetica extends Instruccion{
    constructor(izq, op, der,linea,columna){
        super();
        this.izq = izq;
        this.der = der;
        this.op = op;
        this.linea = linea;
        this.columna = columna;
        this.valor = null;
    }

    ejecutar(entorno){
        let izq = this.izq.ejecutar(entorno);
        let der = this.der.ejecutar(entorno);
        let s = Informacion.getInstance();
        var comillasSimples = /'/g; // Expresión regular para comillas simples
        var comillasDobles = /"/g; // Expresión regular para comillas dobles
        switch(this.op){
            case '+':
               if (!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) + Number(der.valor);
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this);
                }else if(!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                }else if (!isNaN(parseFloat(izq.valor))===true && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                }else if(!isNaN(parseFloat(izq.valor))===true && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                }else if((izq.valor === "true" || izq.valor === "false")||(der.valor === "true" || der.valor === "false")){
                    console.log('miVariable es un valor booleano.');
                    this.valor = String("null");
                    console.log(this.valor);
                }else if(comillasSimples.test(izq.valor) || comillasDobles.test(izq.valor) && comillasSimples.test(der.valor) || comillasDobles.test(der.valor) ){
                    this.valor = String(izq.valor.replace(/['"]/g, '')) + String(der.valor.replace(/['"]/g, ''))
                    this.valor = String(this.valor);
                    console.log('Las dos variables son string.');
                    console.log(this.valor)
                }else if(comillasSimples.test(izq.valor) || comillasDobles.test(izq.valor) && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor)) ){
                    this.valor = parseInt(izq.valor.replace(/['"]/g, '')) + parseInt(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es varchar y la segunda int.');
                    console.log(this.valor)
                }else if(!isNaN(parseFloat(izq.valor))===true && comillasSimples.test(der.valor) || comillasDobles.test(der.valor)){
                    this.valor = Number(izq.valor) + Number(der.valor.replace(/['"]/g, ''))
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es float y la segunda varchar.');
                    console.log(this.valor)
                }else if (comillasSimples.test(izq.valor) || comillasDobles.test(izq.valor) && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor.replace(/['"]/g, '')) + Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es varchar y la segunda float.');
                    console.log(this.valor)
                }else if (!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && comillasSimples.test(der.valor) || comillasDobles.test(der.valor) ){
                    this.valor = Number(izq.valor) + Number(der.valor.replace(/['"]/g, ''))
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es int y la segunda varchar.');
                    console.log(this.valor)
                }else {
                    console.log('El tipo de miVariable no es una cadena, número ni valor booleano.');
                    this.valor = String("null")
                }
                return this
            case '*':
                if (!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) * Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                }else if(!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) * Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                }else if(!isNaN(parseFloat(izq.valor))===true && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) * Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                }else {
                    console.log('Por el tipo de dato no se puede resolver la multiplicacion');
                    this.valor = String("null")
                }
                return this
            case '-':
                if (!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                }else if(!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                }else if (!isNaN(parseFloat(izq.valor))===true && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                }else if(!isNaN(parseFloat(izq.valor))===true && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                }else if((izq.valor === "true" || izq.valor === "false")||(der.valor === "true" || der.valor === "false")){
                    console.log('miVariable es un valor booleano.');
                    this.valor = String("null");
                    console.log(this.valor);
                }else if(comillasSimples.test(izq.valor) || comillasDobles.test(izq.valor) && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor)) ){
                    this.valor = parseInt(izq.valor.replace(/['"]/g, '')) - parseInt(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es varchar y la segunda int.');
                    console.log(this.valor)
                }else if(!isNaN(parseFloat(izq.valor))===true && comillasSimples.test(der.valor) || comillasDobles.test(der.valor)){
                    this.valor = Number(izq.valor) - Number(der.valor.replace(/['"]/g, ''))
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es float y la segunda varchar.');
                    console.log(this.valor)
                }else if (comillasSimples.test(izq.valor) || comillasDobles.test(izq.valor) && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor.replace(/['"]/g, '')) - Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variables es varchar y la segunda float.');
                    console.log(this.valor)
                }else if (!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && comillasSimples.test(der.valor) || comillasDobles.test(der.valor) ){
                    this.valor = Number(izq.valor) - Number(der.valor.replace(/['"]/g, ''))
                    this.valor = parseInt(this.valor);
                    console.log('Las primera variables es int y la segunda varchar.');
                    console.log(this.valor)
                }else if(comillasSimples.test(izq.valor) || comillasDobles.test(izq.valor) && comillasSimples.test(der.valor) || comillasDobles.test(der.valor) ){
                    this.valor = String(izq.valor.replace(/['"]/g, '')) - String(der.valor.replace(/['"]/g, ''))
                    this.valor = String(this.valor);
                    console.log('Las dos variables son string.');
                    console.log(this.valor)
                } else {
                    console.log('El tipo de miVariable no es una cadena, número ni valor booleano.');
                    this.valor = String("null")
                }
                return this
            case '/':
                if (!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) / Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                }else if(!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) / Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                }else if (!isNaN(parseFloat(izq.valor))===true && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) / Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                }else if(!isNaN(parseFloat(izq.valor))===true && !isNaN(parseFloat(der.valor))===true){
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
                if (!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseInt(this.valor);
                    console.log('Las dos variables son int.');
                    console.log(this.valor);
                }else if(!isNaN(parseInt(izq.valor)) && Number.isInteger(Number(izq.valor)) && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es int y la segunda float.');
                    console.log(this.valor);
                }else if (!isNaN(parseFloat(izq.valor))===true && !isNaN(parseInt(der.valor)) && Number.isInteger(Number(der.valor))){
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las primera variable es float y la segunda int.');
                    console.log(this.valor);
                }else if(!isNaN(parseFloat(izq.valor))===true && !isNaN(parseFloat(der.valor))===true){
                    this.valor = Number(izq.valor) % Number(der.valor)
                    this.valor = parseFloat(this.valor);
                    console.log('Las dos variables son float.');
                    console.log(this.valor);
                } else {
                    console.log('Por el tipo de dato no se puede resolver la division');
                    this.valor = String("null")
                }
                return this;
        }
        
        return this
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let izq = this.izq.getAst();
        let der = this.der.getAst();
        
        let op = contador.get();
        let padre = contador.get();

        nodo.padre = padre;
        nodo.cadena =
            izq.cadena+
            der.cadena+
            `${op}[label="${this.op}"]\n`+
            `${padre}[label="expresion"]\n`+
            `${padre}--${izq.padre}\n`+
            `${padre}--${op}\n`+
            `${padre}--${der.padre}\n`
            ;
        let s = Informacion.getInstance();
        s.add_AST(nodo.cadena);

        return nodo;

    }
}

module.exports = Aritmetica;