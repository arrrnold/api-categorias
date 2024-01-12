// crear el esquema de la categoria
// luego crear el modelo de la categoria

const mongoose = require('mongoose'); // para acceder a la db

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },

});

const Categoria = mongoose.model('Categoria', categoriaSchema); // crear el modelo de la categoria
module.exports = Categoria; // exportar el modelo de la categoria