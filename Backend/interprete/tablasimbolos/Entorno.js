const Simbolo = require("./Simbolo");
const Funcion = require("./Funcion");
const Tabla = require("./Tabla");
class Entorno {
    constructor(nombre, anterior){
        this.tablasimbolos = {};
        this.tablafunciones = {};
        this.tablas = {};
        this.anterior = anterior;
        this.nombre = nombre;
    }

    agregarTabla(nombre,column){
        let Tabl = new Tabla(nombre,column);
        this.tablas[nombre]= Tabl;
    }

    agregarTablaC(nombre,column){
        let nombrea = this.tablas['[object Object]']
        if(nombrea.nombre.nombre === nombre){
            nombrea.columnas.push(column)
            console.log(nombrea.columnas)
        }
    }

    EliminarTablaC(nombre,column){
        let nombrea = this.tablas['[object Object]']
        if(nombrea.nombre.nombre === nombre){
            for (let i = 0; i < nombrea.columnas.length; i++) {
                if(nombrea.columnas[i].id === column){
                    nombrea.columnas.splice(i,1);
                    break;
                }
              }
        }
        console.log(nombrea.columnas)
        console.log("Se elimini correctamente la columna "+ column+ " de la tabla "+nombre)
    }

    CambiarTablaN(nombre,column){
        let nombrea = this.tablas['[object Object]'].nombre
        console.log(nombrea)
        if(nombrea.nombre === nombre){
            console.log("Aqui")
            nombrea.nombre = column;
        }
        console.log(nombrea.nombre)
    }

    EliminarT(nombre){
        let nombrea = this.tablas['[object Object]']
        for (let i = 0; i < nombrea.nombre.length; i++) {
            if(nombrea.nombre[i].nombre === nombre){
                nombrea.nombre.splice(i,1);
                break;
            }
        }
        console.log(nombrea.nombre)
    }

    CambiarTablaNC(nombre,column,nombreco){
        let nombrea = this.tablas['[object Object]']
        if(nombrea.nombre.nombre === nombre){
            for (let i = 0; i < nombrea.columnas.length; i++) {
                if(nombrea.columnas[i].id === column){
                    nombrea.columnas[i].id = nombreco;
                    console.log(nombrea.columnas[i].id);
                }
              }
        }
    }

    agregarSimbolo(nombre, valor){
        let simbolo = new Simbolo(nombre, valor)
        this.tablasimbolos[nombre] = simbolo;
    }

    obtenerSimbolo(nombre){
        let entorno = this;
        let valor = entorno.tablasimbolos[nombre];

        while (valor == undefined && entorno.anterior != null){
            entorno = entorno.anterior;
            valor = entorno.tablasimbolos[nombre];
        }

        return valor;
    }

    agregarFuncion(nombre, parametros, instrucciones){
        let simbolo = new Funcion(nombre, parametros, instrucciones)
        this.tablafunciones[nombre] = simbolo;
    }

    obtenerFuncion(nombre){
        let entorno = this;
        let valor = entorno.tablafunciones[nombre];

        while (valor == undefined && entorno.anterior != null){
            entorno = entorno.anterior;
            valor = entorno.tablafunciones[nombre];
        }

        return valor;
    }
}

module.exports = Entorno;