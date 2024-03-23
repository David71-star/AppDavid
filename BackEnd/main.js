//COME UTILIZZARE EXPRESS
const express = require("express");

//UTILIZZO CORS
const cors = require("cors");

//CONNESIONE AL DATABASE
const mongoose = require("mongoose");

//RICHIESTA LIBRERIA DOTENV
require("dotenv").config();

//METTIAMO IN ASCOLTO IL NOSTRO SERVER SU UNA PORTA
const PORT = 7777;

//DICHIARIAMO UNA VARIABILE (solitamente chiamata app) E INVOCHIAMO IL METODO EXPRESS PER POTERNE USUFRUIRE TUTTI I METODI
const app = express();

app.use(express.json());
app.use(cors());

//import delle routes
const userRoute = require("./routes/users");
app.use("/", userRoute);
app.use("/createUser", userRoute);

//connesione del database
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

//SE CE UN ERRORE DURANTE LA CONNESIONE
db.on("error", console.error.bind(console, "db not connected"));

//unica comunicazione che che il server ela porta stanna comunicando
db.once("open", () => {
  console.log("db connected successfully");
});

//METTIAMO SEMPRE IL SERVER IN ASCOLTO SULLA NOSTRA PORTA
app.listen(PORT, () =>
  console.log(`Server connected and listening on PORT ${PORT}`)
);
