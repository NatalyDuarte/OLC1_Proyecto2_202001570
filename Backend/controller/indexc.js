const parser = require("../analizador/Gramatica.js")


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
    analizar
}