const parser = require("../analizador/Parser.js")
const Entorno = require('../interprete/tablasimbolos/Entorno')
const informacion = require("../interprete/instrucciones/Informacion.js")
const fs = require('fs');
const { exec } = require('child_process');
let data = []
const s = informacion.getInstance();
let errores = [];
let simbolo = [];
let tokens = [];

const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a mi api'});
}

const analizar = (req, res) => {
    let {entrada} = req.body;
    let instrucciones = parser.parse(entrada);
    let entorno = new Entorno("global", null);
    let dot = "C:/Lib/Graphviz/bin/dot"
    let entrad = "./interprete/arbol/grafo.dot"
    let salida = "./interprete/arbol/grafoast.svg"
    let cadena = "graph {\nordering=\"out\"\n"
    instrucciones.forEach(instruccion => {
        instruccion.ejecutar(entorno);
        cadena = cadena + instruccion.getAst().cadena;
        console.log()
    });
    //cadena = cadena + "0[label=\"Instrucciones\"]\n"
    //cadena = cadena + "0--1\n"
    cadena = cadena +"\n}"
    fs.mkdirSync('./interprete/arbol',{recursive:true});//Creamos la carpeta
    fs.appendFile(entrad, cadena, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Archivo creado")
        }
    });
    let comando = `${dot} -Tsvg ${entrad} -o ${salida}`
    exec(comando, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error.message}`);
          return;
        }
        console.log(`El archivo ${salida} se ha generado correctamente.`);
      });
    let resi = s.get_AST();
    console.log(resi);
    res.status(200).json({
        message: 'Analisis Realizado', 
        entrada: entrada,
        instrucciones : instrucciones
    });
}
const  obdata = (req, res) => {
    let {val} = req.body;
    console.log(val)
    data.push(val)
    res.status(200).json({message: 'Funciona el obdata'});
}

const  getdata = (req, res) => {
    res.status(200).json({message: 'Funciona el getdata',data: data});
}

const reporteast = (req,res)=>{
   var url =  "./interprete/arbol/grafoast.svg"
   exec(`start ${url}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al abrir el navegador: ${error}`);
        }
    });
   res.status(200).json({message: 'Se abrio correctamente el ast'});
}

const reportes = (req, res) => {
    try {
        errores = s.get_Errors();
        const ruta = 'RepoErrores.html';
        let conte = "<html> \n <head> \n<style>body {\n";
        conte += "	height: 100%;\n" +
        "}\n" +
        "\n" +
        "body {\n" +
        "	margin: 0;\n" +
        "	background: linear-gradient(45deg, #49a09d, #5f2c82);\n" +
        "	font-family: sans-serif;\n" +
        "	font-weight: 100;\n" +
        "}\n" +
        "\n" +
        ".container {\n" +
        "	position: absolute;\n" +
        "	top: 50%;\n" +
        "	left: 50%;\n" +
        "	transform: translate(-50%, -50%);\n" +
        "}\n" +
        "\n" +
        "table {\n" +
        "	width: 800px;\n" +
        "	border-collapse: collapse;\n" +
        "	overflow: hidden;\n" +
        "	box-shadow: 0 0 20px rgba(0,0,0,0.1);\n" +
        "}\n" +
        "\n" +
        "th,\n" +
        "td {\n" +
        "	padding: 15px;\n" +
        "	background-color: rgba(255,255,255,0.2);\n" +
        "	color: #fff;\n" +
        "}\n" +
        "\n" +
        "th {\n" +
        "	text-align: left;\n" +
        "}\n" +
        "\n" +
        "thead {\n" +
        "	th {\n" +
        "		background-color: #55608f;\n" +
        "	}\n" +
        "}\n" +
        "\n" +
        "tbody {\n" +
        "	tr {\n" +
        "		&:hover {\n" +
        "			background-color: rgba(255,255,255,0.3);\n" +
        "		}\n" +
        "	}\n" +
        "	td {\n" +
        "		position: relative;\n" +
        "		&:hover {\n" +
        "			&:before {\n" +
        "				content: \"\";\n" +
        "				position: absolute;\n" +
        "				left: 0;\n" +
        "				right: 0;\n" +
        "				top: -9999px;\n" +
        "				bottom: -9999px;\n" +
        "				background-color: rgba(255,255,255,0.2);\n" +
        "				z-index: -1;\n" +
        "			}\n" +
        "		}\n" +
        "	}\n" +
        "}</style>"
        conte +="<title>Reporte de Errores</title></head> \n";
        conte +="<body> \n";
        conte +="<br><br><br><h1><center>Reporte de Errores</center></h1> \n";
        conte +="<div class=\"container\">\n" +
                        "	<table>\n" +
                        "		<thead>\n" +
                        "			<tr>\n" +
                        "				<th>Tipo de Error</th>\n" +
                        "				<th>Descripcion</th>\n" +
                        "				<th>Linea</th>\n" +
                        "				<th>Columna</th>\n" +
                        "			</tr>\n" +
                        "		</thead>\n" +
                        "		<tbody>";
        for (let i = 0; i < errores.length; i++) {
            conte +="<tr> \n";
            conte +="<td><strong>"+errores[i].tipo+"</strong></td> \n";
            conte +="<td><strong>"+errores[i].descripcion+"</strong></td> \n";
            conte +="<td><strong>"+errores[i].linea+"</strong></td> \n";
            conte +="<td><strong>"+errores[i].columna+"</strong></td> \n";
            conte +="</tr> \n";
        }
        conte +="		</tbody>\n" +
        "	</table>\n" +
        "</div>\n";
        conte +="</body> \n";
        conte +="</html> \n";
        fs.writeFileSync(ruta, conte);
        
        console.log('Archivo guardado con éxito.');
    
        const url = ruta;
        exec(`start ${url}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al abrir el navegador: ${error}`);
            }
        });
    } catch (error) {
        console.error('Error al guardar el archivo: ', error);
    }   
    res.status(200).json({
        message: 'Reporte Generado Correctamente'
    });
}

const reportesi = (req, res) => {
    try {
        simbolo = s. get_Simbolo();
        const ruta = 'RepoTablaSimbolo.html';
        let conte = "<html> \n <head> \n<style>body {\n";
        conte += "	height: 100%;\n" +
        "}\n" +
        "\n" +
        "body {\n" +
        "	margin: 0;\n" +
        "	background: linear-gradient(45deg, #49a09d, #5f2c82);\n" +
        "	font-family: sans-serif;\n" +
        "	font-weight: 100;\n" +
        "}\n" +
        "\n" +
        ".container {\n" +
        "	position: absolute;\n" +
        "	top: 50%;\n" +
        "	left: 50%;\n" +
        "	transform: translate(-50%, -50%);\n" +
        "}\n" +
        "\n" +
        "table {\n" +
        "	width: 800px;\n" +
        "	border-collapse: collapse;\n" +
        "	overflow: hidden;\n" +
        "	box-shadow: 0 0 20px rgba(0,0,0,0.1);\n" +
        "}\n" +
        "\n" +
        "th,\n" +
        "td {\n" +
        "	padding: 15px;\n" +
        "	background-color: rgba(255,255,255,0.2);\n" +
        "	color: #fff;\n" +
        "}\n" +
        "\n" +
        "th {\n" +
        "	text-align: left;\n" +
        "}\n" +
        "\n" +
        "thead {\n" +
        "	th {\n" +
        "		background-color: #55608f;\n" +
        "	}\n" +
        "}\n" +
        "\n" +
        "tbody {\n" +
        "	tr {\n" +
        "		&:hover {\n" +
        "			background-color: rgba(255,255,255,0.3);\n" +
        "		}\n" +
        "	}\n" +
        "	td {\n" +
        "		position: relative;\n" +
        "		&:hover {\n" +
        "			&:before {\n" +
        "				content: \"\";\n" +
        "				position: absolute;\n" +
        "				left: 0;\n" +
        "				right: 0;\n" +
        "				top: -9999px;\n" +
        "				bottom: -9999px;\n" +
        "				background-color: rgba(255,255,255,0.2);\n" +
        "				z-index: -1;\n" +
        "			}\n" +
        "		}\n" +
        "	}\n" +
        "}</style>"
        conte +="<title>Reporte Tabla de Simbolos</title></head> \n";
        conte +="<body> \n";
        conte +="<br><br><br><h1><center>Reporte Tabla de Simbolos</center></h1> \n";
        conte +="<div class=\"container\">\n" +
                        "	<table>\n" +
                        "		<thead>\n" +
                        "			<tr>\n" +
                        "				<th>Identificador</th>\n" +
                        "				<th>Tipo</th>\n" +
                        "				<th>Tipo</th>\n" +
                        "				<th>Entorno</th>\n" +
                        "				<th>Linea</th>\n" +
                        "				<th>Columna</th>\n" +
                        "			</tr>\n" +
                        "		</thead>\n" +
                        "		<tbody>";
        for (let i = 0; i < simbolo.length; i++) {
            conte +="<tr> \n";
            conte +="<td><strong>"+simbolo[i].id+"</strong></td> \n";
            conte +="<td><strong>"+simbolo[i].tipo1+"</strong></td> \n";
            conte +="<td><strong>"+simbolo[i].tipo2+"</strong></td> \n";
            conte +="<td><strong>"+simbolo[i].entorno+"</strong></td> \n";
            conte +="<td><strong>"+simbolo[i].linea+"</strong></td> \n";
            conte +="<td><strong>"+simbolo[i].columna+"</strong></td> \n";
            conte +="</tr> \n";
        }
        conte +="		</tbody>\n" +
        "	</table>\n" +
        "</div>\n";
        conte +="</body> \n";
        conte +="</html> \n";
        fs.writeFileSync(ruta, conte);
        
        console.log('Archivo guardado con éxito.');
    
        const url = ruta;
        exec(`start ${url}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al abrir el navegador: ${error}`);
            }
        });
    } catch (error) {
        console.error('Error al guardar el archivo: ', error);
    }   
    res.status(200).json({
        message: 'Reporte Generado Correctamente'
    });
}

const reporteto = (req, res) => {
    try {
        tokens = s.get_Token();
        const ruta = 'RepoTokens.html';
        let conte = "<html> \n <head> \n<style>body {\n";
        conte += "	height: 100%;\n" +
        "}\n" +
        "\n" +
        "body {\n" +
        "	margin: 0;\n" +
        "	background: linear-gradient(45deg, #49a09d, #5f2c82);\n" +
        "	font-family: sans-serif;\n" +
        "	font-weight: 100;\n" +
        "}\n" +
        "\n" +
        ".container {\n" +
        "	position: absolute;\n" +
        "	top: 50%;\n" +
        "	left: 50%;\n" +
        "	transform: translate(-50%, -50%);\n" +
        "}\n" +
        "\n" +
        "table {\n" +
        "	width: 800px;\n" +
        "	border-collapse: collapse;\n" +
        "	overflow: hidden;\n" +
        "	box-shadow: 0 0 20px rgba(0,0,0,0.1);\n" +
        "}\n" +
        "\n" +
        "th,\n" +
        "td {\n" +
        "	padding: 15px;\n" +
        "	background-color: rgba(255,255,255,0.2);\n" +
        "	color: #fff;\n" +
        "}\n" +
        "\n" +
        "th {\n" +
        "	text-align: left;\n" +
        "}\n" +
        "\n" +
        "thead {\n" +
        "	th {\n" +
        "		background-color: #55608f;\n" +
        "	}\n" +
        "}\n" +
        "\n" +
        "tbody {\n" +
        "	tr {\n" +
        "		&:hover {\n" +
        "			background-color: rgba(255,255,255,0.3);\n" +
        "		}\n" +
        "	}\n" +
        "	td {\n" +
        "		position: relative;\n" +
        "		&:hover {\n" +
        "			&:before {\n" +
        "				content: \"\";\n" +
        "				position: absolute;\n" +
        "				left: 0;\n" +
        "				right: 0;\n" +
        "				top: -9999px;\n" +
        "				bottom: -9999px;\n" +
        "				background-color: rgba(255,255,255,0.2);\n" +
        "				z-index: -1;\n" +
        "			}\n" +
        "		}\n" +
        "	}\n" +
        "}</style>"
        conte +="<title>Reporte de Tokens</title></head> \n";
        conte +="<body> \n";
        conte +="<br><br><br><h1><center>Reporte de Tokens</center></h1> \n";
        conte +="<div class=\"container\">\n" +
                        "	<table>\n" +
                        "		<thead>\n" +
                        "			<tr>\n" +
                        "				<th>Lexema</th>\n" +
                        "				<th>Token</th>\n" +
                        "				<th>Linea</th>\n" +
                        "				<th>Columna</th>\n" +
                        "			</tr>\n" +
                        "		</thead>\n" +
                        "		<tbody>";
        for (let i = 0; i < tokens.length; i++) {
            conte +="<tr> \n";
            conte +="<td><strong>"+tokens[i].lexema+"</strong></td> \n";
            conte +="<td><strong>"+tokens[i].token+"</strong></td> \n";
            conte +="<td><strong>"+tokens[i].linea+"</strong></td> \n";
            conte +="<td><strong>"+tokens[i].columna+"</strong></td> \n";
            conte +="</tr> \n";
        }
        conte +="		</tbody>\n" +
        "	</table>\n" +
        "</div>\n";
        conte +="</body> \n";
        conte +="</html> \n";
        fs.writeFileSync(ruta, conte);
        
        console.log('Archivo guardado con éxito.');
    
        const url = ruta;
        exec(`start ${url}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al abrir el navegador: ${error}`);
            }
        });
    } catch (error) {
        console.error('Error al guardar el archivo: ', error);
    }   
    res.status(200).json({
        message: 'Reporte Generado Correctamente'
    });
}

module.exports = {
    index,
    analizar,
    obdata,
    getdata,
    reportes,
    reportesi,
    reporteto,
    reporteast 
}