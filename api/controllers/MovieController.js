const Movie = require("../models/Movie")

const createMovie = async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)

        try {
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json(
            { errors: ["Você não tem permissão!"] }
        )
    }
}

const updateMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body, }, { new: true })
            res.status(200).json(updatedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json(
            { errors: ["Você não tem permissão!"] }
        )
    }
}

const deleteMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await Movie.findOne({ _id: req.params.id })

            if (!movie) {
                res.status(404).json({ errors: ["Filme não encontrado!"] });
                return;
            }

            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: ["Filme deletado!"] })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ errors: ["Você não tem permissão!!"] })
    }
}

const getMovieById = async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findById(id)

    if (!movie) return res.status(404).json({ errors: ["Filme não encontrado!"] });

    res.status(200).json(movie)
}

const getRamdomMovie = async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        } else if (type === "movies") {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getAllMovies = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies.reverse())
        } catch (err) {
            res.status(403).json(err)
        }
    } else {
        res.status(403).json({ errors: ["Você não tem permissão para ver todos os usuários"] })
    }
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getRamdomMovie,
    getMovieById,
    getAllMovies,
}