const db = require('../db/entities/group');
const studentDB = require('../db/entities/student');
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

module.exports.checkBodyForStudents = function (req, res, next) {
  const { students } = req.body;
  if (Array.isArray(students)) {
    const studentsIds = students.map(s => s._id || s);
    req.studentsIds = studentsIds;
    next();
  } else {
    res.status(400).json({
      message: 'Array of students expected, but have got something else',
      data: {
        requestBody: req.body,
      },
    });
  }
};

module.exports.addStudents = async function (req, res, next) {
  const { id } = req.params;
  // maybe move everything into 1 db module but i cant guess in which one
  try {
    const [group] = await Promise.all([db.addStudents(id, req.studentsIds),
      studentDB.addStudentsToGroup(req.studentsIds, id)]);
    res.json({
      group,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.removeStudents = async function (req, res, next) {
  const { id } = req.params;
  try {
    const [group] = await Promise.all([db.removeStudents(id, req.studentsIds),
      studentDB.removeStudentsFromGroup(req.studentsIds)]);
    res.json({
      group,
    });
  } catch (err) {
    next(err);
  }
};
