const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWTSECRET, { expiresIn: process.env.JWTEXPIRATION });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);

  if (!username || !password) {
    return next(new AppError('Vänligen ange användarnamn och lösenord..', 400));
  }

  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Ogiltigt användarnamn eller lösenord.', 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  // Ogiltigförklara token här!
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.replace('Bearer', '').replace(' ', '');
  }

  if (!token) {
    return next(new AppError('You are not logged in.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET);
  if (!decoded);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('Använder som tillhör det token finns inte längre.', 401));
  }

  req.user = freshUser;

  next();
});
