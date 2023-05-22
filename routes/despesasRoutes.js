const express = require('express')
const router = express.Router()

const despesasController = require('../controller/despesasController') 

router.get('/',despesasController.getDespesas)

router.post('/incluir',despesasController.addDespesas)

router.put('/:id',despesasController.updateDespesas)

router.delete('/:id',despesasController.removeDespesas)

module.exports= router