const express = require("express");
const { dbConnection } = require("./db/config");
require("dotenv").config();
const cors = require("cors");

//Servidor express
const app = express();

//BBDD
dbConnection();

//CORS
app.use(cors());

//Directorio Público
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//Escucha de peticiones
app.listen(process.env.PORT, () => {
  console.log(`Viva el vino!!!  puerto ${process.env.PORT}`);
});
