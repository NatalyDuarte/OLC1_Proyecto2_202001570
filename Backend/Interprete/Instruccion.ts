export abstract class Instruccion {
    constructor(public linea: number, public columna: number){
        this.linea = linea;
        this.columna = columna;
    }
    public abstract interpretar():any;
    public abstract ast():string;
    public abstract tablaSimbolos():any;
}