const Instruccion = require('../instrucciones/Errores.js')

class Informacion {
    constructor() {
        this.error = [];
        this.AST = "";
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

    add_AST(cadena) {
        this.AST += cadena;
    }

    get_AST() {
        return this.AST;
    }

    clear_AST() {
        this.AST = "";
    }

    clear_Errors() {
        this.error = [];
    }

    clear_Enviroment() {
        this.enviroment = new env(null);
    }

    add_Variable(id, tipo, linea, columna, valor) {
        this.enviroment.guardar_Variable(id, tipo, linea, columna, valor);
    }

    add_Funcion(id, tipo, linea, columna, valor) {
        this.enviroment.guardar_funcion(id, tipo, linea, columna, valor);
    }

    get_Env() {
        return this.enviroment;
    }
}

module.exports = Informacion;
