const Simbolo = require("./Simbolo");
const Funcion = require("./Funcion");
const Tabla = require("./Tabla");
const Informacion = require("../instrucciones/Informacion");
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

    agregarTablaF(nombre,columna,fila){
        let nombrea = this.tablas['[object Object]']
        if(nombrea.nombre.nombre === nombre){
            for (let i = 0; i < nombrea.columnas.length; i++) {
                for (let o = 0; o < columna.length; o++){
                    if(nombrea.columnas[i].id === columna[o].id){
                        console.log("llego")
                        nombrea.columnas[i].fila.push(fila)
                        console.log(nombrea.columnas[i].fila)
                    }
                }
            }
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
        let s = Informacion.getInstance();
        console.log("Se elimino correctamente la columna "+ column+ " de la tabla "+nombre)
        s.agregarSalida("Se elimino correctamente la columna "+ column+ " de la tabla "+nombre);
    }

    CambiarTablaN(nombre,column){
        let nombrea = this.tablas['[object Object]'].nombre
        console.log(nombrea)
        if(nombrea.nombre === nombre){
            nombrea.nombre = column;
        }
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

    EliminarTF(nombre){
        let nombrea = this.tablas['[object Object]']
        if(nombrea.nombre.nombre === nombre){
            for (let i = 0; i < nombrea.columnas.length; i++) {
                for (let o = 0; o < nombrea.columnas[i].fila.length; o++){
                    nombrea.columnas[i].fila.splice(o,1);
                    console.log(nombrea.columnas[i])
                    break;
                }
            }
        }
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

    obtenerColumna(nombre,columna){
        let nombrea = this.tablas['[object Object]']
        let s = Informacion.getInstance();
        if(nombrea.nombre.nombre === nombre){
            for (let i = 0; i < nombrea.columnas.length; i++) {
                if(nombrea.columnas[i].id === columna){
                    console.log("El nombre de la columna es: "+ nombrea.columnas[i].id);
                    s.agregarSalida("El nombre de la columna es: "+ nombrea.columnas[i].id);
                    console.log("El tipo de la columna es: "+ nombrea.columnas[i].tipo);
                    s.agregarSalida("El tipo de la columna es: "+ nombrea.columnas[i].tipo);
                    for (let o = 0; o < nombrea.columnas[i].fila.length; o++){
                        console.log("Las filas que contiene la columna son: "+ nombrea.columnas[i].fila[o][o].id);
                        s.agregarSalida("Las filas que contiene la columna son: "+ nombrea.columnas[i].fila[o][o].id);
                    }
                    console.log("----------------------------------------")
                    s.agregarSalida("----------------------------------------");
                }
            }
        }
    }

    obtenerTabla(nombre){
        let nombrea = this.tablas['[object Object]']
        let s = Informacion.getInstance();
        if(nombrea.nombre.nombre === nombre){
            for (let i = 0; i < nombrea.columnas.length; i++) {
                console.log("El nombre de la columna es: "+ nombrea.columnas[i].id);
                s.agregarSalida("El nombre de la columna es: "+ nombrea.columnas[i].id);
                console.log("El tipo de la columna es: "+ nombrea.columnas[i].tipo);
                s.agregarSalida("El tipo de la columna es: "+ nombrea.columnas[i].tipo);
                for (let o = 0; o < nombrea.columnas[i].fila.length; o++){
                    console.log("Las filas que contiene la columna son: "+ nombrea.columnas[i].fila[o][o].id);
                    s.agregarSalida("Las filas que contiene la columna son: "+ nombrea.columnas[i].fila[o][o].id);
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