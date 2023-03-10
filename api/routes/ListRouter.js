const router = require("express").Router()

//Controller
const {
    createList,
    deleteList,
    getAllLists
} = require("../controllers/ListController")

//Middleware
const verifyToken = require("../middlewares/verifyToken")

//Rotas
router.post("/", verifyToken, createList)
router.delete("/:id", verifyToken, deleteList)
router.get("/", verifyToken, getAllLists)

module.exports = router