const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('Inget dokument hittades.'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const allDocs = await Model.Find({ user: req.user._id });

    res.status(200).json({
      status: 'success',
      results: allDocs.length,
      data: {
        allDocs,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({ status: 'success', data: newDoc });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return next(new AppError('No Document found with that ID.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        updatedDoc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return next(new AppError('No document found with that id.', 404));
    }
    res.status(200).json({
      status: 'success',
      message: 'Document deleted',
    });
  });
