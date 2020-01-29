const groupDB = require('../db/entities/group');
const studentDB = require('../db/entities/student');
const Group = require('../models/group');
const { createNotFoundResponse } = require('../utils/not-found-response');

module.exports.get = async function (req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const specialisationCode = parseInt(req.query.specialisationCode) || null;
    const groups = await groupDB.get({ limit, offset, specialisationCode });
    res.json({ groups });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getById = async function (req, res, next) {
  const { id } = req.params;
  try {
    const group = await groupDB.getById(id);
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
    const result = await groupDB.deleteById(id);
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
    const response = await groupDB.insert(group);
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
  delete group.students; // changing students to group only via addStudents and removeStudents
  try {
    const updatedGroup = await groupDB.update(group);
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
  try {
    const [group] = await Promise.all([groupDB.addStudents(id, req.studentsIds),
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
    const [group] = await Promise.all([groupDB.removeStudents(id, req.studentsIds),
      studentDB.removeStudentsFromGroup(req.studentsIds)]);
    res.json({
      group,
    });
  } catch (err) {
    next(err);
  }
};
