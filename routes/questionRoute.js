const express = require('express');

const { getAllQuestionData, getQuestion,postAddExcelQuestion, postAddQuestion, postEditQuestion, postDeleteQuestion, getAllQuestionDataForAdmin, getFilteredData } = require('../controllers/questionController');
const Authenticate = require('../middleware/authMiddleware');
const { upload } = require('../middleware/imageMiddleware');

const router = express.Router();
router.get('/list/:id', getAllQuestionData);
router.get('/filteredlist/:byQuiz', getFilteredData);
router.get('/list', getAllQuestionDataForAdmin);
router.get('/editquestionlist/:id', getQuestion);
router.post('/addquestion', postAddQuestion);
router.post('/addquestionexcel', upload, postAddExcelQuestion);
router.post('/editquestion/:id', postEditQuestion);
router.post('/removequestion/:id', postDeleteQuestion);

module.exports = router;