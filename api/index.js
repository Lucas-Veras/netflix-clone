require("dotenv").config()

const express = require("express");
const cors = require("cors");

const port = process.env.PORT

const app = express()

// Solve CORS
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));

//Config JSON and form data response
app.use(express.json());

//db conection 
require("./config/db")

//Routes
const router = require("./routes/Router")
app.use(router)

app.listen(port, () => {
    console.log("O Backend server está rodando!")
})