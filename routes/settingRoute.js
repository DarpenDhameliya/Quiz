const express = require('express');
const Authenticate = require('../middleware/authMiddleware');
const { postDeleteWebDetail, postEditWebDetail, postAddWebDetail, getWebDetail } = require('../controllers/webDetailController');
const { upload } = require('../middleware/imageMiddleware');

const router = express.Router();
router.get('/list', getWebDetail);
router.post('/addwebdata', upload, Authenticate, postAddWebDetail);
router.post('/editwebdata/:id', upload, Authenticate, postEditWebDetail);
router.post('/removewebdata/:id', Authenticate, postDeleteWebDetail);

module.exports = router;