const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findById(req.params.id);
    console.log(doc);

    if (!doc) {
      return next(new AppError('Inget dokument hittades.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.findAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const allDocs = await Model.find({ user: req.user._id });

    res.status(200).json({
      status: 'success',
      results: allDocs.length,
      data: {
        allDocs,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const { title } = req.params;
    const filter = title
      ? { user: req.user._id, title: { $regex: title, $options: 'i' } }
      : { user: req.user._id };

    const allDocs = await Model.find(filter);

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
    const newDoc = await Model.create({ user: req.user._id, ...req.body });

    res.status(201).json({ status: 'success', data: newDoc });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return next(new AppError('Inget dokument hittades.', 404));
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
      return next(new AppError('Inget dokument hittades.', 404));
    }
    res.status(200).json({
      status: 'success',
      message: 'Dokumentet raderat.',
    });
  });
