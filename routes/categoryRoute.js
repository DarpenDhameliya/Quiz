const express = require('express');

const {
  getAllCategoryData,
  postAddCategory,
  postEditCategory,
  getCategory,
  postDeleteCategory
} = require('../controllers/categoryController');
const { upload } = require('../middleware/imageMiddleware');
const Authenticate = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/list', getAllCategoryData);
router.get('/editcategorylist/:id', getCategory);
router.post('/addcategory', upload, Authenticate, postAddCategory);
router.post('/editcategory/:id', upload, Authenticate, postEditCategory);
router.post('/removecategory/:id', Authenticate, postDeleteCategory);

module.exports = router;