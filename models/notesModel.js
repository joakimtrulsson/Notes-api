const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'En anteckning måste ha en användare.'],
    },

    title: {
      type: String,
      required: [true, 'En anteckning måste ha en title.'],
      maxlength: 50,
    },
    text: {
      type: String,
      required: [true, 'En anteckning måste innehålla en text.'],
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Notes', notesSchema);

module.exports = Note;
