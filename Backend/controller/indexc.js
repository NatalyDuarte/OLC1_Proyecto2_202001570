const parser = require("../analizador/Gramatica.js")
let data = []

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


module.exports = {
    index,
    analizar,
    obdata,
    getdata
}