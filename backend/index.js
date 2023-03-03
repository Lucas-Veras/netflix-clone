require("dotenv").config()

const express = require("express");

const port = process.env.PORT

const app = express()

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