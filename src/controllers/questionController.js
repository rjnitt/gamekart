// src/controllers/questionController.js
const Question = require('../models/questionModel');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.getAllQuestions();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    console.log("req.params", req.params);
    const { id } = req.params;  // Extract the 'id' from the request parameters
    const question = await Question.getQuestionById(id);  // Pass the 'id' to the model method
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createQuestion = async (req, res) => {
  const { category, question_text, image_url, correct_answer } = req.body;
  try {
    const newQuestion = await Question.createQuestion(category, question_text, image_url, correct_answer);
    res.json({ success: true, questionId: newQuestion.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Controller for handling answer submission
exports.submitAnswerInQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { answer } = req.body;

    try {
    const question = await Question.getQuestionById(questionId);  // Pass the 'id' to the model method
    // Get the correct answer for the question
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
  
    // Check if the user's answer matches the correct answer
    const isCorrect = question.correct_answer.toLowerCase() === answer.toLowerCase();
    if(!isCorrect){
      return res.json({ message: 'Wrong answer, Retry'});
    }
    // Respond with the result
    return res.json({ message: 'Correct Answer', isCorrect });
  } catch  (err) {
    res.status(500).json({ error: err.message });
  }
    
};




exports.getRandomQuestions = async (req, res) => {
  const { categoryName } = req.params;
  console.log("categoryNamecategoryName cc", req.params);
  try {
    const newQuestion = await Question.getRandomQuestion(categoryName);
    if (!newQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};