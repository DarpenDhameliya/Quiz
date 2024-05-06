const express = require('express');

const {
    getAllQuizeData,
    getQuize,
    postAddQuiz,
    postEditQuiz,
    postDeleteQuiz,
} = require('../controllers/quizeController');

const router = express.Router();
router.get('/list', getAllQuizeData);
router.get('/editquizlist/:id', getQuize);
router.post('/addquiz', postAddQuiz);
router.post('/editquiz/:id', postEditQuiz);
router.post('/removequiz/:id', postDeleteQuiz);

module.exports = router;