//Base de la Api https://github.com/AlexIngGuerra/OLC1-2S2023
const parser = require("../Analizador/Gramatica.js")


const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a la api'});
}

const analizar = (req, res) => {
    const {entrada} = req.body;
    let resultado = parser.parse(entrada);
    
    res.status(200).json({
        message: 'Analisis Realizado', 
        entrada: entrada, 
        resultado: resultado
    });
}


module.exports = {
    index,
    analizar
}