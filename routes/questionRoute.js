const express = require('express');

const { getAllQuestionData, getQuestion, postAddQuestion, postEditQuestion, postDeleteQuestion } = require('../controllers/questionController');
const Authenticate = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/list/:id', getAllQuestionData);
router.get('/editquestionlist/:id', getQuestion);
router.post('/addquestion', postAddQuestion);
router.post('/editquestion/:id', postEditQuestion);
router.post('/removequestion/:id', postDeleteQuestion);

module.exports = router;