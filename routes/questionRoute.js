const express = require('express');

const { getAllQuestionData, getQuestion,postAddExcelQuestion, postAddQuestion, postEditQuestion, postDeleteQuestion, getAllQuestionDataForAdmin, getFilteredData } = require('../controllers/questionController');
const Authenticate = require('../middleware/authMiddleware');
const { upload } = require('../middleware/imageMiddleware');

const router = express.Router();
router.get('/list/:id', getAllQuestionData);
router.get('/filteredlist/:byQuiz', Authenticate, getFilteredData);
router.get('/editquestionlist/:id', Authenticate, getQuestion);
router.post('/addquestion', postAddQuestion);
router.post('/addquestionexcel', Authenticate, upload, postAddExcelQuestion);
router.post('/editquestion/:id', Authenticate, postEditQuestion);
router.post('/removequestion/:id', Authenticate, postDeleteQuestion);

module.exports = router;