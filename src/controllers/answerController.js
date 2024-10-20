const AnswerModel = require('../models/Answer');

class AnswerController {
  // Controller to submit an answer
  static async submitAnswer(req, res) {
    const { questionId } = req.params;
    const { userId, answer } = req.body;

    try {
      // Get the correct answer for the question
      const question = await AnswerModel.getCorrectAnswerByQuestionId(questionId);

      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }

      // Check if the user's answer matches the correct answer
      const isCorrect = question.correct_answer.toLowerCase() === answer.toLowerCase();

      // Save the user's answer into the answers table
      await AnswerModel.saveUserAnswer(userId, questionId, answer, isCorrect);

      // Respond with whether the answer was correct or not
      res.json({
        message: 'Answer submitted',
        isCorrect: isCorrect,
        questionId: questionId,
        userAnswer: answer
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = AnswerController;

