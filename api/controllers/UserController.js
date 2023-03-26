const User = require("../models/User")

const CryptoJS = require("crypto-js")

const updateUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json(
            { errors: ["Você pode fazer o update apenas da sua conta!"] }
        )
    }
}

const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const user = await User.findOne({ _id: req.params.id })

            if (!user) {
                res.status(404).json({ errors: ["Usuário não encontrado!"] });
                return;
            }

            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: ["Usuário deletado!"] })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ errors: ["Você pode deletar apenas a sua conta!"] })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) return res.status(404).json({ errors: ["Usuário não encontrado!"] });

    const { password, ...info } = user._doc

    res.status(200).json(info)
}

const getAllUsers = async (req, res) => {
    const query = req.query.new
    if (req.user.isAdmin) {
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find()
            res.status(200).json(users)
        } catch (err) {
            res.status(403).json(err)
        }
    } else {
        res.status(403).json({ errors: ["Você não tem permissão para ver todos os usuários"] })
    }
}

const getUsersStats = async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1)

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getUsersStats
}