const db = require('../db/entities/teacher');
const Teacher = require('../models/teacher');
const { createNotFoundResponse } = require('../utils/not-found-response');

module.exports.getById = async function (req, res, next) {
  const { id } = req.params;
  try {
    const teacher = await db.getById(id);
    if (!teacher) {
      res.status(404);
      res.json(createNotFoundResponse('Teacher', 'id', id));
    } else {
      res.json({ teacher });
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
      res.json(createNotFoundResponse('Teacher', 'id', id));
    } else {
      res.json({ teacher: result });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.insert = async function (req, res, next) {
  req.body._id = undefined;
  const teacher = new Teacher(req.body);
  const valdationErr = teacher.validateSync();
  if (valdationErr) {
    valdationErr.status = 400;
    next(valdationErr);
  }
  try {
    const response = await db.insert(teacher);
    res.status(201);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async function (req, res, next) {
  const teacher = new Teacher(req.body);
  const { id } = req.params;
  teacher._id = id;
  try {
    const updatedTeacher = await db.update(teacher);
    if (updatedTeacher) {
      res.json({ teacher: updatedTeacher });
    } else {
      res.json(createNotFoundResponse('Teacher', 'id', id));
    }
  } catch (err) {
    next(err);
  }
};
