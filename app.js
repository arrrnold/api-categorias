const express = require("express"); // para crear el servidor
const mongoose = require("mongoose") // para acceder a la db
const cors = require("cors") // borrar el problema de cors

const app = express(); // el servidor
const port = process.env.port || 3000; // puerto para el servidor
const categoriaRoutes = require("./src/routes/categoria.routes") // para acceder a las rutas de categoria

// middleware (para usar antes de las rutas de la api)
app.use(express.json()) // para transformar objetos de json a javascript
app.use('/socios/v1/categorias', categoriaRoutes) // para anteponer "/socios/v1/categorias" a usa categoriaRoute
app.use(cors()) // evita el problema de cors (permite el acceso a la api desde cualquier lugar)
// rutas
app.get('/', (req, res) => {
    res.status(200).send('bienvenid@')
});

// crear conexion a la db
const urlRemota = 'mongodb+srv://admin:tm02arnold@clusteatm.dkbwrof.mongodb.net/'
mongoose
    .connect(urlRemota) // conexion a la db
    .then(() => console.log('Conexion establecida a la db')) // mensaje de conexion exitosa
    .catch((error) => console.log(error)) // mensaje del error si es que ocurre

app.listen(port, () => console.log('Servidor corriendo en el puerto ', port)); // ejecutar el servidor