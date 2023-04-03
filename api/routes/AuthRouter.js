const router = require("express").Router()

const { verify } = require("jsonwebtoken")
//Controller
const { register, login, verifyEmailToRegister } = require("../controllers/AuthController")

//Rotas
router.post("/verify-email", verifyEmailToRegister)
router.post("/register", register)
router.post("/login", login)

module.exports = router