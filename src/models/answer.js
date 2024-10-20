const db = require('../config/db');

class Answer {

  static async executeQuery(query, params = []) {
    try {
      console.log("Query:: ", query);
      const connection = await db;
      const [result] = await connection.query(query, params);
      return result;
    } catch (error) {
      console.error('Database query error:', error.message);
      throw error;
    }
  }


  static async saveUserAnswer(userId, questionId, userAnswer, isCorrect) {
    console.log("call question by id", userId);
    const query = 'INSERT INTO answers (user_id, question_id, user_answer, is_correct) VALUES (?, ?, ?, ?)';
    const result = await this.executeQuery(query, [userId, questionId, userAnswer, isCorrect]);
    return result[0] || null;  // Return the question or null if not found
  }

  static async getCorrectAnswerByQuestionId(questionId) {
    const query = 'SELECT correct_answer FROM questions WHERE id = ?';
    const result = await this.executeQuery(query, [questionId]);
    return result[0] || null;

  }

}

module.exports = Answer;



  // static async saveUserAnswer(userId, questionId, userAnswer, isCorrect) {
  //   const connection = await db;
  //   const query = 'INSERT INTO answers (user_id, question_id, user_answer, is_correct) VALUES (?, ?, ?, ?)';
  //   return new Promise((resolve, reject) => {
  //     connection.query(query, [userId, questionId, userAnswer, isCorrect], (err, result) => {
  //       if (err) {
  //         return reject(err);
  //       }
  //       resolve(result);
  //     });
  //   });
  // }

  // Function to get the correct answer by question ID
//   static async getCorrectAnswerByQuestionId(questionId) {

//     const connection = await db;
//     // const [result] = await connection.query(query, params);

//     const query = 'SELECT correct_answer FROM questions WHERE id = ?';
//     return new Promise((resolve, reject) => {
//       connection.query(query, [questionId], (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(result[0]); // return the first row, which contains the correct_answer
//       });
//     });
//   }
// }

