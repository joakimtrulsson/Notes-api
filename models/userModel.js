const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'En användare måste ha en namn.'],
    },
    username: {
      type: String,
      required: [true, 'En användare måste ha en användarnamn.'],
      lowercase: true,
      unique: [true, 'Användarnamnet är upptaget'],
    },
    password: {
      type: String,
      required: [true, 'Vänligen ange ett lösenord.'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Vänligen bekräfta ditt lösenord.'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Lösenorden matchar inte.',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (enteredPassword, userPassWord) {
  return await bcrypt.compare(enteredPassword, userPassWord);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
