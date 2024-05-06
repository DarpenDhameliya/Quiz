const express = require('express');

const {
  getAllCategoryData,
  postAddCategory,
  postEditCategory,
  getCategory,
  postDeleteCategory
} = require('../controllers/categoryController');
const { upload } = require('../middleware/imageMiddleware');

const router = express.Router();
router.get('/list', getAllCategoryData);
router.get('/editcategorylist/:id', getCategory);
router.post('/addcategory', upload, postAddCategory);
router.post('/editcategory/:id', upload, postEditCategory);
router.post('/removecategory/:id', postDeleteCategory);

module.exports = router;