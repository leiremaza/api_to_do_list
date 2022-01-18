const express = require('express');
const router = express.Router();

const {
  readComments,
  readCommentById,
  addComment,
  deleteComment,
  editComment,
} = require("../controllers/comments");


/* GET all comments */
router.get('/', async (req, res, next) => {
  const comments = await readComments();
  if (comments.length > 0) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: comments
    });
  }
  else {
    res.status(404).send({
      message: "Comments don't exist",
      code: 404
    });
  }
});

/* GET comments by id */
router.get('/:id', async (req, res, next) => {
  const comment = await readCommentById(req.params.id);
  if (comment) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: comment
    });
  }
  else {
    res.status(404).send({
      message: "Comment doesn't exists",
      code: 404
    });
  }
});

/* CREATE comments */
router.post('/', async (req, res, next) => {
  const newComment = {
    title: req.body.title,
    section: req.body.section
  }
  await addComment(newComment);
  res.status(201).send({
    message: "Comment created",
    code: 201
  });
});

/* DELETE comments */
router.delete('/:id', async (req, res, next) => {
  const deleted = await deleteComment(req.params.id);
  if (deleted) {
    res.status(202).send({
      message: "Comment deleted",
      code: 202
    });
  }
  else {
    res.status(404).send({
      message: "Comment could not be deleted",
      code: 404
    });
  }
});

/* EDIT comments */
router.put('/:id', async (req, res, next) => {
  const newComment = {
    text: req.body.text,
    user: req.body.user
  }
  const edited = await editComment(req.params.id, newComment);
  if (edited) {
    res.status(203).send({
      message: "Comment edited",
      code: 203
    });
  }
  else {
    res.status(404).send({
      message: "Comment could not be edited",
      code: 404
    });
  }
});

module.exports = router;
