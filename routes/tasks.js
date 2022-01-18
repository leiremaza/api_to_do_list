const express = require('express');
const router = express.Router();

const {
  readTasks,
  readTaskById,
  addTask,
  deleteTask,
  editTask,
} = require("../controllers/tasks");


/* GET all tasks */
router.get('/', async (req, res, next) => {
  const tasks = await readTasks();
  if (tasks.length > 0) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: tasks
    });
  }
  else {
    res.status(404).send({
      message: "Tasks don't exist",
      code: 404
    });
  }
});

/* GET tasks by id */
router.get('/:id', async (req, res, next) => {
  const task = await readTaskById(req.params.id);
  if (task) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: task
    });
  }
  else {
    res.status(404).send({
      message: "Task doesn't exists",
      code: 404
    });
  }
});

/* CREATE tasks */
router.post('/', async (req, res, next) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
    users: req.body.users.map(i => +i),
    categories: req.body.categories.map(i => +i),
    attachments: req.body.attachments.map(i => +i),
    comments: req.body.comments.map(i => +i),
    pic: req.body.pic,
    section: +req.body.section
  }
  await addTask(newTask);
  res.status(201).send({
    message: "Task created",
    code: 201
  });
});

/* DELETE tasks */
router.delete('/:id', async (req, res, next) => {
  const deleted = await deleteTask(req.params.id);
  if (deleted) {
    res.status(202).send({
      message: "Task deleted",
      code: 202
    });
  }
  else {
    res.status(404).send({
      message: "Task could not be deleted",
      code: 404
    });
  }
});

/* EDIT tasks */
router.put('/:id', async (req, res, next) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
    users: req.body.users.map(i => +i),
    categories: req.body.categories.map(i => +i),
    attachments: req.body.attachments.map(i => +i),
    comments: req.body.comments.map(i => +i),
    pic: req.body.pic,
    section: +req.body.section
  }
  const edited = await editTask(req.params.id, newTask);
  if (edited) {
    res.status(203).send({
      message: "Task edited",
      code: 203
    });
  }
  else {
    res.status(404).send({
      message: "Task could not be edited",
      code: 404
    });
  }
});

module.exports = router;
