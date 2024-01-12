const express = require('express');
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller")

router.post('/', categoriaController.crearCategoria); // crear
router.get('/', categoriaController.obtenerCategorias); // obtener todas
router.get('/:id', categoriaController.obtenerCategoria); // obtener una
router.put('/:id', categoriaController.actualizarCategoria); // actualizar
router.delete('/:id', categoriaController.eliminarCategoria); // eliminar

module.exports = router;