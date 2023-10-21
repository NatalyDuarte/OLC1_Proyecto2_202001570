const Instruccion = require('../instrucciones/Errores.js')

class Informacion {
    constructor() {
        this.error = [];
        this.simbolos = [];
        this.tokens = [];
        this.AST = "";
        this.interpre = "";
    }

    static getInstance() {
        if (!Informacion.instance) {
            Informacion.instance = new Informacion();
        }
        return Informacion.instance;
    }

    add_Error(data) {
        this.error.push(data);
    }

    get_Errors() {
        return this.error;
    }

    add_Token(data) {
        this.tokens.push(data);
    }

    get_Token() {
        return this.tokens;
    }

    add_Simbolo(data) {
        this.simbolos.push(data);
    }

    get_Simbolo() {
        return this.simbolos;
    }

    add_AST(cadena) {
        this.AST += cadena;
    }

    get_AST() {
        return this.AST;
    }

    add_Inter(cadena) {
        this.interpre += cadena;
    }

    get_Inter() {
        return this.interpre;
    }

    clear_AST() {
        this.AST = "";
    }

    clear_Errors() {
        this.error = [];
    }

}

module.exports = Informacion;
