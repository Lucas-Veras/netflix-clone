const router = require("express").Router()

//Controller
const { register, login } = require("../controllers/AuthController")

//Rotas
router.post("/register", register)
router.post("/login", login)

module.exports = router