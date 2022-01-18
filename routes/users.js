const express = require('express');
const router = express.Router();

const {
  readUsers,
  readUserById,
  addUser,
  deleteUser,
  editUser,
} = require("../controllers/users");


/* GET all users */
router.get('/', async (req, res, next) => {
  const users = await readUsers();
  if (users.length > 0) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: users
    });
  }
  else {
    res.status(404).send({
      message: "Users don't exist",
      code: 404
    });
  }
});

/* GET users by id */
router.get('/:id', async (req, res, next) => {
  const user = await readUserById(req.params.id);
  if (user) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: user
    });
  }
  else {
    res.status(404).send({
      message: "User doesn't exists",
      code: 404
    });
  }
});

/* CREATE users */
router.post('/', async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    pic: req.body.pic,
    is_master: req.body.is_master,
  }
  await addUser(newUser);
  res.status(201).send({
    message: "User created",
    code: 201
  });
});

/* DELETE users */
router.delete('/:id', async (req, res, next) => {
  const deleted = await deleteUser(req.params.id);
  if (deleted) {
    res.status(202).send({
      message: "User deleted",
      code: 202
    });
  }
  else {
    res.status(404).send({
      message: "User could not be deleted",
      code: 404
    });
  }
});

/* EDIT users */
router.put('/:id', async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    pic: req.body.pic,
    is_master: req.body.is_master,
  }
  const edited = await editUser(req.params.id, newUser);
  if (edited) {
    res.status(203).send({
      message: "User edited",
      code: 203
    });
  }
  else {
    res.status(404).send({
      message: "User could not be edited",
      code: 404
    });
  }
});

module.exports = router;
