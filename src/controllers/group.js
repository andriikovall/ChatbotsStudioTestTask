const db = require('../db/entities/group');
const Group = require('../models/group');
const { createNotFoundResponse } = require('../utils/not-found-response');

module.exports.getById = async function (req, res, next) {
  const { id } = req.params;
  try {
    const group = await db.getById(id);
    if (!group) {
      res.status(404);
      res.json(createNotFoundResponse('Group', 'id', id));
    } else {
      res.json({ group });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await db.deleteById(id);
    console.log(result);
    if (!result) {
      res.status(404);
      res.json(createNotFoundResponse('Group', 'id', id));
    } else {
      res.json({ group: result });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.insert = async function (req, res, next) {
  req.body._id = undefined;
  const group = new Group(req.body);
  const valdationErr = group.validateSync();
  if (valdationErr) {
    valdationErr.status = 400;
    next(valdationErr);
  }
  try {
    const response = await db.insert(group);
    res.status(201);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async function (req, res, next) {
  const group = new Group(req.body);
  const { id } = req.params;
  group._id = id;
  try {
    const updatedGroup = await db.update(group);
    if (updatedGroup) {
      res.json({ group: updatedGroup });
    } else {
      res.json(createNotFoundResponse('Group', 'id', id));
    }
  } catch (err) {
    next(err);
  }
};
