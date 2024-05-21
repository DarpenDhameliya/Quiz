const express = require('express');

const {
    getAllQuizeData,
    postAddQuiz,
    postEditQuiz,
    postDeleteQuiz,
    getQuizDetailsForQuestion,
} = require('../controllers/quizeController');
const Authenticate = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/list', getAllQuizeData);
router.get('/list/:id', getQuizDetailsForQuestion);
router.post('/addquiz', Authenticate, postAddQuiz);
router.post('/editquiz/:id', Authenticate, postEditQuiz);
router.post('/removequiz/:id', Authenticate, postDeleteQuiz);

module.exports = router;