const express = require('express');
const notesController = require('../controllers/notesController');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(userController.protect);

router.route('/').get(notesController.getAllNotes).post(notesController.createNote);

router
  .route('/:id')
  .get(notesController.getOneNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

router.route('/search/:title').get(notesController.getAllNotes);

module.exports = router;
