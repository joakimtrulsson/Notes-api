const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'En anteckning måste ha en användare.'],
  },

  title: {
    type: String,
    required: [true, 'En anteckning måste ha en title.'],
    unique: [true, 'En anteckning måste ha en unik titel.'],
  },
  text: {
    type: String,
    default: true,
    required: [true, 'En anteckning måste innehålla en text.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});

notesSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username',
  });

  next();
});

const Note = mongoose.model('Notes', notesSchema);

module.exports = Note;
