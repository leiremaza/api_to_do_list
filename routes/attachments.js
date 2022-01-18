const express = require('express');
const router = express.Router();

const {
  readAttachments,
  readAttachmentById,
  addAttachment,
  deleteAttachment,
  editAttachment,
} = require("../controllers/attachments");


/* GET all attachments */
router.get('/', async (req, res, next) => {
  const attachments = await readAttachments();
  if (attachments.length > 0) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: attachments
    });
  }
  else {
    res.status(404).send({
      message: "Attachments don't exist",
      code: 404
    });
  }
});

/* GET attachments by id */
router.get('/:id', async (req, res, next) => {
  const attachment = await readAttachmentById(req.params.id);
  if (attachment) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: attachment
    });
  }
  else {
    res.status(404).send({
      message: "Attachment doesn't exists",
      code: 404
    });
  }
});

/* CREATE attachments */
router.post('/', async (req, res, next) => {
  const newAttachment = {
    title: req.body.title
  }
  await addAttachment(newAttachment);
  res.status(201).send({
    message: "Attachment created",
    code: 201
  });
});

/* DELETE attachments */
router.delete('/:id', async (req, res, next) => {
  const deleted = await deleteAttachment(req.params.id);
  if (deleted) {
    res.status(202).send({
      message: "Attachment deleted",
      code: 202
    });
  }
  else {
    res.status(404).send({
      message: "Attachment could not be deleted",
      code: 404
    });
  }
});

/* EDIT attachments */
router.put('/:id', async (req, res, next) => {
  const newAttachment = {
    title: req.body.title
  }
  await editAttachment(req.params.id, newAttachment);
  res.status(203).send({
    message: "Attachment edited",
    code: 203
  });
});

module.exports = router;
