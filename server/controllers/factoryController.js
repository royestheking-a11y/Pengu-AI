const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.catchAsync = catchAsync;

exports.getAll = Model => catchAsync(async (req, res, next) => {
  const docs = await Model.find().sort({ createdAt: -1 });
  res.status(200).json(docs);
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'No document found with that ID' });
  res.status(200).json(doc);
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);
  res.status(201).json(doc);
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!doc) return res.status(404).json({ message: 'No document found with that ID' });
  res.status(200).json(doc);
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: 'No document found with that ID' });
  res.status(204).json(null);
});
