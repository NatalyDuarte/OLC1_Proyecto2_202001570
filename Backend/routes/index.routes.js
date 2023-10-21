const express = require('express');
const router = express.Router();

//Imports controller
const indexController = require('../controller/index.controller.js')


// Rutas
router.get("/", indexController.index);
router.post("/analizar", indexController.analizar);
router.get("/getdata", indexController.getdata);
router.post("/obdata",indexController.obdata);
router.get("/repoerror",indexController.reportes);
router.get("/reposim",indexController.reportesi);
router.get("/repoto",indexController.reporteto);

module.exports = router;