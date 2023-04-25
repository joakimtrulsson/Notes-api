const Note = require('../models/notesModel');
const factory = require('./handlerFactory');

exports.getOneNote = factory.getOne(Note);
exports.getAllNotes = factory.getAll(Note);
// exports.findAllNotes = factory.findAll(Note);
exports.createNote = factory.createOne(Note);
exports.updateNote = factory.updateOne(Note);
exports.deleteNote = factory.deleteOne(Note);
