const router = require("express").Router()

//Controller
const {
    createMovie,
    updateMovie,
    deleteMovie,
    getRamdomMovie,
    getAllMovies,
    getMovieById,
    getUsersStats
} = require("../controllers/MovieController")

//Middleware
const verifyToken = require("../middlewares/verifyToken")

//Rotas
router.post("/", verifyToken, createMovie)
router.put("/:id", verifyToken, updateMovie)
router.delete("/:id", verifyToken, deleteMovie)
router.get("/find/:id", verifyToken, getMovieById)
router.get("/ramdom", verifyToken, getRamdomMovie)
router.get("/", verifyToken, getAllMovies)

module.exports = router