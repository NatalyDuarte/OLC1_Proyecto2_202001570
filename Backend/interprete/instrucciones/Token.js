class Token{
    constructor(lexema,token,linea,columna){
        this.lexema = lexema;
        this.token = token;
        this.linea = linea;
        this.columna = columna;

    }
}

module.exports = Token;