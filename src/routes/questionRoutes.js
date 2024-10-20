const express = require('express');
const { getQuestions, createQuestion, getQuestionById, getRandomQuestions, submitAnswerInQuestion } = require('../controllers/questionController');
const router = express.Router();
const {submitAnswer} = require('../controllers/AnswerController');


router.get('/questions', getQuestions);
router.get('/questions-random/:categoryName', getRandomQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/questions', createQuestion);

router.post('/questions/:questionId/submit', submitAnswer);

module.exports = router;