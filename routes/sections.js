const express = require('express');
const router = express.Router();

const {
  readSections,
  readSectionById,
  addSection,
  deleteSection,
  editSection,
} = require("../controllers/sections");


/* GET all sections */
router.get('/', async (req, res, next) => {
  const sections = await readSections();
  if (sections.length > 0) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: sections
    });
  }
  else {
    res.status(404).send({
      message: "Sections don't exist",
      code: 404
    });
  }
});

/* GET sections by id */
router.get('/:id', async (req, res, next) => {
  const section = await readSectionById(req.params.id);
  if (section) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: section
    });
  }
  else {
    res.status(404).send({
      message: "Section doesn't exists",
      code: 404
    });
  }
});

/* CREATE sections */
router.post('/', async (req, res, next) => {
  const newSection = {
    title: req.body.title,
    category: req.body.category
  }
  await addSection(newSection);
  res.status(201).send({
    message: "Section created",
    code: 201
  });
});

/* DELETE sections */
router.delete('/:id', async (req, res, next) => {
  const deleted = await deleteSection(req.params.id);
  if (deleted) {
    res.status(202).send({
      message: "Section deleted",
      code: 202
    });
  }
  else {
    res.status(404).send({
      message: "Section could not be deleted",
      code: 404
    });
  }
});

/* EDIT sections */
router.put('/:id', async (req, res, next) => {
  const newSection = {
    title: req.body.title,
    category: req.body.category
  }
  const edited = await editSection(req.params.id, newSection);
  if (edited) {
    res.status(203).send({
      message: "Section edited",
      code: 203
    });
  }
  else {
    res.status(404).send({
      message: "Section could not be edited",
      code: 404
    });
  }
});

module.exports = router;
