const jwt = require('jsonwebtoken');
const db = require('../db/entities/user');
const { hashFunc, generateJWT } = require('../utils/auth');

module.exports.checkLoginAndPassword = function (req, res, next) {
  const { password, login } = req.body;

  if (!password || !login) {
    res.status(400).json({
      messgae: 'Login and password fields cant be empty',
    });
  }
  req.login = login;
  req.password = password;
  next();
};

module.exports.register = async function (req, res, next) {
  const { login, password } = req;
  try {
    const excistingUser = await db.getByLogin(login);
    if (excistingUser) {
      res.status(409).json({
        message: 'This login has been already taken. Please try a new one',
        data: { login },
      });
    } else {
      const passwordHash = hashFunc(password);
      await db.insert({ login, passwordHash });
      res.json({
        message: 'You are succesfully registered. Please login to get your JWT',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.login = async function (req, res, next) {
  const { login, password } = req;
  const passwordHash = hashFunc(password);
  try {
    const futureUser = await db.getByLoginAndPasswordHash(login, passwordHash);
    if (futureUser) {
      req.futureUser = futureUser;
      next();
    } else {
      res.status(400).json({
        message: 'Invalid login or password',
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.responseOnSuccesLogin = function (req, res) {
  const token = generateJWT(req.futureUser);
  console.log('req.futureUser:', req.futureUser);
  const decodedToken = jwt.decode(token);

  const response = {
    token: `${token}`,
    user: decodedToken,
  };
  res.json(response);
};
