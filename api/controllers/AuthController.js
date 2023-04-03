const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

// Gera user token
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, secret_key, {
    expiresIn: "5d",
  });
};

const verifyEmailToRegister = async (req, res) => {
  const { email } = req.body;

  // verifica se os campos estão preenchidos
  if (!email) {
    res.status(422).json({ errors: ["Preencha seu email."] });
    return;
  }

  const user = await User.findOne({ email });
  if (user) {
    res.status(422).json({ errors: ["Email já possui cadastro."] });
    return;
  }
  
  // verifique se o email é valido
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regex.test(email)) {
    res.status(422).json({ errors: ["E-mail inválido."] });
    return;
  }

  res.status(200).json({ message: "E-mail válido!" });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // verifica se os campos estão preenchidos
  if (!username || !email || !password) {
    res.status(422).json({ errors: ["Preencha todos os campos."] });
    return;
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
    return;
  }

  // Senha em hash
  const passwordHash = CryptoJS.AES.encrypt(password, secret_key).toString();

  const newUser = await User.create({
    username: username,
    email: email,
    password: passwordHash,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // verifica se os campos estão preenchidos
  if (!email || !password) {
    res.status(422).json({ errors: ["Preencha todos os campos."] });
    return;
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ errors: { email: "Email não cadastrado!" } });
      return;
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      res.status(401).json({ errors: { password: "Senha incorreta!" } });
      return;
    }

    const token = generateToken(user._id, user.isAdmin);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
  verifyEmailToRegister,
};
