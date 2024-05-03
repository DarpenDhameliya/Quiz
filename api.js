const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const quizRouter = require('./routes/quizeRoute');
const questionRouter = require('./routes/questionRoute');
const { Router } = require('express');

const api = Router();

api.use('/user', userRouter);
api.use('/categories', categoryRouter);
api.use('/quiz', quizRouter);
api.use('/question', questionRouter);

module.exports = { api };
