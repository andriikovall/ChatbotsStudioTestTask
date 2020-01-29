const lessonDB = require('../db/entities/lesson');
const Lesson = require('../models/lesson');
const { createNotFoundResponse } = require('../utils/not-found-response');

module.exports.getById = async function (req, res, next) {
  const { id } = req.params;
  try {
    const lesson = await lessonDB.getById(id);
    if (!lesson) {
      res.status(404);
      res.json(createNotFoundResponse('Lesson', 'id', id));
    } else {
      res.json({ lesson });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await lessonDB.deleteById(id);
    console.log(result);
    if (!result) {
      res.status(404);
      res.json(createNotFoundResponse('Lesson', 'id', id));
    } else {
      res.json({ lesson: result });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.insert = async function (req, res, next) {
  req.body._id = undefined;
  const lesson = new Lesson(req.body);
  const valdationErr = lesson.validateSync();
  if (valdationErr) {
    valdationErr.status = 400;
    next(valdationErr);
  }
  try {
    const response = await lessonDB.insert(lesson);
    res.status(201);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async function (req, res, next) {
  const lesson = new Lesson(req.body);
  const { id } = req.params;
  lesson._id = id;
  try {
    const updatedLesson = await lessonDB.update(lesson);
    if (updatedLesson) {
      res.json({ lesson: updatedLesson });
    } else {
      res.json(createNotFoundResponse('Lesson', 'id', id));
    }
  } catch (err) {
    next(err);
  }
};
