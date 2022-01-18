const express = require('express');
const router = express.Router();

const {
  readCategories,
  readCategoryById,
  addCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/categories");


/* GET all categories */
router.get('/', async (req, res, next) => {
  const categories = await readCategories();
  if (categories.length > 0) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: categories
    });
  }
  else {
    res.status(404).send({
      message: "Categories don't exist",
      code: 404
    });
  }
});

/* GET category by id */
router.get('/:id', async (req, res, next) => {
  const category = await readCategoryById(req.params.id);
  if (category) {
    res.status(200).send({
      message: "ok",
      code: 200,
      data: category
    });
  }
  else {
    res.status(404).send({
      message: "Category doesn't exists",
      code: 404
    });
  }
});

/* CREATE category */
router.post('/', async (req, res, next) => {
  const newCategory = {
    name: req.body.name,
    color: req.body.color
  }
  await addCategory(newCategory);
  res.status(201).send({
    message: "Category created",
    code: 201
  });
});

/* DELETE category */
router.delete('/:id', async (req, res, next) => {
  const deleted = await deleteCategory(req.params.id);
  if (deleted) {
    res.status(202).send({
      message: "Category deleted",
      code: 202
    });
  }
  else {
    res.status(404).send({
      message: "Category could not be deleted",
      code: 404
    });
  }
});

/* EDIT category */
router.put('/:id', async (req, res, next) => {
  const newCategory = {
    name: req.body.name,
    color: req.body.color
  }
  const edited = await editCategory(req.params.id, newCategory);
  if (edited) {
    res.status(203).send({
      message: "Category edited",
      code: 203
    });
  }
  else {
    res.status(404).send({
      message: "Category could not be edited",
      code: 404
    });
  }
});

module.exports = router;
