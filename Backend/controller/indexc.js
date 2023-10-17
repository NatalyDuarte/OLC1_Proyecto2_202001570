const parser = require("../analizador/Gramatica.js")
const error = require("../interprete/instrucciones/ListaError.js")
const informacion = require("../interprete/instrucciones/Informacion.js")
const fs = require('fs');
const { exec } = require('child_process');
let data = []
const s = informacion.getInstance();
let errores = [];

const  obdata = (req, res) => {
    let {val} = req.body;
    data.push(val)
    res.status(200).json({message: 'Funciona el obdata'});
}

const  getdata = (req, res) => {
    res.status(200).json({message: 'Funciona el getdata',data: data});
}

const index = (req, res) =>{
    res.status(200).json({message: 'Api funcionando correctamte'});
}

const analizar = (req, res) => {
    const {entrada} = req.body;
    const resultado = parser.parse(entrada);
    resultado.forEach(element => {
        element.interpretar();
    });

    res.status(200).json({
        message: 'Analisis Realizado Correctamente', 
        entrada: entrada
    });
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

module.exports = {
    index,
    analizar,
    obdata,
    getdata,
    reportes
}