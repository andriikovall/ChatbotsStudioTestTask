const studentDB = require('../db/entities/student');
const Student = require('../models/student');
const { createNotFoundResponse } = require('../utils/not-found-response');

module.exports.getById = async function (req, res, next) {
  const { id } = req.params;
  try {
    const student = await studentDB.getById(id);
    if (!student) {
      res.status(404);
      res.json(createNotFoundResponse('Student', 'id', id));
    } else {
      res.json({ student });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await studentDB.deleteById(id);
    console.log(result);
    if (!result) {
      res.status(404);
      res.json(createNotFoundResponse('Student', 'id', id));
    } else {
      res.json({ student: result });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.insert = async function (req, res, next) {
  req.body._id = undefined;
  const student = new Student(req.body);
  const valdationErr = student.validateSync();
  if (valdationErr) {
    valdationErr.status = 400;
    next(valdationErr);
  }
  try {
    const response = await studentDB.insert(student);
    res.status(201);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async function (req, res, next) {
  const student = new Student(req.body);
  const { id } = req.params;
  student._id = id;
  try {
    const updatedStudent = await studentDB.update(student);
    if (updatedStudent) {
      res.json({ student: updatedStudent });
    } else {
      res.json(createNotFoundResponse('Student', 'id', id));
    }
  } catch (err) {
    next(err);
  }
};
