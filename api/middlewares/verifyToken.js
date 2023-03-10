const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ errors: ["Acesso negado! Você não está autenticado."] });


    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(400).json({ errors: ["O Token é inválido!"] });
        req.user = user;
        next()
    });
}

module.exports = verifyToken