const router = require("express").Router()

//Controller
const {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUsersStats
} = require("../controllers/UserController")

//Middleware
const verifyToken = require("../middlewares/verifyToken")

//Rotas
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)
router.get("/find/:id", verifyToken, getUserById)
router.get("/", verifyToken, getAllUsers)
router.get("/stats", verifyToken, getUsersStats)

module.exports = router