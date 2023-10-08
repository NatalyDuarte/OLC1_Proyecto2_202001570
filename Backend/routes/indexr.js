//Base de la Api https://github.com/AlexIngGuerra/OLC1-2S2023
const express = require('express');
const router = express.Router();

//Imports controller
const indexController = require('../controller/indexc.js')


// Rutas
router.get("/", indexController.index);
router.post("/analizar", indexController.analizar);

module.exports = router;